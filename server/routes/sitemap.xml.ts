export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const base = (config.public.siteUrl || 'https://radar-agentes.72.60.159.20.sslip.io').replace(/\/$/, '')
  const radar = await getRadar()
  const ades = await getAdes()
  const agents = radar.groups.ready || []
  const adeRows = ades.groups.ready || []
  const urls = [
    { loc: '/', priority: '1.0', changefreq: 'daily' },
    { loc: '/versus', priority: '0.8', changefreq: 'weekly' },
    { loc: '/ades', priority: '0.9', changefreq: 'weekly' },
    { loc: '/metodologia', priority: '0.6', changefreq: 'monthly' },
    ...agents.map(a => ({ loc: `/agente/${a.slug}`, priority: '0.7', changefreq: 'weekly' })),
    ...adeRows.map(a => ({ loc: `/ades/${a.slug}`, priority: '0.7', changefreq: 'weekly' }))
  ]
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url><loc>${base}${u.loc}</loc><changefreq>${u.changefreq}</changefreq><priority>${u.priority}</priority></url>`).join('\n')}
</urlset>`
  setHeader(event, 'Content-Type', 'application/xml; charset=utf-8')
  return body
})
