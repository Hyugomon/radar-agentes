export default defineEventHandler(async () => {
  const ades = await getAdes()
  return {
    generated_at: ades.generated_at,
    generated_iso: ades.generated_iso,
    meta: ades.meta,
    counts: ades.counts,
    queue: ades.queue,
    groups: {
      ready: ades.groups.ready.map(toAdeListRow)
    }
  }
})
