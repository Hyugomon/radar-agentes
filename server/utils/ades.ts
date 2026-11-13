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
    priceNote: a.priceNote
  }
}
