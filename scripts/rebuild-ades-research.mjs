/**
 * Aplica overrides a los dossiers ADE y los reescribe con el score final.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const dirRoot = join(root, 'research', 'ades')
const index = JSON.parse(readFileSync(join(dirRoot, 'index.json'), 'utf8'))
const overrides = JSON.parse(readFileSync(join(dirRoot, 'overrides.json'), 'utf8'))

const DIMENSIONS = [
  { key: 'harnesses', label: 'Harnesses', weight: 0.15 },
  { key: 'paralelo', label: 'Paralelismo', weight: 0.15 },
  { key: 'orquestacion', label: 'Orquestación', weight: 0.12 },
  { key: 'revision', label: 'Revisión', weight: 0.12 },
  { key: 'remoto', label: 'Remoto / cloud', weight: 0.10 },
  { key: 'movil', label: 'Móvil', weight: 0.06 },
  { key: 'extensiones', label: 'Extensiones', weight: 0.10 },
  { key: 'control', label: 'Control', weight: 0.08 },
  { key: 'abierto', label: 'Apertura', weight: 0.06 },
  { key: 'producto', label: 'Producto', weight: 0.06 }
]
const WEIGHTS = Object.fromEntries(DIMENSIONS.map(d => [d.key, d.weight]))

function tierFor(total) {
  if (total >= 90) return 'SS'
  if (total >= 82) return 'S'
  if (total >= 72) return 'A'
  if (total >= 62) return 'B'
  if (total >= 52) return 'C'
  if (total >= 42) return 'D'
  if (total >= 32) return 'E'
  return 'F'
}

function dossier(p) {
  const dims = DIMENSIONS.map(d => `- **${d.label}**: ${p.scores[d.key]}/100`).join('\n')
  const ev = Object.entries(p.evidence || {}).map(([k, arr]) => {
    if (!arr.length) return `### ${k}\n- Sin cita directa en la web/README revisada.`
    return `### ${k}\n${arr.map(e => `- “${e.text}” — ${e.source}`).join('\n')}`
  }).join('\n\n')
  const sources = (p.sources || []).map(s => `- [${s.label}](${s.url}) · consultado ${s.accessedAt}`).join('\n')
  const strengths = (p.strengths || []).map(s => `- ${s}`).join('\n')
  const weaknesses = (p.weaknesses || []).map(s => `- ${s}`).join('\n')
  return `# ${p.name} — dossier ADE

- **Web oficial**: ${p.website}
- **Repo**: ${p.repo || '—'}
- **Licencia**: ${p.license || (p.licenseType === 'No verificada' ? 'No verificada' : 'Comercial')}
- **Categoría**: ${p.category}
- **Revisado**: ${p.judged_day}
- **ADE Score**: ${p.total} · Tier ${p.tier}

## Qué es

${p.summary}

## Evidencia

${ev}

## Dimensiones

${dims}

## Fortalezas

${strengths || '- —'}

## Carencias

${weaknesses || '- —'}

## Fuentes

${sources}

---

_Investigación documental de la web oficial y el repositorio. No se instaló ni se probó el ADE en una tarea real. El score es editorial y está ajustado contra las dimensiones documentadas._
`
}

for (const p of index.projects) {
  const o = overrides[p.slug] || {}
  const scores = o.scores || p.scores || {}
  p.scores = scores
  p.total = Math.round(DIMENSIONS.reduce((s, d) => s + Number(scores[d.key] || 0) * d.weight, 0) * 100) / 100
  p.tier = tierFor(p.total)
  p.summary = o.summary || p.summary
  p.tagline = o.tagline || p.tagline
  p.category = o.category || p.category || 'workspace'
  p.pricing = o.pricing || p.pricing || 'unknown'
  p.priceNote = o.priceNote || p.priceNote || ''
  p.execution = o.execution || p.execution || 'Local'
  p.platforms = o.platforms || p.platforms || ['Desktop']
  p.harnesses = o.harnesses || p.harnesses || []
  p.strengths = o.strengths || p.strengths || []
  p.weaknesses = o.weaknesses || p.weaknesses || []
  p.license = o.license !== undefined ? o.license : p.license
  p.licenseType = o.licenseType || (p.license ? 'Open source' : (p.license === null ? 'Comercial' : 'No verificada'))
  p.judged_day = p.judged_day || new Date().toISOString().slice(0, 10)

  mkdirSync(join(dirRoot, p.slug), { recursive: true })
  writeFileSync(join(dirRoot, p.slug, 'dossier.md'), dossier(p), 'utf8')
}

index.projects.sort((a, b) => b.total - a.total || a.name.localeCompare(b.name))
index.count = index.projects.length
index.generated_at = new Date().toISOString().slice(0, 10)
writeFileSync(join(dirRoot, 'index.json'), JSON.stringify(index, null, 2) + '\n', 'utf8')
console.log(`OK ${index.projects.length} dossiers ADE actualizados`)
for (const p of index.projects.slice(0, 10)) console.log(`${p.total} | ${p.tier} | ${p.name}`)
