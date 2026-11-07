export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  const radar = await getRadar()
  const all = Object.values(radar.groups).flat()
  const agent = all.find(a => a.slug === slug)
  if (!agent) {
    throw createError({ statusCode: 404, statusMessage: 'Agente no encontrado' })
  }
  return { agent, meta: radar.meta }
})
