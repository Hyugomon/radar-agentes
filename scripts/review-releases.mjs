/**
 * Revisa releases de todos los agentes y ADEs existentes.
 * Usa los feeds Atom públicos de GitHub (no consume la API rate-limited).
 * Para proyectos sin repo intenta leer el changelog de su web oficial.
 *
 * Salida:
 *   research/releases-review.json
 *   research/releases-review.md
 *   research/<slug>/releases.json
 *   research/ades/<slug>/releases.json
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const TODAY = process.env.RADAR_DATE || new Date().toISOString().slice(0, 10)
const THRESHOLD = new Date(new Date(TODAY).getTime() - 90 * 86400000).toISOString().slice(0, 10)
const UA = 'radar-agentes-release-review'

const agentsIndexPath = join(root, 'research', 'index.json')
const adesIndexPath = join(root, 'research', 'ades', 'index.json')
const agentsIndex = JSON.parse(readFileSync(agentsIndexPath, 'utf8'))
const adesIndex = JSON.parse(readFileSync(adesIndexPath, 'utf8'))

function decode(s) {
  return String(s)
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&apos;/g, "'").replace(/&nbsp;/g, ' ')
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCharCode(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
}

function text(html) {
  return decode(String(html))
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ').trim()
}

async function fetchText(url) {
  try {
    const res = await fetch(url, { headers: { 'User-Agent': UA, Accept: 'application/atom+xml,text/html,*/*' } })
    return { ok: res.ok, status: res.status, finalUrl: res.url || url, text: res.ok ? await res.text() : '' }
  } catch (e) {
    return { ok: false, status: 0, finalUrl: url, text: '', error: String(e) }
  }
}

function parseAtom(xml) {
  const out = []
  for (const block of String(xml).split(/<entry>/i).slice(1, 21)) {
    const title = decode((block.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1] || '').trim()
    const updated = (block.match(/<updated>([\s\S]*?)<\/updated>/i) || [])[1] || ''
    const link = decode((block.match(/<link[^>]*href="([^"]+)"/i) || [])[1] || '')
    const rawContent = (block.match(/<content[^>]*>([\s\S]*?)<\/content>/i) || [])[1] || ''
    const note = text(rawContent).slice(0, 900)
    let tag = ''
    const tagMatch = link.match(/\/releases\/tag\/([^/?#]+)/) || link.match(/\/tags\/([^/?#]+)/)
    if (tagMatch) {
      try { tag = decodeURIComponent(tagMatch[1]) } catch { tag = tagMatch[1] }
    }
    if (!tag) tag = title
    const date = updated.slice(0, 10)
    if (!tag && !date) continue
    out.push({
      tag,
      title,
      date,
      url: link,
      pre: /(alpha|beta|rc|canary|preview|nightly|test|dev|snapshot)/i.test(`${tag} ${title}`),
      note
    })
  }
  return out
}

function statusFor(latest) {
  if (!latest?.date) return 'sin releases'
  const days = Math.floor((new Date(TODAY) - new Date(latest.date)) / 86400000)
  if (days <= 7) return 'activo'
  if (days <= 30) return 'reciente'
  if (days <= 90) return 'estable'
  return 'parado'
}

function daysFor(date) {
  if (!date) return null
  return Math.floor((new Date(TODAY) - new Date(date)) / 86400000)
}

async function releaseData(repoUrl) {
  if (!repoUrl) return null
  const m = String(repoUrl).match(/github\.com\/([^/]+)\/([^/#?]+)/)
  if (!m) return null
  let repo = `${m[1]}/${m[2].replace(/\.git$/, '')}`
  let entries = []
  let source = 'releases.atom'
  const rel = await fetchText(`https://github.com/${repo}/releases.atom`)
  if (rel.ok) {
    const rm = String(rel.finalUrl || '').match(/github\.com\/([^/]+)\/([^/#?]+)\/releases\.atom/i)
    if (rm) repo = `${rm[1]}/${rm[2]}`
    entries = parseAtom(rel.text)
  }
  if (!entries.length) {
    source = 'tags.atom'
    const tags = await fetchText(`https://github.com/${repo}/tags.atom`)
    if (tags.ok) {
      const tm = String(tags.finalUrl || '').match(/github\.com\/([^/]+)\/([^/#?]+)\/tags\.atom/i)
      if (tm) repo = `${tm[1]}/${tm[2]}`
      entries = parseAtom(tags.text)
    }
  }
  entries.sort((a, b) => String(b.date).localeCompare(String(a.date)))
  return { repo, entries, source, http: rel.status }
}

async function changelogData(website) {
  if (!website) return null
  const home = await fetchText(website)
  if (!home.ok) return { status: 'web no disponible', note: '', url: website }
  const links = [...home.text.matchAll(/href=["']([^"']+)["']/gi)].map(m => m[1])
  const candidate = links.find(l => /(changelog|release-notes|releases|whats-new|updates)/i.test(l))
  if (!candidate) return { status: 'sin changelog enlazado', note: '', url: website }
  const abs = candidate.startsWith('http') ? candidate : new URL(candidate, website).toString()
  const page = await fetchText(abs)
  return {
    status: page.ok ? 'changelog revisado' : 'changelog no disponible',
    note: page.ok ? text(page.text).slice(0, 4000) : '',
    url: abs
  }
}

function parseChangelog(note) {
  const raw = String(note || '')
  const versionMatch = raw.match(/\b(v?\d+\.\d+\.\d+)\b/)
  const dateMatch =
    raw.match(/\b(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun),\s+(\d{1,2})\s+(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+(\d{4})/i) ||
    raw.match(/\b(January|February|March|April|May|June|July|August|September|October|November|December)\s+(\d{1,2}),\s+(\d{4})\b/i)
  if (!versionMatch || !dateMatch) return null
  const parsed = new Date(dateMatch[0].replace(/^(Mon|Tue|Wed|Thu|Fri|Sat|Sun),\s+/i, ''))
  if (Number.isNaN(parsed.getTime())) return null
  const start = Math.min(versionMatch.index ?? 0, dateMatch.index ?? 0)
  return {
    tag: versionMatch[1],
    title: versionMatch[1],
    date: parsed.toISOString().slice(0, 10),
    url: '',
    pre: /(alpha|beta|rc|canary|preview|nightly|test|dev|snapshot)/i.test(versionMatch[1]),
    note: raw.slice(start, start + 1200)
  }
}

async function review(item, type, folder) {
  let data = null
  if (item.repo) data = await releaseData(item.repo)
  const latest = data?.entries?.[0] || null
  const entries = data?.entries || []
  let status = latest ? statusFor(latest) : (data ? 'repo sin releases' : 'sin repo de releases')

  let changelog = null
  let changelogRelease = null
  if (!latest && item.slug === 'codex-app') {
    changelog = {
      status: 'app cerrada',
      note: 'App cerrada de OpenAI. No tiene repositorio de releases propio; el changelog general de OpenAI no se usa como release del ADE.',
      url: item.website
    }
    status = 'app cerrada'
  } else if (!latest) {
    changelog = await changelogData(item.website)
    changelogRelease = parseChangelog(changelog?.note)
    if (changelogRelease) {
      changelogRelease.url = changelog.url
      status = statusFor(changelogRelease)
    } else if (changelog?.note && status === 'sin repo de releases') {
      status = 'changelog revisado'
    }
  }

  const effective = latest || changelogRelease
  const releases90 = data ? entries.filter(e => e.date >= THRESHOLD).length : (effective ? null : 0)
  const releaseNote = effective?.note || changelog?.note || ''
  const updated = {
    ...item,
    repo: data ? `https://github.com/${data.repo}` : item.repo,
    last_release: effective?.date || null,
    last_release_tag: effective?.tag || null,
    last_release_url: effective?.url || (data ? `https://github.com/${data.repo}/releases` : changelog?.url || item.website),
    last_release_days: daysFor(effective?.date),
    releases_90: releases90,
    releases_recent: entries.slice(0, 6).map(e => ({ tag: e.tag, date: e.date, pre: e.pre, url: e.url })),
    release_note: releaseNote,
    release_status: status,
    release_source: data?.source || (changelog ? 'changelog' : 'none'),
    release_checked_at: TODAY,
    release_http: data?.http || null,
    changelog_url: changelog?.url || null
  }

  if (data) {
    mkdirSync(folder, { recursive: true })
    writeFileSync(join(folder, 'releases.json'), JSON.stringify({
      repo: data.repo,
      source: data.source,
      checked_at: TODAY,
      entries
    }, null, 2) + '\n', 'utf8')
  } else if (changelog?.note) {
    mkdirSync(folder, { recursive: true })
    writeFileSync(join(folder, 'changelog.txt'), changelog.note + '\n', 'utf8')
  }

  return updated
}

const results = []
for (const p of agentsIndex.projects) {
  const updated = await review(p, 'agent', join(root, 'research', p.slug))
  Object.assign(p, updated)
  results.push({ type: 'Agente', name: p.full_name, slug: p.slug, ...updated })
  console.log(`A ${p.slug} · ${updated.last_release_tag || '—'} · ${updated.last_release || '—'} · ${updated.releases_90} en 90d · ${updated.release_status}`)
  await new Promise(r => setTimeout(r, 120))
}

for (const p of adesIndex.projects) {
  const updated = await review(p, 'ade', join(root, 'research', 'ades', p.slug))
  Object.assign(p, updated)
  results.push({ type: 'ADE', name: p.name, slug: p.slug, ...updated })
  console.log(`D ${p.slug} · ${updated.last_release_tag || '—'} · ${updated.last_release || '—'} · ${updated.releases_90} en 90d · ${updated.release_status}`)
  await new Promise(r => setTimeout(r, 120))
}

agentsIndex.projects.sort((a, b) => b.total - a.total || a.name.localeCompare(b.name))
adesIndex.projects.sort((a, b) => b.total - a.total || a.name.localeCompare(b.name))
writeFileSync(agentsIndexPath, JSON.stringify(agentsIndex, null, 2) + '\n', 'utf8')
writeFileSync(adesIndexPath, JSON.stringify(adesIndex, null, 2) + '\n', 'utf8')

const report = {
  checked_at: TODAY,
  threshold_90d: THRESHOLD,
  count: results.length,
  results
}
writeFileSync(join(root, 'research', 'releases-review.json'), JSON.stringify(report, null, 2) + '\n', 'utf8')

const rows = results.map(r => {
  const note = (r.release_note || '').replace(/\|/g, '\\|').replace(/\s+/g, ' ').slice(0, 180)
  return `| ${r.type} | ${r.name} | \`${r.last_release_tag || '—'}\` | ${r.last_release || '—'} | ${r.releases_90} | ${r.release_status} | ${note || '—'} |`
}).join('\n')

const md = `# Revisión de releases · ${TODAY}

- Ventana de 90 días: desde ${THRESHOLD}
- Revisados: ${results.length} proyectos (${agentsIndex.projects.length} agentes + ${adesIndex.projects.length} ADEs)
- Fuente: feeds \`releases.atom\` / \`tags.atom\` de GitHub y changelogs oficiales cuando no hay repo.

| Tipo | Proyecto | Última versión | Fecha | Releases 90d | Estado | Nota |
|---|---|---|---|---:|---|---|
${rows}
`
writeFileSync(join(root, 'research', 'releases-review.md'), md, 'utf8')

console.log(`\nOK ${results.length} proyectos revisados`)
console.log(`Reporte: research/releases-review.md`)
