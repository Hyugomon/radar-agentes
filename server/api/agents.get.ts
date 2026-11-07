export default defineEventHandler(async () => {
  const radar = await getRadar()
  const groups = Object.fromEntries(
    Object.entries(radar.groups).map(([key, items]) => [key, items.map(toListRow)])
  )
  return {
    generated_at: radar.generated_at,
    counts: radar.counts,
    pending: radar.pending,
    total_repos: radar.total_repos,
    total_analyzed: radar.total_analyzed,
    meta: radar.meta,
    groups
  }
})
