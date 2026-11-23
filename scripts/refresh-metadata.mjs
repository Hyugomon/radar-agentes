/**
 * Refresca metadata real de GitHub y READMEs actuales para todos los agentes y ADEs.
 * Deduplica repositorios compartidos (p. ej. 777genius/agent-teams-ai) para cuidar el
 * límite de la API pública de GitHub (60 req/h sin token; soporta GITHUB_TOKEN).
 *
 * No sobrescribe pilares, dimensiones, scores, veredictos, citas ni campos de releases.
 *
 * Uso:
 *   node scripts/refresh-metadata.mjs
 *   GITHUB_TOKEN=ghp_... node scripts/refresh-metadata.mjs
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const researchRoot = join(root, 'research')
const adesRoot = join(researchRoot, 'ades')
const TODAY = process.env.RADAR_DATE || new Date().toISOString().slice(0, 10)
const UA = 'radar-agentes-metadata-refresh'
const onlyStale = process.argv.includes('--only-stale')

const apiHeaders = {
  'User-Agent': UA,
  Accept: 'application/vnd.github+json',
  ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {})
}

function repoFromUrl(url) {
  const m = String(url || '').match(/github\.com\/([^/]+)\/([^/#?]+)/i)
  if (!m) return null
  return `${m[1]}/${m[2].replace(/\.git$/, '')}`
}

function validLicense(spdx) {
  if (!spdx || /^(NOASSERTION|unknown|none)$/i.test(String(spdx))) return null
  return String(spdx)
}

function writeJson(path, data) {
  mkdirSync(dirname(path), { recursive: true })
  writeFileSync(path, JSON.stringify(data, null, 2) + '\n', 'utf8')
}

async function fetchRepo(repoSlug) {
  try {
    const res = await fetch(`https://api.github.com/repos/${repoSlug}`, { headers: apiHeaders })
    if (!res.ok) {
      return { ok: false, status: res.status, data: null }
    }
    return { ok: true, status: res.status, data: await res.json() }
  } catch (err) {
    return { ok: false, status: 0, data: null, error: String(err) }
  }
}

async function fetchReadme(fullName) {
  for (const candidate of ['README.md', 'README_EN.md', 'readme.md', 'README.MD', 'README.rst']) {
    try {
      const res = await fetch(`https://raw.githubusercontent.com/${fullName}/HEAD/${candidate}`, {
        headers: { 'User-Agent': UA }
      })
      if (res.ok) {
        const text = await res.text()
        if (text) return { ok: true, text }
      }
    } catch {
      // try next candidate
    }
  }
  return { ok: false, text: '' }
}

function buildAgentSources(repoUrl, website) {
  return [
    { label: 'Repositorio GitHub', url: repoUrl, accessedAt: TODAY },
    ...(website ? [{ label: 'Web oficial', url: website, accessedAt: TODAY }] : []),
    { label: 'README', url: `${repoUrl}#readme`, accessedAt: TODAY },
    { label: 'Releases', url: `${repoUrl}/releases`, accessedAt: TODAY }
  ]
}

function buildAdeSources(website, repoUrl) {
  return [
    ...(website ? [{ label: 'Web oficial', url: website, accessedAt: TODAY }] : []),
    ...(repoUrl ? [
      { label: 'Repositorio GitHub', url: repoUrl, accessedAt: TODAY },
      { label: 'README', url: `${repoUrl}#readme`, accessedAt: TODAY }
    ] : [])
  ]
}

const agentsIndexPath = join(researchRoot, 'index.json')
const adesIndexPath = join(adesRoot, 'index.json')
const agentsIndex = JSON.parse(readFileSync(agentsIndexPath, 'utf8'))
const adesIndex = JSON.parse(readFileSync(adesIndexPath, 'utf8'))

function isFreshMeta(metaPath) {
  if (!existsSync(metaPath)) return false
  try {
    const m = JSON.parse(readFileSync(metaPath, 'utf8'))
    return m?.fetched_at === TODAY
  } catch {
    return false
  }
}

const uniqueRepos = new Map()
for (const p of agentsIndex.projects || []) {
  const key = repoFromUrl(p.repo)
  if (!key) continue
  if (onlyStale && isFreshMeta(join(researchRoot, p.slug, 'meta.json'))) continue
  if (!uniqueRepos.has(key.toLowerCase())) uniqueRepos.set(key.toLowerCase(), key)
}
for (const p of adesIndex.projects || []) {
  const key = repoFromUrl(p.repo)
  if (!key) continue
  if (onlyStale && isFreshMeta(join(adesRoot, p.slug, 'meta.json'))) continue
  if (!uniqueRepos.has(key.toLowerCase())) uniqueRepos.set(key.toLowerCase(), key)
}

console.log(`Refrescando ${uniqueRepos.size} repositorios únicos${onlyStale ? ' (--only-stale)' : ''} (fecha ${TODAY})...`)
const repoCache = new Map()
let apiOkCount = 0
let apiFailCount = 0

for (const [lowerKey, repoSlug] of uniqueRepos.entries()) {
  const api = await fetchRepo(repoSlug)
  const canonicalFullName = api.ok && api.data?.full_name ? api.data.full_name : repoSlug
  const readme = await fetchReadme(canonicalFullName)
  if (api.ok) apiOkCount += 1
  else {
    apiFailCount += 1
    console.warn(`  ! GitHub API ${api.status} para ${repoSlug}${api.error ? ` (${api.error})` : ''}; se conservan datos previos`)
  }
  repoCache.set(lowerKey, { api, readme, canonicalFullName })
  await new Promise(r => setTimeout(r, 150))
}

let agentsUpdated = 0
for (const p of agentsIndex.projects || []) {
  const key = repoFromUrl(p.repo)?.toLowerCase()
  const entry = key ? repoCache.get(key) : null
  if (!entry) continue

  const dir = join(researchRoot, p.slug)
  mkdirSync(dir, { recursive: true })

  if (entry.api.ok && entry.api.data) {
    const gh = entry.api.data
    const prevRepo = p.repo
    const lic = validLicense(gh.license?.spdx_id)
    p.full_name = gh.full_name || p.full_name
    p.maker = gh.owner?.login || p.full_name.split('/')[0]
    p.repo = gh.html_url || p.repo
    p.stars = gh.stargazers_count ?? p.stars
    p.forks = gh.forks_count ?? p.forks
    p.open_issues = gh.open_issues_count ?? p.open_issues
    p.pushed_at = gh.pushed_at || p.pushed_at
    p.created_at = gh.created_at || p.created_at
    if (lic) p.license = lic
    if (gh.language) p.language = gh.language
    if (Array.isArray(gh.topics)) p.topics = gh.topics

    const metaPath = join(dir, 'meta.json')
    let existingMeta = {}
    if (existsSync(metaPath)) {
      try { existingMeta = JSON.parse(readFileSync(metaPath, 'utf8')) } catch { existingMeta = {} }
    }
    const nextMeta = {
      ...existingMeta,
      full_name: p.full_name,
      html_url: p.repo,
      description: gh.description ?? existingMeta.description ?? '',
      homepage: gh.homepage || existingMeta.homepage || p.website || '',
      license: lic || (typeof existingMeta.license === 'string' ? existingMeta.license : p.license) || null,
      language: p.language || existingMeta.language || '',
      stars: p.stars,
      forks: p.forks,
      open_issues: p.open_issues,
      pushed_at: p.pushed_at,
      created_at: p.created_at,
      topics: p.topics || [],
      archived: gh.archived ?? existingMeta.archived ?? false,
      api_status: entry.api.status,
      fetched_at: TODAY
    }
    writeJson(metaPath, nextMeta)
    if (prevRepo !== p.repo) console.log(`  ↪ Redirect agente ${p.slug}: ${prevRepo} -> ${p.repo}`)
    agentsUpdated += 1
  }

  if (entry.readme.ok && entry.readme.text) {
    writeFileSync(join(dir, 'readme.md'), entry.readme.text.slice(0, 40000), 'utf8')
  }

  p.sources = buildAgentSources(p.repo, p.website)
  writeJson(join(dir, 'sources.json'), p.sources)
}

let adesUpdated = 0
for (const p of adesIndex.projects || []) {
  const key = repoFromUrl(p.repo)?.toLowerCase()
  if (!key) continue
  const entry = repoCache.get(key) || null

  const dir = join(adesRoot, p.slug)
  mkdirSync(dir, { recursive: true })
  const metaPath = join(dir, 'meta.json')

  if (entry?.api.ok && entry.api.data) {
    const gh = entry.api.data
    const prevRepo = p.repo
    const lic = validLicense(gh.license?.spdx_id)
    p.repo = gh.html_url || p.repo
    if (lic) p.license = lic

    writeJson(metaPath, {
      name: p.name,
      repo: gh.full_name || entry.canonicalFullName,
      github: gh,
      fetched_at: TODAY
    })
    if (prevRepo !== p.repo) console.log(`  ↪ Redirect ADE ${p.slug}: ${prevRepo} -> ${p.repo}`)
    adesUpdated += 1
  } else if (!p.license && existsSync(metaPath)) {
    try {
      const existingMeta = JSON.parse(readFileSync(metaPath, 'utf8'))
      const lic = validLicense(existingMeta?.github?.license?.spdx_id)
      if (lic) p.license = lic
    } catch {
      // ignore invalid meta.json
    }
  }

  if (entry?.readme.ok && entry.readme.text) {
    writeFileSync(join(dir, 'readme.md'), entry.readme.text.slice(0, 40000), 'utf8')
  }

  p.sources = buildAdeSources(p.website, p.repo)
  writeJson(join(dir, 'sources.json'), p.sources)
}

agentsIndex.generated_at = TODAY
adesIndex.generated_at = TODAY
writeJson(agentsIndexPath, agentsIndex)
writeJson(adesIndexPath, adesIndex)

console.log(`OK metadata: ${apiOkCount}/${uniqueRepos.size} repos API 200 (${apiFailCount} fallback) · ${agentsUpdated} agentes · ${adesUpdated} ADEs`)
