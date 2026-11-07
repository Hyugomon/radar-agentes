export default defineEventHandler((event) => {
  const config = useRuntimeConfig(event)
  const base = (config.public.siteUrl || 'https://radar.amaqon.cloud').replace(/\/$/, '')
  setHeader(event, 'Content-Type', 'text/plain; charset=utf-8')
  return `User-agent: *\nAllow: /\n\nSitemap: ${base}/sitemap.xml\n`
})
