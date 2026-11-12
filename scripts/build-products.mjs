/**
 * Genera data/agents.json desde research/index.json.
 *
 * Regla: SOLO repos open source. Grok Bot es la referencia conceptual (cerrado)
 * y no entra al ranking. Los frameworks/SDKs tampoco entran.
 *
 * Ejecutar: node scripts/build-products.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const research = JSON.parse(readFileSync(join(root, 'research', 'index.json'), 'utf8'))
const OUT = join(root, 'data', 'agents.json')

const DIMENSIONS = [
  { key: 'capacidad', label: 'Capacidad', hint: 'Qué puede hacer de verdad: tareas largas, herramientas, apps, voz, archivos.', weight: 0.15 },
  { key: 'autonomia', label: 'Autonomía', hint: 'Cuánto trabaja sin ti: planifica, corrige y sigue en segundo plano.', weight: 0.15 },
  { key: 'computadora', label: 'Computadora', hint: 'Entorno propio persistente: navegador, terminal, archivos y apps reales.', weight: 0.15 },
  { key: 'memoria', label: 'Memoria', hint: 'Contexto que sobrevive a la conversación: preferencias, archivos, aprendizajes.', weight: 0.10 },
  { key: 'rutinas', label: 'Rutinas', hint: 'Skills y trabajo programado o por evento, sin que se lo pidas cada vez.', weight: 0.10 },
  { key: 'equipo', label: 'Equipo', hint: 'Varios bots con rol propio que se pasan trabajo y coordinan.', weight: 0.10 },
  { key: 'confianza', label: 'Confianza', hint: 'Aprobaciones, permisos, límites y control sobre lo irreversible.', weight: 0.10 },
  { key: 'producto', label: 'Producto', hint: 'Facilidad de uso, canales, estabilidad, precio y soporte.', weight: 0.15 }
]

const PILLARS = [
  { key: 'identidad', label: 'Identidad', hint: 'El bot tiene nombre y rol propio; no es solo un chat.', weight: 10 },
  { key: 'computadora', label: 'Computadora propia', hint: 'Navegador, terminal, archivos y sesiones que sobreviven a la tarea.', weight: 18 },
  { key: 'memoria', label: 'Memoria', hint: 'Recuerda y acumula contexto por bot.', weight: 10 },
  { key: 'rutinas', label: 'Rutinas', hint: 'Ejecuta trabajo programado o por evento sin prompt.', weight: 16 },
  { key: 'apps', label: 'Apps reales', hint: 'Opera sitios y programas reales, no solo APIs.', weight: 14 },
  { key: 'coordinacion', label: 'Coordinación', hint: 'Varios bots se reparten el trabajo y lo entregan juntos.', weight: 12 },
  { key: 'aprobaciones', label: 'Aprobaciones', hint: 'Pide permiso antes de publicar, pagar o borrar.', weight: 10 },
  { key: 'desatendido', label: 'Desatendido', hint: 'Sigue trabajando mientras no estás conectado.', weight: 10 }
]

const TIERS = [
  { name: 'SS', floor: 92 },
  { name: 'S', floor: 80 },
  { name: 'A', floor: 70 },
  { name: 'B', floor: 60 },
  { name: 'C', floor: 50 },
  { name: 'D', floor: 40 },
  { name: 'E', floor: 30 },
  { name: 'F', floor: 0 }
]

const CAT_LABEL = { personal: 'Bot personal', teams: 'Equipo', general: 'Agente general' }
const SETUP_LABEL = { easy: 'Fácil', moderate: 'Medio', technical: 'Técnico' }
const MATURITY_LABEL = { released: 'Released', beta: 'Beta', prototype: 'Prototipo' }

function round2(n) { return Math.round((n + Number.EPSILON) * 100) / 100 }
function tierFor(total) { return TIERS.find(t => total >= t.floor)?.name || 'F' }
function cleanStars(text, stars) {
  if (!text) return text
  const current = new Intl.NumberFormat('es-PE').format(Number(stars || 0))
  return String(text).replace(/\b\d[\d.,]*k?\s*(?:estrellas|stars)\b/gi, `${current} estrellas`)
}
function nextTierFor(total) {
  const higher = TIERS.filter(t => t.floor > total).sort((a, b) => a.floor - b.floor)[0]
  return higher ? { name: higher.name, delta: round2(higher.floor - total) } : { name: null, delta: null }
}
function generationFor(agency) {
  if (agency >= 70) return 'bots 2026'
  if (agency >= 45) return 'agentes 2025'
  return 'sesion 2024'
}
function maturityFor(p) {
  if (p.created_at && p.created_at < '2026-01-01') return 'released'
  if (p.stars > 10000) return 'released'
  return 'beta'
}

const rows = (research.projects || []).map((p) => {
  const total = round2(p.total)
  const tier = tierFor(total)
  const next = nextTierFor(total)
  const catLabel = CAT_LABEL[p.category] || 'Agente open source'
  const maturity = maturityFor(p)
  const setup = p.setup || 'moderate'
  const researchUrl = `https://github.com/Hyugomon/radar-agentes/tree/main/research/${p.slug}`
  const sources = [
    ...(p.sources || []),
    { label: 'Dossier de investigación', url: researchUrl, accessedAt: p.judged_day }
  ]
  return {
    id: p.slug,
    slug: p.slug,
    full_name: p.full_name,
    maker: p.maker,
    tagline: p.tagline || 'Agente open source',
    summary: cleanStars(p.summary, p.stars),
    description: cleanStars(p.summary, p.stars),
    url: p.website || p.repo,
    website: p.website || p.repo,
    repo: p.repo,
    docs: p.repo,
    researchUrl,
    category: p.category,
    catLabel,
    licenseType: 'Open source',
    license: p.license,
    pricing: 'free',
    priceLabel: 'Gratis',
    priceNote: 'Código abierto + tus modelos',
    setup,
    setupLabel: SETUP_LABEL[setup] || setup,
    maturity,
    maturityLabel: MATURITY_LABEL[maturity] || maturity,
    platforms: p.platforms || ['Desktop'],
    models: p.models || 'BYOK / multi-modelo',
    channels: p.channels || ['Chat'],
    reference: false,
    kind: p.kind,
    archetype: p.category,
    archetype_label: catLabel,
    generation: generationFor(p.agency),
    tier,
    total,
    agency: p.agency,
    confidence: p.confidence,
    dimensions: p.dimensions,
    pillars: p.pillars,
    pillars_detail: PILLARS.map(pillar => ({ ...pillar, on: !!p.pillars?.[pillar.key] })),
    agency_max: PILLARS.reduce((sum, pillar) => sum + pillar.weight, 0),
    has_pillars: true,
    next_tier: next.name,
    delta_next: next.delta,
    strengths: (p.strengths || []).map(s => cleanStars(s, p.stars)),
    weaknesses: (p.weaknesses || []).map(s => cleanStars(s, p.stars)),
    comparison: cleanStars(p.comparison, p.stars),
    sources,
    stars: p.stars || 0,
    forks: p.forks || 0,
    open_issues: p.open_issues || 0,
    language: p.language || '',
    created_at: p.created_at || '',
    created_day: p.created_at ? String(p.created_at).slice(0, 10) : '',
    pushed_at: p.pushed_at || '',
    last_release: p.last_release || null,
    releases_90: (p.releases_recent || []).length,
    releases_recent: p.releases_recent || [],
    judged_day: p.judged_day,
    readme: '',
    topics: p.topics || [],
    homepage: p.website || p.repo
  }
})

rows.sort((a, b) => b.total - a.total || b.agency - a.agency || a.full_name.localeCompare(b.full_name))
rows.forEach((row, index) => { row.rank = index + 1 })

const counts = {
  ready: rows.length,
  open: rows.length,
  personal: rows.filter(r => r.category === 'personal').length,
  teams: rows.filter(r => r.category === 'teams').length,
  general: rows.filter(r => r.category === 'general').length,
  hosted: 0,
  reference: 0
}

const payload = {
  generated_at: '2026-11-12 09:00',
  generated_iso: '2026-11-12T14:00:00Z',
  meta: {
    reference: {
      name: 'Grok Bot',
      maker: 'xAI',
      score: 100,
      url: 'https://docs.x.ai/grok-bot/overview',
      closedSource: true,
      note: 'Producto cerrado. No compite en este ranking: es el listón contra el que se miden los repos open source.'
    },
    dimensions: DIMENSIONS,
    pillars: PILLARS,
    agency_max: PILLARS.reduce((sum, pillar) => sum + pillar.weight, 0),
    tiers: TIERS,
    generations: [
      { key: 'bots 2026', label: 'Bots persistentes (2026)', min: 70, emoji: '🤖', hint: 'Identidad, entorno persistente y rutinas: trabajan cuando no estás.' },
      { key: 'agentes 2025', label: 'Agentes autónomos (2025)', min: 45, emoji: '🧭', hint: 'Tareas de varios pasos, pero atados a una sesión o a tu máquina.' },
      { key: 'sesion 2024', label: 'Agentes de sesión (2024)', min: 0, emoji: '💬', hint: 'Prompt → resultado dentro de un IDE o chat, sin persistencia ni rutinas.' }
    ],
    calibration: [
      { band: '92-100', verdict: 'el listón', text: 'Grok Bot (cerrado): varios bots, computadora propia, memoria, rutinas, apps reales y aprobaciones.' },
      { band: '80-91', verdict: 'casi Grok', text: 'Open source muy completo; le falta una pieza o algo de acabado para igualar el listón.' },
      { band: '70-79', verdict: 'excelente', text: 'Producto serio que hace trabajo real, con una carencia clara frente a Grok Bot.' },
      { band: '60-69', verdict: 'bueno', text: 'Útil y con identidad, pero limitado en computadora, equipo o autonomía.' },
      { band: '50-59', verdict: 'limitado', text: 'Asistente o workspace correcto, pero lejos de trabajar desatendido.' },
      { band: '0-49', verdict: 'flojo', text: 'Automatización frágil o producto claramente superado.' }
    ],
    limits: [
      'Solo entran repos open source con licencia publicada. Grok Bot es cerrado y queda fuera del ranking: se usa como referencia.',
      'Puntuación editorial basada en README, web oficial, releases y el snapshot previo del pipeline; no es una prueba práctica de cada tarea.',
      'Los frameworks, SDKs y runtimes no se puntúan: LangChain, LangGraph, CrewAI, AutoGen, OpenAI Agents SDK y similares no son agentes finales.',
      'El coste real incluye modelos/API y hosting aparte. Gratis en código no significa gratis en operación.',
      'Una nota alta no significa que sea seguro para tus datos: revisa permisos, privacidad y aprobaciones.'
    ],
    ranking_rule: 'Orden: Grok Score (0-100) de mayor a menor. El ADN desempata. Solo repos open source; Grok Bot no compite.',
    excluded: ['LangChain', 'LangGraph', 'CrewAI', 'AutoGen', 'OpenAI Agents SDK', 'Vercel AI SDK', 'Mastra', 'Pydantic AI', 'LlamaIndex'],
    included: 'Solo agentes, bots, asistentes y equipos open source que una persona puede instalar o autoalojar.'
  },
  counts,
  pending: 0,
  total_repos: rows.length,
  total_analyzed: rows.length,
  groups: { ready: rows }
}

writeFileSync(OUT, JSON.stringify(payload, null, 2) + '\n', 'utf8')
console.log(`OK ${OUT}`)
console.log(`${rows.length} repos open source · ${counts.personal} personales · ${counts.teams} equipos · ${counts.general} generales`)
console.log(rows.slice(0, 12).map(r => `${r.rank}. ${r.full_name} — ${r.total} (${r.tier})`).join('\n'))
