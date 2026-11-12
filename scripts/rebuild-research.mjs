/**
 * Aplica las correcciones de research/overrides.json y reescribe los dossiers.
 * No hace llamadas a red: usa lo que ya está en research/<slug>/.
 *
 * Uso: node scripts/rebuild-research.mjs
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const researchRoot = join(root, 'research')
const indexPath = join(researchRoot, 'index.json')
const overrides = JSON.parse(readFileSync(join(researchRoot, 'overrides.json'), 'utf8'))
const index = JSON.parse(readFileSync(indexPath, 'utf8'))

const PILLARS = [
  { key: 'identidad', label: 'Identidad', weight: 10, hint: 'El bot tiene nombre y rol propio; no es solo un chat.' },
  { key: 'computadora', label: 'Computadora propia', weight: 18, hint: 'Navegador, terminal, archivos y sesiones que sobreviven a la tarea.' },
  { key: 'memoria', label: 'Memoria', weight: 10, hint: 'Recuerda y acumula contexto por bot.' },
  { key: 'rutinas', label: 'Rutinas', weight: 16, hint: 'Ejecuta trabajo programado o por evento sin prompt.' },
  { key: 'apps', label: 'Apps reales', weight: 14, hint: 'Opera sitios y programas reales, no solo APIs.' },
  { key: 'coordinacion', label: 'Coordinación', weight: 12, hint: 'Varios bots se reparten el trabajo y lo entregan juntos.' },
  { key: 'aprobaciones', label: 'Aprobaciones', weight: 10, hint: 'Pide permiso antes de publicar, pagar o borrar.' },
  { key: 'desatendido', label: 'Desatendido', weight: 10, hint: 'Sigue trabajando mientras no estás conectado.' }
]

const WEIGHTS = { capacidad: .15, autonomia: .15, computadora: .15, memoria: .10, rutinas: .10, equipo: .10, confianza: .10, producto: .15 }

function cleanStars(text, stars) {
  if (!text) return text
  const current = new Intl.NumberFormat('es-PE').format(Number(stars || 0))
  return String(text).replace(/\b\d[\d.,]*k?\s*(?:estrellas|stars)\b/gi, `${current} estrellas`)
}

function tierFor(total) {
  if (total >= 92) return 'SS'
  if (total >= 80) return 'S'
  if (total >= 70) return 'A'
  if (total >= 60) return 'B'
  if (total >= 50) return 'C'
  if (total >= 40) return 'D'
  if (total >= 30) return 'E'
  return 'F'
}

function dossierFor(p) {
  const featureLines = PILLARS.map(pillar => {
    const on = p.pillars?.[pillar.key]
    const ev = p.evidence?.[pillar.key] || []
    const evidence = ev.length
      ? ev.map(e => `  - “${e.text}” — ${e.source}`).join('\n')
      : '  - Sin evidencia directa en el README/web revisada.'
    return `### ${on ? '✅' : '❌'} ${pillar.label}\n${evidence}`
  }).join('\n\n')

  const sources = (p.sources || []).map(s => `- [${s.label}](${s.url}) · consultado ${s.accessedAt}`).join('\n')
  const dimLines = Object.entries(p.dimensions || {}).map(([k, v]) => `- **${k}**: ${v}/100`).join('\n')
  const strengths = (p.strengths || []).map(s => `- ${s}`).join('\n')
  const weaknesses = (p.weaknesses || []).map(s => `- ${s}`).join('\n')
  const note = p.verificationNote ? `\n## Nota de verificación\n\n${p.verificationNote}\n` : ''

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
${note}
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

for (const p of index.projects) {
  const o = overrides[p.slug] || {}
  p.pillars = { ...(p.pillars || {}), ...(o.pillars || {}) }
  p.category = o.category || p.category || (p.pillars.coordinacion ? 'teams' : 'personal')
  p.tagline = o.tagline || p.tagline
  p.setup = o.setup || p.setup || 'moderate'
  p.platforms = o.platforms || p.platforms || ['Desktop']
  p.channels = o.channels || p.channels || ['Chat']
  p.verificationNote = o.note || ''
  if (o.evidence) p.evidence = { ...(p.evidence || {}), ...o.evidence }

  const base = p.dimensions || {}
  const capacidad = Number(o.dimensions?.capacidad ?? base.capacidad ?? 50)
  p.dimensions = {
    capacidad,
    autonomia: Number(o.dimensions?.autonomia ?? base.autonomia ?? 50),
    computadora: Number(o.dimensions?.computadora ?? (p.pillars.computadora ? Math.min(95, capacidad + 5) : 55)),
    memoria: Number(o.dimensions?.memoria ?? (p.pillars.memoria ? 90 : 60)),
    rutinas: Number(o.dimensions?.rutinas ?? (p.pillars.rutinas ? 90 : 55)),
    equipo: Number(o.dimensions?.equipo ?? (p.pillars.coordinacion ? 90 : 55)),
    confianza: Number(o.dimensions?.confianza ?? (p.pillars.aprobaciones ? 90 : 55)),
    producto: Number(o.dimensions?.producto ?? base.producto ?? 55)
  }
  p.total = Math.round(Object.entries(WEIGHTS).reduce((sum, [k, w]) => sum + p.dimensions[k] * w, 0) * 100) / 100
  p.tier = tierFor(p.total)
  p.agency = PILLARS.reduce((sum, pillar) => sum + (p.pillars[pillar.key] ? pillar.weight : 0), 0)
  p.judged_day = p.judged_day || new Date().toISOString().slice(0, 10)
  p.summary = cleanStars(p.summary, p.stars)
  p.strengths = (p.strengths || []).map(s => cleanStars(s, p.stars))
  p.weaknesses = (p.weaknesses || []).map(s => cleanStars(s, p.stars))
  p.comparison = cleanStars(p.comparison, p.stars)

  const dir = join(researchRoot, p.slug)
  mkdirSync(dir, { recursive: true })
  writeFileSync(join(dir, 'dossier.md'), dossierFor(p), 'utf8')
}

index.projects.sort((a, b) => b.total - a.total || b.agency - a.agency)
index.generated_at = new Date().toISOString().slice(0, 10)
index.count = index.projects.length
writeFileSync(indexPath, JSON.stringify(index, null, 2) + '\n', 'utf8')
console.log(`OK ${index.projects.length} dossiers actualizados`)
for (const p of index.projects.slice(0, 12)) console.log(`${p.total} | ${p.tier} | ADN ${p.agency} | ${p.name}`)
