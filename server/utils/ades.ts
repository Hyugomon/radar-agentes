import adesJson from '../../data/ades.json'

export interface AdeRow {
  id: string
  slug: string
  rank: number
  name: string
  repo: string | null
  website: string
  researchUrl: string
  category: string
  catLabel: string
  license: string | null
  licenseType: string
  tagline: string
  summary: string
  scores: Record<string, number>
  total: number
  tier: string
  next_tier: string | null
  delta_next: number | null
  strengths: string[]
  weaknesses: string[]
  pricing: string
  priceNote: string
  execution: string
  platforms: string[]
  harnesses: string[]
  features: { key: string; label: string; on: boolean }[]
  sources: { label: string; url: string; accessedAt: string }[]
  judged_day: string
  last_release?: string | null
  last_release_tag?: string | null
  last_release_url?: string | null
  last_release_days?: number | null
  releases_90?: number | null
  release_status?: string
  release_source?: string
  release_highlight?: string
  release_impact?: string
  release_checked_at?: string | null
}

export interface AdesPayload {
  generated_at: string
  generated_iso: string
  meta: any
  counts: Record<string, number>
  queue: { name: string; url: string }[]
  groups: Record<string, AdeRow[]>
}

const snapshot = adesJson as unknown as AdesPayload

export async function getAdes(): Promise<AdesPayload> {
  return snapshot
}

export function toAdeListRow(a: AdeRow) {
  return {
    id: a.id,
    slug: a.slug,
    rank: a.rank,
    name: a.name,
    repo: a.repo,
    website: a.website,
    researchUrl: a.researchUrl,
    category: a.category,
    catLabel: a.catLabel,
    license: a.license,
    licenseType: a.licenseType,
    tagline: a.tagline,
    summary: a.summary,
    scores: a.scores,
    total: a.total,
    tier: a.tier,
    next_tier: a.next_tier,
    delta_next: a.delta_next,
    execution: a.execution,
    platforms: a.platforms,
    harnesses: a.harnesses,
    features: a.features,
    pricing: a.pricing,
    priceNote: a.priceNote,
    last_release: a.last_release || null,
    last_release_tag: a.last_release_tag || null,
    last_release_url: a.last_release_url || null,
    last_release_days: a.last_release_days ?? null,
    releases_90: a.releases_90 ?? null,
    release_status: a.release_status || '',
    release_source: a.release_source || '',
    release_highlight: a.release_highlight || '',
    release_impact: a.release_impact || '',
    release_checked_at: a.release_checked_at || null
  }
}
