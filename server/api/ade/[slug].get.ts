export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  const ades = await getAdes()
  const ade = ades.groups.ready.find(a => a.slug === slug)
  if (!ade) {
    throw createError({ statusCode: 404, statusMessage: 'ADE no encontrado' })
  }
  return { ade, meta: ades.meta, counts: ades.counts }
})
