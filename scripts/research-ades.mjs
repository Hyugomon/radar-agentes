/**
 * Investiga ADEs una por una y guarda evidencia en research/ades/<slug>/.
 * Solo usa el nombre y la URL oficial de research/ades/names.json.
 * No importa rankings, scores ni notas de la página de referencia.
 *
 * Uso:
 *   node scripts/research-ades.mjs
 *   node scripts/research-ades.mjs --refresh
 *   node scripts/research-ades.mjs --only=orca
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const dirRoot = join(root, 'research', 'ades')
const names = JSON.parse(readFileSync(join(dirRoot, 'names.json'), 'utf8'))
const byName = new Map(names.map(n => [n.name.toLowerCase(), n]))

const BATCH = [
  'Agent Orchestrator',
  'bb',
  'Conductor',
  'Emdash',
  'Ghostex',
  'Herdr',
  'Jean',
  'Kandev',
  'Maestri',
  'Orca',
  'Paradev',
  'Paseo',
  'Sidecar',
  'Solo',
  'Synara',
  'T3 Code',
  'Tortie',
  'Traycer',
  'Waku',
  'Agent Teams AI',
  'Cloudroom',
  'Codex app',
  'OpenChamber',
  'cmux'
]

const refresh = process.argv.includes('--refresh')
const onlyArg = process.argv.find(a => a.startsWith('--only='))
const only = onlyArg ? onlyArg.split('=')[1].toLowerCase() : null
const now = new Date().toISOString().slice(0, 10)
const UA = 'radar-agentes-research'

function slugify(name) {
  return String(name).toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

function writeFile(path, content) {
  mkdirSync(dirname(path), { recursive: true })
  writeFileSync(path, content, 'utf8')
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
    .replace(/\s+/g, ' ').trim())
}

function sentences(text) {
  return String(text).replace(/\s+/g, ' ').split(/(?<=[.!?])\s+/).map(s => s.trim()).filter(s => s.length > 40 && s.length < 400)
}

function pick(text, keywords, avoid = [], max = 3) {
  const scored = sentences(text).map(s => {
    const l = s.toLowerCase()
    let score = 0
    for (const k of keywords) if (l.includes(k)) score += 3
    for (const k of avoid) if (l.includes(k)) score -= 5
    return { s, score }
  }).filter(x => x.score > 0).sort((a, b) => b.score - a.score)
  return scored.slice(0, max).map(x => x.s)
}

async function getText(url) {
  try {
    const res = await fetch(url, { headers: { 'User-Agent': UA } })
    return { ok: res.ok, status: res.status, text: res.ok ? await res.text() : '' }
  } catch (err) {
    return { ok: false, status: 0, text: '', error: String(err) }
  }
}

async function getJson(url) {
  try {
    const res = await fetch(url, { headers: { 'User-Agent': UA, Accept: 'application/vnd.github+json' } })
    return { ok: res.ok, status: res.status, data: res.ok ? await res.json() : null }
  } catch (err) {
    return { ok: false, status: 0, data: null, error: String(err) }
  }
}

function githubRepo(url) {
  const m = String(url).match(/^https?:\/\/github\.com\/([^/]+)\/([^/#?]+)/i)
  if (!m) return null
  return `${m[1]}/${m[2].replace(/\.git$/, '')}`
}

function findGithub(html) {
  const matches = [...String(html).matchAll(/https?:\/\/github\.com\/([A-Za-z0-9_.-]+)\/([A-Za-z0-9_.-]+)/g)]
  for (const m of matches) {
    const repo = `${m[1]}/${m[2].replace(/\.git$/, '')}`
    if (/^(features|topics|marketplace|login|signup|sponsors|settings)$/i.test(m[1])) continue
    return repo
  }
  return null
}

function scoreFrom(features, harnessCount) {
  const f = features
  return {
    harnesses: harnessCount >= 2 ? Math.min(95, 78 + harnessCount * 3) : 50,
    paralelo: f.parallel ? 88 : 50,
    orquestacion: f.orchestration ? 86 : 50,
    revision: f.review ? 88 : 55,
    remoto: f.remote ? 85 : 45,
    movil: f.mobile ? 85 : 40,
    extensiones: f.extensions ? 85 : 50,
    control: f.control ? 85 : 50,
    abierto: f.openSource ? 90 : 45,
    producto: f.mature ? 85 : 60
  }
}

const WEIGHTS = { harnesses: .15, paralelo: .15, orquestacion: .12, revision: .12, remoto: .10, movil: .06, extensiones: .10, control: .08, abierto: .06, producto: .06 }

function dossier(p) {
  const featureLines = Object.entries(p.scores).map(([k, v]) => `- **${k}**: ${v}/100`).join('\n')
  const evidence = Object.entries(p.evidence).map(([k, arr]) => {
    if (!arr.length) return `### ${k}\n- Sin cita directa en la web/README revisada.`
    return `### ${k}\n${arr.map(e => `- “${e.text}” — ${e.source}`).join('\n')}`
  }).join('\n\n')
  const sources = p.sources.map(s => `- [${s.label}](${s.url}) · consultado ${s.accessedAt}`).join('\n')
  return `# ${p.name} — dossier ADE

- **Web oficial**: ${p.website}
- **Repo**: ${p.repo || '—'}
- **Licencia**: ${p.license || 'No verificada'}
- **Categoría**: ${p.category}
- **Revisado**: ${p.judged_day}
- **ADE Score**: ${p.total} · Tier ${p.tier}

## Qué es

${p.summary}

## Evidencia

${evidence}

## Dimensiones

${featureLines}

## Fuentes

${sources}

---

_Investigación documental de la web oficial y el repositorio. No se instaló ni se probó el ADE en una tarea real._
`
}

async function research(name) {
  const item = byName.get(name.toLowerCase())
  if (!item) { console.warn(`SKIP ${name}: no está en names.json`); return null }
  const slug = slugify(name)
  const dir = join(dirRoot, slug)
  if (!refresh && existsSync(join(dir, 'dossier.md'))) {
    console.log(`OK ${slug}: ya existe`)
    return readExisting(slug, item)
  }

  console.log(`→ ${name}`)
  let repo = githubRepo(item.url)
  const home = await getText(item.url)
  const html = home.text || ''
  if (!repo) repo = findGithub(html)
  const homepageText = htmlToText(html).slice(0, 30000)

  let gh = null
  if (repo) {
    const api = await getJson(`https://api.github.com/repos/${repo}`)
    gh = api.data
    if (!api.ok) console.warn(`  GitHub API ${api.status} para ${repo}`)
  }

  let readme = ''
  if (repo) {
    for (const file of ['README.md', 'readme.md', 'README.MD', 'README.rst']) {
      const r = await getText(`https://raw.githubusercontent.com/${repo}/HEAD/${file}`)
      if (r.ok && r.text) { readme = r.text; break }
    }
  }

  const rawText = `${homepageText}\n\n${readme}`
  const text = rawText.toLowerCase()
  const harnessNames = ['claude code', 'codex', 'gemini', 'opencode', 'cursor', 'amp', 'devin', 'windsurf', 'aider', 'copilot', 'grok', 'qwen']
  const harnesses = harnessNames.filter(h => text.includes(h))
  const openSource = !!gh?.license?.spdx_id && !/noassertion|unknown/i.test(gh.license.spdx_id)
  const features = {
    parallel: /parallel|worktree|concurrent/.test(text),
    orchestration: /orchestrat|delegate|multi-agent|multi agent|teammates|team of agents/.test(text),
    review: /diff review|code review|pull request|\bprs?\b|review changes/.test(text),
    remote: /ssh|remote host|remote server|cloud|self-hosted server/.test(text),
    mobile: /ios|iphone|ipad|android|mobile app|phone/.test(text),
    extensions: /\bmcp\b|skills|plugins|context management/.test(text),
    control: /approval|permission|sandbox|guardrail|policy/.test(text),
    openSource,
    mature: !!(gh?.stargazers_count > 500) || /pricing|docs|changelog|releases/.test(text)
  }
  const scores = scoreFrom(features, harnesses.length)
  const total = Math.round(Object.entries(WEIGHTS).reduce((s, [k, w]) => s + scores[k] * w, 0) * 100) / 100
  const tier = total >= 90 ? 'SS' : total >= 82 ? 'S' : total >= 72 ? 'A' : total >= 62 ? 'B' : total >= 52 ? 'C' : total >= 42 ? 'D' : total >= 32 ? 'E' : 'F'

  const evidence = {
    harnesses: pick(rawText, harnessNames, [], 3).map(s => ({ text: s, source: repo ? `https://github.com/${repo}#readme` : item.url })),
    paralelo: pick(rawText, ['parallel', 'worktree', 'concurrent'], [], 3).map(s => ({ text: s, source: repo ? `https://github.com/${repo}#readme` : item.url })),
    orquestacion: pick(rawText, ['orchestrat', 'delegate', 'multi-agent', 'teammates'], [], 3).map(s => ({ text: s, source: repo ? `https://github.com/${repo}#readme` : item.url })),
    revision: pick(rawText, ['diff review', 'code review', 'pull request', 'review changes'], [], 3).map(s => ({ text: s, source: repo ? `https://github.com/${repo}#readme` : item.url })),
    remoto: pick(rawText, ['ssh', 'remote', 'cloud', 'self-hosted'], [], 3).map(s => ({ text: s, source: repo ? `https://github.com/${repo}#readme` : item.url })),
    movil: pick(rawText, ['ios', 'iphone', 'android', 'mobile app'], [], 3).map(s => ({ text: s, source: repo ? `https://github.com/${repo}#readme` : item.url })),
    extensiones: pick(rawText, ['mcp', 'skills', 'plugins', 'context management'], [], 3).map(s => ({ text: s, source: repo ? `https://github.com/${repo}#readme` : item.url })),
    control: pick(rawText, ['approval', 'permission', 'sandbox', 'guardrail'], [], 3).map(s => ({ text: s, source: repo ? `https://github.com/${repo}#readme` : item.url }))
  }

  const sources = [
    { label: 'Web oficial', url: item.url, accessedAt: now },
    ...(repo ? [
      { label: 'Repositorio GitHub', url: `https://github.com/${repo}`, accessedAt: now },
      { label: 'README', url: `https://github.com/${repo}#readme`, accessedAt: now }
    ] : [])
  ]

  const summary = homepageText.slice(0, 260) || readme.replace(/[#*`>]/g, '').slice(0, 260) || name
  const project = {
    slug, name, repo: repo ? `https://github.com/${repo}` : null, website: item.url,
    license: gh?.license?.spdx_id || null, category: 'ADE',
    summary: summary.replace(/\s+/g, ' ').trim(),
    features, scores, total, tier,
    harnesses, evidence, sources, judged_day: now
  }
  mkdirSync(dir, { recursive: true })
  writeFile(join(dir, 'meta.json'), JSON.stringify({ name, repo, github: gh || null, fetched_at: now }, null, 2) + '\n')
  writeFile(join(dir, 'homepage.txt'), homepageText + '\n')
  if (readme) writeFile(join(dir, 'readme.md'), readme.slice(0, 40000))
  writeFile(join(dir, 'sources.json'), JSON.stringify(sources, null, 2) + '\n')
  writeFile(join(dir, 'dossier.md'), dossier(project))
  console.log(`  ✓ ${slug} · ${total} · ${tier}`)
  return project
}

function readExisting(slug, item) {
  try {
    const dir = join(dirRoot, slug)
    const meta = JSON.parse(readFileSync(join(dir, 'meta.json'), 'utf8'))
    const sources = JSON.parse(readFileSync(join(dir, 'sources.json'), 'utf8'))
    const dossierText = readFileSync(join(dir, 'dossier.md'), 'utf8')
    const total = Number((dossierText.match(/ADE Score\*\*: ([\d.]+)/) || [])[1] || 0)
    const tier = (dossierText.match(/Tier ([A-Z]+)/) || [])[1] || 'F'
    return { slug, name: item.name, repo: meta.repo ? `https://github.com/${meta.repo}` : null, website: item.url, license: meta.github?.license?.spdx_id || null, category: 'ADE', summary: item.name, features: {}, scores: {}, total, tier, harnesses: [], evidence: {}, sources, judged_day: now }
  } catch { return null }
}

mkdirSync(dirRoot, { recursive: true })
const projects = []
for (const name of BATCH) {
  if (only && !name.toLowerCase().includes(only)) continue
  const p = await research(name)
  if (p) projects.push(p)
  await new Promise(r => setTimeout(r, 200))
}

const indexFile = join(dirRoot, 'index.json')
let existing = { generated_at: now, projects: [], queue: [] }
if (existsSync(indexFile)) { try { existing = JSON.parse(readFileSync(indexFile, 'utf8')) } catch {} }
const merged = new Map((existing.projects || []).map(p => [p.slug, p]))
for (const p of projects) merged.set(p.slug, p)
const queue = names.filter(n => !merged.has(slugify(n.name))).map(n => ({ name: n.name, url: n.url }))
const out = { generated_at: now, count: merged.size, projects: [...merged.values()].sort((a, b) => b.total - a.total), queue }
writeFile(indexFile, JSON.stringify(out, null, 2) + '\n')
console.log(`\nOK ${out.count} ADEs investigados · ${queue.length} en cola`)
