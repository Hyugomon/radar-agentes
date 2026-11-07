import snapshotJson from '../../data/agents.json'

export interface AgentRow {
  id: number
  slug: string
  rank: number
  full_name: string
  url: string
  description: string
  summary: string
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
  pillars: Record<string, boolean>
  pillars_detail: { key: string; label: string; weight: number; hint: string; on: boolean }[]
  agency_max: number
  has_pillars: boolean
  next_tier: string | null
  delta_next: number | null
  stars: number
  forks: number
  open_issues: number
  license: string
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

/** Filas que guarda la BD: una por agente, con el payload completo en JSON. */
export async function rowsFromDatabase(): Promise<AgentRow[] | null> {
  const cfg = useRuntimeConfig()
  if (!cfg.insforgeUrl || !cfg.insforgeAnonKey) return null
  try {
    const { createClient } = await import('@insforge/sdk')
    const client = createClient({ baseUrl: cfg.insforgeUrl, anonKey: cfg.insforgeAnonKey })
    const { data, error } = await client.database.from('radar_agents').select('payload')
    if (error) throw error
    const rows = (data || []).map((r: any) => r.payload).filter(Boolean)
    return rows.length ? (rows as AgentRow[]) : null
  } catch (err) {
    console.warn('[radar] BD no disponible, uso snapshot local:', (err as Error).message)
    return null
  }
}

function buildPayload(rows: AgentRow[]): RadarPayload {
  const groups: Record<string, AgentRow[]> = { ready: [], harness: [], framework: [], platform: [], tool: [] }
  for (const row of rows) {
    const key = row.kind === 'agent' || row.kind === 'bot' || row.kind === 'assistant'
      ? 'ready'
      : row.kind === 'harness' ? 'harness'
      : row.kind === 'framework' ? 'framework'
      : row.kind === 'platform' ? 'platform'
      : 'tool'
    groups[key].push(row)
  }
  const sortAgents = (a: AgentRow, b: AgentRow) => (a.rank || 0) - (b.rank || 0)
  groups.ready.sort(sortAgents)
  for (const k of Object.keys(groups)) {
    if (k !== 'ready') groups[k].sort((a, b) => b.total - a.total)
  }
  return {
    generated_at: snapshot.generated_at,
    generated_iso: snapshot.generated_iso,
    meta: snapshot.meta,
    counts: Object.fromEntries(Object.entries(groups).map(([k, v]) => [k, v.length])),
    pending: snapshot.pending,
    total_repos: snapshot.total_repos,
    total_analyzed: rows.length,
    groups
  }
}

export async function getRadar(): Promise<RadarPayload> {
  if (cache && Date.now() - cache.at < TTL) return cache.data
  const fromDb = await rowsFromDatabase()
  const data = fromDb ? buildPayload(fromDb) : snapshot
  cache = { at: Date.now(), data }
  return data
}

/** Versión ligera para el listado (sin README ni textos largos). */
export function toListRow(a: AgentRow) {
  return {
    id: a.id,
    slug: a.slug,
    rank: a.rank,
    full_name: a.full_name,
    url: a.url,
    summary: a.summary,
    description: a.description,
    kind: a.kind,
    archetype_label: a.archetype_label,
    generation: a.generation,
    tier: a.tier,
    total: a.total,
    agency: a.agency,
    confidence: a.confidence,
    dimensions: a.dimensions,
    stars: a.stars,
    releases_90: a.releases_90,
    last_release: a.last_release,
    language: a.language,
    has_pillars: a.has_pillars,
    next_tier: a.next_tier,
    delta_next: a.delta_next
  }
}
