/**
 * Investiga cada proyecto open source y guarda la evidencia en research/<slug>/.
 *
 * Fuentes por proyecto:
 *   - API de GitHub (estrellas, licencia, último push, topics, homepage)
 *   - README actual del repo
 *   - Web oficial (si existe)
 *   - Releases (Atom de GitHub)
 *   - Snapshot previo de tu pipeline (data/repos-legacy.json) como punto de partida
 *
 * Uso:
 *   node scripts/research-projects.mjs
 *   node scripts/research-projects.mjs --refresh
 *   node scripts/research-projects.mjs --only=openmausbot
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const researchRoot = join(root, 'research')
const legacy = JSON.parse(readFileSync(join(root, 'data', 'repos-legacy.json'), 'utf8'))
const legacyRows = Object.values(legacy.groups).flat()
const byName = new Map(legacyRows.map(r => [String(r.full_name).toLowerCase(), r]))

const CANDIDATES = [
  'milind-soni/OpenMausBot',
  'nanocoai/nanoclaw',
  'nano-muse/nanoMuse',
  'modelflare-ai/AnyModelBot',
  'Anil-matcha/open-duet',
  'leepokai/Codync',
  'RokaSwK/threebot',
  'cosmicstack-labs/mercury-agent',
  'opencrabs/opencrabs',
  'microclaw/microclaw',
  'Orkas-AI/Orkas',
  'agentvivekkumar/dontbemichael',
  'SenteLabsAI/OpenExecutive',
  'rowboatlabs/rowboat',
  'agentscope-ai/QwenPaw',
  'netease-youdao/LobsterAI',
  'GCWing/OpenBitFun',
  'makecindy/cindy',
  'rome-os/rome',
  'zhayujie/CowAgent',
  'Ryder-Sun/Meldwork',
  '777genius/agent-teams-ai',
  'Fei2411/DS-Bot',
  'ai-timon/timon',
  'NousResearch/hermes-agent',
  'androoAGI/starnet'
]

const refresh = process.argv.includes('--refresh')
const onlyArg = process.argv.find(a => a.startsWith('--only='))
const only = onlyArg ? onlyArg.split('=')[1] : null

const HEADERS = { 'User-Agent': 'radar-agentes-research', Accept: 'application/vnd.github+json' }
const now = new Date().toISOString().slice(0, 10)

const PILLARS = [
  { key: 'identidad', legacy: 'identidad', label: 'Identidad', keywords: ['agent', 'bot', 'persona', 'named', 'teammate', 'assistant'], strong: ['named bot', 'each bot', 'bot with', 'personality', 'persona', 'agent with', 'role', 'teammate'], avoid: ['not affiliated', 'why one assistant', 'alternative to'] },
  { key: 'computadora', legacy: 'runtime', label: 'Computadora propia', keywords: ['computer', 'browser', 'terminal', 'sandbox', 'vm', 'filesystem', 'desktop', 'workspace'], strong: ['cloud computer', 'computer', 'browser', 'terminal', 'sandbox', 'virtual machine', ' vm ', 'filesystem', 'desktop'], avoid: ['128 gb', 'silver box', 'hardware', 'ram '] },
  { key: 'memoria', legacy: 'memoria', label: 'Memoria', keywords: ['memory', 'remember', 'context', 'knowledge', 'learn'], strong: ['per-bot memory', 'memory per bot', 'persistent memory', 'remembers', 'remember', 'memory file', 'long-term memory', 'memory tab', 'second brain'], avoid: ['128 gb', 'ram ', 'silver box', 'hardware'] },
  { key: 'rutinas', legacy: 'rutinas', label: 'Rutinas', keywords: ['routine', 'schedule', 'cron', 'recurring', 'automation', 'background', 'trigger'], strong: ['routines', 'scheduled', 'scheduler', 'cron', 'recurring', 'automation', 'every morning', 'every day'], avoid: [] },
  { key: 'apps', legacy: 'apps', label: 'Apps reales', keywords: ['apps', 'integrations', 'whatsapp', 'telegram', 'slack', 'discord', 'gmail', 'browser', 'connectors'], strong: ['apps', 'whatsapp', 'telegram', 'slack', 'discord', 'gmail', 'browser use', 'connectors', 'composio', 'integrations'], avoid: ['memory'] },
  { key: 'coordinacion', legacy: 'coordinacion', label: 'Coordinación', keywords: ['team', 'multi-agent', 'multi agent', 'delegate', 'handoff', 'collaborate', 'coordinator'], strong: ['group chat', 'teammates', 'delegate', 'handoff', 'team lead', 'multi-agent', 'multi agent', 'commander', 'crew'], avoid: [] },
  { key: 'aprobaciones', legacy: 'aprobaciones', label: 'Aprobaciones', keywords: ['approve', 'approval', 'permission', 'confirm', 'review', 'human in the loop'], strong: ['approval', 'approve', 'permission', 'ask first', 'confirm', 'human in the loop', 'approval cards'], avoid: [] },
  { key: 'desatendido', legacy: 'desatendido', label: 'Desatendido', keywords: ['background', '24/7', 'autonomous', 'unattended', 'offline', 'always-on'], strong: ['background', '24/7', 'always-on', 'unattended', 'while you are away', 'daemon', 'runs on a schedule'], avoid: ['cannot work while', 'asleep'] }
]

function slugify(name) {
  return String(name).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

function decodeEntities(s) {
  return String(s)
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, ' ')
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCharCode(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
}

function htmlToText(html) {
  return decodeEntities(String(html)
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim())
}

function sentences(text) {
  return String(text)
    .replace(/\s+/g, ' ')
    .split(/(?<=[.!?])\s+|\n+/)
    .map(s => s.trim())
    .filter(s => s.length > 40 && s.length < 420)
}

function pickEvidence(text, pillar, max = 3) {
  const ss = sentences(text)
  const scored = ss.map(s => {
    const lower = s.toLowerCase()
    let score = 0
    for (const keyword of pillar.strong || []) if (lower.includes(keyword)) score += 3
    for (const keyword of pillar.keywords || []) if (lower.includes(keyword)) score += 1
    for (const keyword of pillar.avoid || []) if (lower.includes(keyword)) score -= 5
    if (s.length > 320) score -= 1
    return { text: s, score }
  }).filter(x => x.score > 0).sort((a, b) => b.score - a.score)
  return scored.slice(0, max).map(x => x.text)
}

async function getText(url) {
  try {
    const res = await fetch(url, { headers: { 'User-Agent': HEADERS['User-Agent'] } })
    if (!res.ok) return { ok: false, status: res.status, text: '' }
    return { ok: true, status: res.status, text: await res.text() }
  } catch (err) {
    return { ok: false, status: 0, text: '', error: String(err) }
  }
}

async function getJson(url) {
  try {
    const res = await fetch(url, { headers: HEADERS })
    if (!res.ok) return { ok: false, status: res.status, data: null }
    return { ok: true, status: res.status, data: await res.json() }
  } catch (err) {
    return { ok: false, status: 0, data: null, error: String(err) }
  }
}

function parseReleasesAtom(xml) {
  const entries = []
  const blocks = String(xml).split(/<entry>/i).slice(1)
  for (const block of blocks.slice(0, 5)) {
    const title = decodeEntities((block.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1] || '').trim()
    const updated = (block.match(/<updated>([\s\S]*?)<\/updated>/i) || [])[1] || ''
    const link = (block.match(/<link[^>]*href="([^"]+)"/i) || [])[1] || ''
    if (title) entries.push({ tag: title, date: updated.slice(0, 10), url: decodeEntities(link) })
  }
  return entries
}

function writeFile(path, content) {
  mkdirSync(dirname(path), { recursive: true })
  writeFileSync(path, content, 'utf8')
}

function dossierFor(project) {
  const p = project
  const featureLines = PILLARS.map(pillar => {
    const on = p.pillars?.[pillar.key]
    const ev = p.evidence?.[pillar.key] || []
    const evidence = ev.length
      ? ev.map(e => `  - “${e.text}” — ${e.source}`).join('\n')
      : '  - Sin evidencia directa en el README/web revisada.'
    return `### ${on ? '✅' : '❌'} ${pillar.label}\n${evidence}`
  }).join('\n\n')

  const sources = (p.sources || []).map(s => `- [${s.label}](${s.url}) · consultado ${s.accessedAt}`).join('\n')
  const dims = p.dimensions || {}
  const dimLines = Object.entries(dims).map(([k, v]) => `- **${k}**: ${v}/100`).join('\n')
  const strengths = (p.strengths || []).map(s => `- ${s}`).join('\n')
  const weaknesses = (p.weaknesses || []).map(s => `- ${s}`).join('\n')

  return `# ${p.name} — dossier de investigación

- **Repo**: ${p.repo}
- **Web oficial**: ${p.website || '—'}
- **Licencia**: ${p.license || '—'}
- **Lenguaje**: ${p.language || '—'}
- **Estrellas**: ${p.stars ?? '—'} · **Forks**: ${p.forks ?? '—'}
- **Último push**: ${p.pushed_at || '—'} · **Última release**: ${p.last_release || '—'}
- **Revisado**: ${p.judged_day} · **Confianza**: ${p.confidence}/100
- **Tipo**: ${p.kind} · **Categoría**: ${p.category || '—'}

## Qué es

${p.summary || p.description || '—'}

> ${p.tagline || ''}

## Evidencia de la investigación

${featureLines}

## Puntuación

Grok Score: **${p.total}** · Tier **${p.tier}** · ADN **${p.agency}**

${dimLines}

## Fortalezas

${strengths || '- —'}

## Lo que le falta / riesgos

${weaknesses || '- —'}

## Comparación con el listón

${p.comparison || '—'}

## Fuentes consultadas

${sources || '- —'}

---

_Investigación documental: README del repositorio, web oficial, releases y snapshot previo del pipeline. No se instaló ni se probó el producto en una tarea real. Las citas son literales de las fuentes enlazadas._
`
}

async function research(fullName) {
  const legacyRow = byName.get(fullName.toLowerCase())
  if (!legacyRow) {
    console.warn(`SKIP ${fullName}: no está en data/repos-legacy.json`)
    return null
  }
  const slug = legacyRow.slug || slugify(fullName)
  const dir = join(researchRoot, slug)
  if (!refresh && existsSync(join(dir, 'dossier.md'))) {
    console.log(`OK ${slug}: ya existe (usa --refresh para actualizar)`)
    return readExisting(slug, legacyRow, fullName)
  }

  console.log(`→ ${fullName}`)
  const api = await getJson(`https://api.github.com/repos/${fullName}`)
  const gh = api.data || null
  if (!api.ok) console.warn(`  GitHub API ${api.status}; uso snapshot legado`)

  const repoMeta = {
    full_name: fullName,
    html_url: gh?.html_url || legacyRow.url,
    description: gh?.description || legacyRow.description,
    homepage: gh?.homepage || legacyRow.homepage || '',
    license: gh?.license?.spdx_id || legacyRow.license || null,
    language: gh?.language || legacyRow.language || '',
    stars: gh?.stargazers_count ?? legacyRow.stars ?? 0,
    forks: gh?.forks_count ?? legacyRow.forks ?? 0,
    open_issues: gh?.open_issues_count ?? legacyRow.open_issues ?? 0,
    pushed_at: gh?.pushed_at || legacyRow.pushed_at || '',
    created_at: gh?.created_at || legacyRow.created_at || '',
    topics: gh?.topics || legacyRow.topics || [],
    archived: gh?.archived ?? false,
    api_status: api.status,
    fetched_at: now
  }
  writeFile(join(dir, 'meta.json'), JSON.stringify(repoMeta, null, 2) + '\n')

  // README actual
  let readme = ''
  for (const candidate of ['README.md', 'readme.md', 'README.MD', 'README.rst', 'docs/README.md']) {
    const r = await getText(`https://raw.githubusercontent.com/${fullName}/HEAD/${candidate}`)
    if (r.ok && r.text) { readme = r.text; break }
  }
  if (!readme) readme = legacyRow.readme || ''
  writeFile(join(dir, 'readme.md'), readme.slice(0, 40000))

  // Web oficial
  let homepageText = ''
  if (repoMeta.homepage && !/github\.com/i.test(repoMeta.homepage)) {
    const h = await getText(repoMeta.homepage)
    if (h.ok) {
      homepageText = htmlToText(h.text).slice(0, 20000)
      writeFile(join(dir, 'homepage.txt'), homepageText + '\n')
    }
  }

  // Releases
  let releases = []
  const atom = await getText(`https://github.com/${fullName}/releases.atom`)
  if (atom.ok) releases = parseReleasesAtom(atom.text)
  if (!releases.length) releases = legacyRow.releases_recent || []
  writeFile(join(dir, 'releases.json'), JSON.stringify(releases, null, 2) + '\n')

  const evidenceText = `${readme}\n\n${homepageText}`
  const evidence = {}
  for (const pillar of PILLARS) {
    evidence[pillar.key] = pickEvidence(evidenceText, pillar, 3).map(text => ({
      text,
      source: readme.includes(text) ? `${repoMeta.html_url}#readme` : (repoMeta.homepage || `${repoMeta.html_url}#readme`)
    }))
  }

  const sources = [
    { label: 'Repositorio GitHub', url: repoMeta.html_url, accessedAt: now },
    ...(repoMeta.homepage ? [{ label: 'Web oficial', url: repoMeta.homepage, accessedAt: now }] : []),
    { label: 'README', url: `${repoMeta.html_url}#readme`, accessedAt: now },
    { label: 'Releases', url: `${repoMeta.html_url}/releases`, accessedAt: now }
  ]
  writeFile(join(dir, 'sources.json'), JSON.stringify(sources, null, 2) + '\n')

  const pillars = {}
  for (const pillar of PILLARS) pillars[pillar.key] = !!legacyRow.pillars?.[pillar.legacy]

  const dims = legacyRow.dimensions || {}
  const dimensions = {
    capacidad: Math.round(dims.capability || 50),
    autonomia: Math.round(dims.autonomy || 50),
    computadora: pillars.computadora ? Math.min(95, Math.round((dims.capability || 50) + 5)) : 55,
    memoria: pillars.memoria ? 90 : 60,
    rutinas: pillars.rutinas ? 90 : 55,
    equipo: pillars.coordinacion ? 90 : 55,
    confianza: pillars.aprobaciones ? 90 : 55,
    producto: Math.round(((dims.maturity || 50) * 0.4) + ((dims.performance || 50) * 0.3) + ((dims.ecosystem || 50) * 0.3))
  }
  const weights = { capacidad: .15, autonomia: .15, computadora: .15, memoria: .10, rutinas: .10, equipo: .10, confianza: .10, producto: .15 }
  const total = Math.round(Object.entries(weights).reduce((sum, [k, w]) => sum + dimensions[k] * w, 0) * 100) / 100
  const tier = total >= 92 ? 'SS' : total >= 85 ? 'S' : total >= 75 ? 'A' : total >= 65 ? 'B' : total >= 55 ? 'C' : total >= 45 ? 'D' : total >= 35 ? 'E' : 'F'
  const agency = PILLARS.reduce((sum, p) => sum + (pillars[p.key] ? ({ identidad: 10, computadora: 18, memoria: 10, rutinas: 16, apps: 14, coordinacion: 12, aprobaciones: 10, desatendido: 10 }[p.key] || 0) : 0), 0)

  const project = {
    slug,
    name: legacyRow.full_name.split('/')[1],
    full_name: legacyRow.full_name,
    maker: legacyRow.full_name.split('/')[0],
    repo: repoMeta.html_url,
    website: repoMeta.homepage || '',
    license: repoMeta.license,
    licenseType: 'Open source',
    language: repoMeta.language,
    stars: repoMeta.stars,
    forks: repoMeta.forks,
    open_issues: repoMeta.open_issues,
    pushed_at: repoMeta.pushed_at,
    created_at: repoMeta.created_at,
    last_release: releases[0]?.date || legacyRow.last_release || null,
    releases_recent: releases,
    topics: repoMeta.topics,
    kind: legacyRow.kind,
    summary: legacyRow.summary,
    tagline: legacyRow.archetype_label || `${legacyRow.kind} open source`,
    strengths: legacyRow.strengths || [],
    weaknesses: legacyRow.weaknesses || [],
    comparison: legacyRow.comparison || '',
    confidence: Math.max(55, Math.min(85, legacyRow.confidence || 60)),
    judged_day: now,
    pillars,
    evidence,
    dimensions,
    total,
    tier,
    agency,
    sources
  }
  writeFile(join(dir, 'dossier.md'), dossierFor(project))
  console.log(`  ✓ ${slug} · ${total} · ${tier} · ADN ${agency}`)
  return project
}

function readExisting(slug, legacyRow, fullName) {
  const dir = join(researchRoot, slug)
  try {
    const meta = JSON.parse(readFileSync(join(dir, 'meta.json'), 'utf8'))
    const sources = JSON.parse(readFileSync(join(dir, 'sources.json'), 'utf8'))
    const dossier = readFileSync(join(dir, 'dossier.md'), 'utf8')
    const total = Number((dossier.match(/Grok Score: \*\*([\d.]+)\*\*/) || [])[1] || legacyRow.total || 0)
    const tier = (dossier.match(/Tier \*\*([A-Z]+)\*\*/) || [])[1] || legacyRow.tier
    const agency = Number((dossier.match(/ADN \*\*([\d.]+)\*\*/) || [])[1] || legacyRow.agency || 0)
    return { slug, name: fullName.split('/')[1], full_name: fullName, maker: fullName.split('/')[0], repo: meta.html_url, website: meta.homepage, license: meta.license, licenseType: 'Open source', language: meta.language, stars: meta.stars, forks: meta.forks, open_issues: meta.open_issues, pushed_at: meta.pushed_at, created_at: meta.created_at, last_release: legacyRow.last_release, releases_recent: legacyRow.releases_recent || [], topics: meta.topics || [], kind: legacyRow.kind, summary: legacyRow.summary, tagline: legacyRow.archetype_label, strengths: legacyRow.strengths || [], weaknesses: legacyRow.weaknesses || [], comparison: legacyRow.comparison, confidence: legacyRow.confidence, judged_day: now, pillars: legacyRow.pillars, dimensions: legacyRow.dimensions, total, tier, agency, sources }
  } catch {
    return null
  }
}

mkdirSync(researchRoot, { recursive: true })
const projects = []
for (const fullName of CANDIDATES) {
  if (only && !fullName.toLowerCase().includes(only.toLowerCase())) continue
  const project = await research(fullName)
  if (project) projects.push(project)
  await new Promise(r => setTimeout(r, 250))
}

const indexPath = join(researchRoot, 'index.json')
let existing = { generated_at: now, projects: [] }
if (existsSync(indexPath)) {
  try { existing = JSON.parse(readFileSync(indexPath, 'utf8')) } catch { /* ignore */ }
}
const merged = new Map((existing.projects || []).map(p => [p.slug, p]))
for (const p of projects) merged.set(p.slug, p)
const out = { generated_at: now, count: merged.size, projects: [...merged.values()].sort((a, b) => b.total - a.total || b.agency - a.agency) }
writeFile(indexPath, JSON.stringify(out, null, 2) + '\n')
console.log(`\nOK ${out.count} proyectos · ${indexPath}`)
