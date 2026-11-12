import snapshotJson from '../../data/agents.json'

export interface AgentRow {
  id: string
  slug: string
  rank: number
  full_name: string
  maker: string
  tagline: string
  summary: string
  description: string
  url: string
  website: string
  repo: string | null
  docs: string | null
  researchUrl?: string
  category: string
  catLabel: string
  licenseType: string
  license: string | null
  pricing: string
  priceLabel: string
  priceNote: string
  setup: string
  setupLabel: string
  maturity: string
  maturityLabel: string
  platforms: string[]
  models: string
  channels: string[]
  reference: boolean
  kind: string
  archetype: string
  archetype_label: string
  generation: string
  tier: string
  total: number
  agency: number
  confidence: number
  dimensions: Record<string, number>
  strengths: string[]
  weaknesses: string[]
  comparison: string
  sources: { label: string; url: string }[]
  pillars: Record<string, boolean>
  pillars_detail: { key: string; label: string; weight: number; hint: string; on: boolean }[]
  agency_max: number
  has_pillars: boolean
  next_tier: string | null
  delta_next: number | null
  stars: number
  forks: number
  open_issues: number
  language: string
  created_at: string
  created_day: string
  pushed_at: string
  last_release: string | null
  releases_90: number
  releases_recent: { tag: string; date: string; pre: boolean }[]
  judged_day: string
  readme: string
  topics: string[]
  homepage: string
}

export interface RadarPayload {
  generated_at: string
  generated_iso: string
  meta: any
  counts: Record<string, number>
  pending: number
  total_repos: number
  total_analyzed: number
  groups: Record<string, AgentRow[]>
}

const snapshot = snapshotJson as unknown as RadarPayload

let cache: { at: number; data: RadarPayload } | null = null
const TTL = 60_000

function headersFor(key: string) {
  if (key.startsWith('anon_') || key.startsWith('ik_')) return { 'x-api-key': key }
  return { Authorization: `Bearer ${key}` }
}

async function fromInsForge(): Promise<{ rows: AgentRow[]; meta: any } | null> {
  const cfg = useRuntimeConfig()
  if (!cfg.insforgeUrl) return null
  const key = cfg.insforgeApiKey || cfg.insforgeAnonKey
  if (!key) return null

  try {
    const base = String(cfg.insforgeUrl).replace(/\/$/, '')
    const headers = headersFor(String(key))
    const [products, metas] = await Promise.all([
      $fetch<any[]>(`${base}/api/database/records/radar_products`, {
        query: { select: '*,sources:radar_product_sources(label,url)', published: 'eq.true', order: 'total.desc' },
        headers
      }),
      $fetch<any[]>(`${base}/api/database/records/radar_catalog_meta`, {
        query: { select: '*', id: 'eq.main', limit: 1 },
        headers
      })
    ])
    const rows = (products || []).map(mapDbProduct).filter(Boolean) as AgentRow[]
    if (!rows.length) return null
    const metaRow = metas?.[0] || null
    return { rows, meta: metaRow }
  } catch (err) {
    console.warn('[radar] InsForge no disponible, uso snapshot local:', (err as Error).message)
    return null
  }
}

/** Las columnas normalizadas mandan; el payload aporta los textos ricos y las fuentes. */
function mapDbProduct(p: any): AgentRow {
  const payload = p.payload || {}
  return {
    ...payload,
    id: p.slug,
    slug: p.slug,
    full_name: p.name,
    maker: p.maker,
    tagline: p.tagline,
    summary: p.summary,
    description: p.description,
    url: p.website || payload.url || '',
    website: p.website || '',
    repo: p.repo || null,
    docs: p.docs || null,
    category: p.category,
    catLabel: p.cat_label,
    licenseType: p.license_type,
    license: p.license,
    pricing: p.pricing,
    priceLabel: p.price_label,
    priceNote: p.price_note,
    setup: p.setup,
    setupLabel: p.setup_label,
    maturity: p.maturity,
    maturityLabel: p.maturity_label,
    platforms: p.platforms || [],
    models: p.models || '',
    channels: p.channels || [],
    reference: !!p.is_reference,
    kind: p.kind,
    total: Number(p.total),
    tier: p.tier,
    agency: Number(p.agency),
    confidence: Number(p.confidence),
    dimensions: p.dimensions || {},
    pillars: p.pillars || {},
    strengths: p.strengths || [],
    weaknesses: p.weaknesses || [],
    comparison: p.comparison || '',
    judged_day: p.reviewed_at ? String(p.reviewed_at).slice(0, 10) : payload.judged_day,
    sources: p.sources?.length ? p.sources : (payload.sources || [])
  } as AgentRow
}

function dbMetaToMeta(dbMeta: any) {
  if (!dbMeta) return snapshot.meta
  return {
    ...snapshot.meta,
    reference: dbMeta.reference ?? snapshot.meta.reference,
    dimensions: dbMeta.dimensions ?? snapshot.meta.dimensions,
    pillars: dbMeta.pillars ?? snapshot.meta.pillars,
    tiers: dbMeta.tiers ?? snapshot.meta.tiers,
    calibration: dbMeta.calibration ?? snapshot.meta.calibration,
    limits: dbMeta.limits ?? snapshot.meta.limits,
    excluded: dbMeta.excluded ?? snapshot.meta.excluded,
    included: dbMeta.included ?? snapshot.meta.included,
    ranking_rule: dbMeta.ranking_rule ?? snapshot.meta.ranking_rule
  }
}

function buildPayload(rows: AgentRow[], dbMeta: any): RadarPayload {
  const meta = dbMetaToMeta(dbMeta)
  const tiers = meta.tiers || snapshot.meta.tiers
  const sorted = [...rows].sort((a, b) => b.total - a.total || b.agency - a.agency || a.full_name.localeCompare(b.full_name))
  sorted.forEach((row, index) => {
    row.rank = index + 1
    const tier = tiers.find((t: any) => row.total >= t.floor)
    row.tier = tier?.name || 'F'
    const higher = tiers.filter((t: any) => t.floor > row.total).sort((a: any, b: any) => a.floor - b.floor)[0]
    row.next_tier = higher?.name || null
    row.delta_next = higher ? Math.round((higher.floor - row.total + Number.EPSILON) * 100) / 100 : null

    const pillars = meta.pillars || snapshot.meta.pillars
    row.pillars_detail = pillars.map((p: any) => ({ ...p, on: !!row.pillars?.[p.key] }))
    row.agency_max = pillars.reduce((sum: number, p: any) => sum + (p.weight || 0), 0)
    row.agency = row.pillars_detail.reduce((sum: number, p: any) => sum + (p.on ? p.weight : 0), 0)
    row.generation = row.agency >= 70 ? 'bots 2026' : row.agency >= 45 ? 'agentes 2025' : 'sesion 2024'
  })

  const reference = sorted.find(r => r.reference)
  if (reference && meta.reference) meta.reference = { ...meta.reference, score: reference.total }

  return {
    generated_at: dbMeta?.generated_at ? String(dbMeta.generated_at).slice(0, 16).replace('T', ' ') : snapshot.generated_at,
    generated_iso: dbMeta?.generated_at || snapshot.generated_iso,
    meta,
    counts: {
      ready: sorted.length,
      open: sorted.length,
      personal: sorted.filter(r => r.category === 'personal').length,
      teams: sorted.filter(r => r.category === 'teams').length,
      general: sorted.filter(r => r.category === 'general').length,
      hosted: 0,
      reference: 0
    },
    pending: 0,
    total_repos: sorted.length,
    total_analyzed: sorted.length,
    groups: { ready: sorted }
  }
}

/** Catálogo de repos open source desde InsForge; si falla, usa el snapshot de data/agents.json. */
export async function getRadar(): Promise<RadarPayload> {
  if (cache && Date.now() - cache.at < TTL) return cache.data
  const db = await fromInsForge()
  const data = db ? buildPayload(db.rows, db.meta) : snapshot
  cache = { at: Date.now(), data }
  return data
}

/** Versión ligera para el listado (sin textos largos). */
export function toListRow(a: AgentRow) {
  return {
    id: a.id,
    slug: a.slug,
    rank: a.rank,
    full_name: a.full_name,
    maker: a.maker,
    tagline: a.tagline,
    summary: a.summary,
    description: a.description,
    url: a.url,
    website: a.website,
    repo: a.repo,
    category: a.category,
    catLabel: a.catLabel,
    licenseType: a.licenseType,
    license: a.license,
    pricing: a.pricing,
    priceLabel: a.priceLabel,
    priceNote: a.priceNote,
    setup: a.setup,
    setupLabel: a.setupLabel,
    maturity: a.maturity,
    maturityLabel: a.maturityLabel,
    platforms: a.platforms,
    models: a.models,
    channels: a.channels,
    reference: a.reference,
    kind: a.kind,
    archetype_label: a.archetype_label,
    generation: a.generation,
    tier: a.tier,
    total: a.total,
    agency: a.agency,
    confidence: a.confidence,
    dimensions: a.dimensions,
    pillars: a.pillars,
    has_pillars: a.has_pillars,
    next_tier: a.next_tier,
    delta_next: a.delta_next
  }
}
