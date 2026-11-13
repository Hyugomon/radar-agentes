/**
 * Genera data/ades.json desde research/ades/index.json + overrides.json.
 * Solo incluye los ADE investigados; el resto va en queue.
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const index = JSON.parse(readFileSync(join(root, 'research', 'ades', 'index.json'), 'utf8'))
const overrides = JSON.parse(readFileSync(join(root, 'research', 'ades', 'overrides.json'), 'utf8'))

const DIMENSIONS = [
  { key: 'harnesses', label: 'Harnesses', hint: 'Cuántos agentes/CLIs distintos puede manejar: Claude Code, Codex, Gemini, OpenCode…', weight: 0.15 },
  { key: 'paralelo', label: 'Paralelismo', hint: 'Sesiones simultáneas, worktrees y trabajo concurrente sin pisarse.', weight: 0.15 },
  { key: 'orquestacion', label: 'Orquestación', hint: 'Repartir tareas entre agentes, delegar, handoffs y equipos.', weight: 0.12 },
  { key: 'revision', label: 'Revisión', hint: 'Diffs, code review, pull requests y entrega de cambios.', weight: 0.12 },
  { key: 'remoto', label: 'Remoto / cloud', hint: 'SSH, hosts remotos, servidores propios o ejecución cloud.', weight: 0.10 },
  { key: 'movil', label: 'Móvil', hint: 'Acceso desde iPhone, Android o web móvil.', weight: 0.06 },
  { key: 'extensiones', label: 'Extensiones', hint: 'MCP, skills, plugins y gestión de contexto.', weight: 0.10 },
  { key: 'control', label: 'Control', hint: 'Aprobaciones, permisos, sandbox y políticas.', weight: 0.08 },
  { key: 'abierto', label: 'Apertura', hint: 'Código abierto, licencia publicada y posibilidad de autoalojar.', weight: 0.06 },
  { key: 'producto', label: 'Producto', hint: 'Madurez, documentación, comunidad, precio y experiencia de uso.', weight: 0.06 }
]

const WEIGHTS = Object.fromEntries(DIMENSIONS.map(d => [d.key, d.weight]))

const TIERS = [
  { name: 'SS', floor: 90 },
  { name: 'S', floor: 82 },
  { name: 'A', floor: 72 },
  { name: 'B', floor: 62 },
  { name: 'C', floor: 52 },
  { name: 'D', floor: 42 },
  { name: 'E', floor: 32 },
  { name: 'F', floor: 0 }
]

const CAT_LABEL = {
  ide: 'IDE',
  workspace: 'Workspace',
  orchestrator: 'Orquestador',
  planning: 'Planificación',
  terminal: 'Terminal'
}

function round2(n) { return Math.round((n + Number.EPSILON) * 100) / 100 }
function tierFor(total) { return TIERS.find(t => total >= t.floor)?.name || 'F' }
function nextTierFor(total) {
  const higher = TIERS.filter(t => t.floor > total).sort((a, b) => a.floor - b.floor)[0]
  return higher ? { name: higher.name, delta: round2(higher.floor - total) } : { name: null, delta: null }
}

const rows = (index.projects || []).map(p => {
  const o = overrides[p.slug] || {}
  const scores = o.scores || p.scores || {}
  const rawLicense = o.license !== undefined ? o.license : p.license
  const license = rawLicense && !/NOASSERTION|unknown/i.test(rawLicense) ? rawLicense : null
  const licenseType = o.licenseType || (license ? 'Open source' : (rawLicense ? 'No verificada' : 'Comercial'))
  const harnessList = o.harnesses || p.harnesses || []
  const total = round2(DIMENSIONS.reduce((sum, d) => sum + Number(scores[d.key] || 0) * d.weight, 0))
  const tier = tierFor(total)
  const next = nextTierFor(total)
  const researchUrl = `https://github.com/Hyugomon/radar-agentes/tree/main/research/ades/${p.slug}`
  const features = [
    { key: 'harnesses', label: 'Múltiples harnesses', on: harnessList.length >= 2 },
    { key: 'paralelo', label: 'Sesiones en paralelo', on: Number(scores.paralelo || 0) >= 70 },
    { key: 'orquestacion', label: 'Orquestación de agentes', on: Number(scores.orquestacion || 0) >= 70 },
    { key: 'revision', label: 'Revisión / PRs', on: Number(scores.revision || 0) >= 70 },
    { key: 'remoto', label: 'SSH / remoto / cloud', on: Number(scores.remoto || 0) >= 70 },
    { key: 'movil', label: 'Acceso móvil', on: Number(scores.movil || 0) >= 70 },
    { key: 'extensiones', label: 'MCP / skills / plugins', on: Number(scores.extensiones || 0) >= 70 },
    { key: 'control', label: 'Aprobaciones / control', on: Number(scores.control || 0) >= 70 },
    { key: 'abierto', label: 'Open source / autoalojable', on: Number(scores.abierto || 0) >= 70 }
  ]
  const sources = [
    ...(p.sources || []),
    { label: 'Dossier de investigación', url: researchUrl, accessedAt: p.judged_day }
  ]
  return {
    id: p.slug,
    slug: p.slug,
    name: p.name,
    repo: p.repo,
    website: p.website,
    researchUrl,
    category: o.category || 'workspace',
    catLabel: CAT_LABEL[o.category] || 'ADE',
    license,
    licenseType,
    tagline: o.tagline || p.name,
    summary: o.summary || p.summary,
    scores,
    total,
    tier,
    next_tier: next.name,
    delta_next: next.delta,
    strengths: o.strengths || [],
    weaknesses: o.weaknesses || [],
    pricing: o.pricing || (p.license ? 'free' : 'unknown'),
    priceNote: o.priceNote || (p.license ? 'Código abierto + tus modelos' : 'Consultar en la web oficial'),
    execution: o.execution || 'Local',
    platforms: o.platforms || ['Desktop'],
    harnesses: harnessList,
    features,
    sources,
    judged_day: p.judged_day
  }
})

rows.sort((a, b) => b.total - a.total || a.name.localeCompare(b.name))
rows.forEach((row, i) => { row.rank = i + 1 })

const queue = (index.queue || []).map(q => ({ name: q.name, url: q.url }))

const payload = {
  generated_at: '2026-11-13 09:00',
  generated_iso: '2026-11-13T14:00:00Z',
  meta: {
    dimensions: DIMENSIONS,
    tiers: TIERS,
    calibration: [
      { band: '90-100', verdict: 'estado del arte', text: 'ADE completo: multi-harness, paralelo, orquestación, revisión y remoto bien resueltos.' },
      { band: '82-89', verdict: 'excelente', text: 'Muy completo; le falta una pieza o algo de madurez para ser el estándar.' },
      { band: '72-81', verdict: 'bueno', text: 'Hace bien lo importante, con carencias claras en remoto, móvil o extensibilidad.' },
      { band: '62-71', verdict: 'limitado', text: 'Workspace útil pero acotado: no cubre el ciclo completo de agentes.' },
      { band: '0-61', verdict: 'flojo', text: 'Multiplexor o herramienta parcial; no es un ADE completo.' }
    ],
    limits: [
      'Solo se puntúan ADEs investigados. El resto queda en la cola, sin nota inventada.',
      'La puntuación es editorial y se basa en la web oficial, README, docs y releases; no es una prueba práctica de cada flujo.',
      'Un ADE no es un agente ni un framework: es el workspace donde orquestas agentes de código.',
      'Precios, licencias y funciones cambian; confirma en la web oficial antes de decidir.',
      'La cola de investigación no es un ranking: son nombres pendientes de revisar uno por uno.'
    ],
    ranking_rule: 'Orden: ADE Score (0-100) de mayor a menor. Solo ADEs investigados; la cola no tiene nota.',
    included: 'Workspaces, IDEs, terminales y orquestadores para desarrollar con agentes de código.',
    excluded: ['Frameworks de agentes', 'SDKs', 'Harnesses sueltos', 'CLIs sin workspace']
  },
  counts: {
    researched: rows.length,
    queue: queue.length,
    open: rows.filter(r => r.licenseType === 'Open source').length,
    closed: rows.filter(r => r.licenseType === 'Comercial').length,
    unverified: rows.filter(r => r.licenseType === 'No verificada').length
  },
  queue,
  groups: { ready: rows }
}

writeFileSync(join(root, 'data', 'ades.json'), JSON.stringify(payload, null, 2) + '\n', 'utf8')
console.log(`OK data/ades.json · ${rows.length} investigados · ${queue.length} en cola`)
console.log(rows.slice(0, 10).map(r => `${r.rank}. ${r.name} — ${r.total} (${r.tier})`).join('\n'))
