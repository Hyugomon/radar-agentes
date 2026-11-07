export default defineNuxtConfig({
  compatibilityDate: '2026-11-07',
  devtools: { enabled: false },
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      htmlAttrs: { lang: 'es' },
      titleTemplate: '%s · Radar de Agentes IA',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#f7f8fb' },
        { name: 'description', content: 'Ranking independiente de agentes de IA: cada repositorio evaluado uno por uno con una rúbrica de 7 dimensiones y 8 pilares, con la cuenta a la vista.' },
        { property: 'og:site_name', content: 'Radar de Agentes IA' },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary_large_image' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'canonical', href: 'https://radar.amaqon.cloud' }
      ]
    }
  },
  runtimeConfig: {
    insforgeUrl: process.env.INSFORGE_URL || '',
    insforgeAnonKey: process.env.INSFORGE_ANON_KEY || '',
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://radar.amaqon.cloud'
    }
  },
  nitro: {
    compressPublicAssets: true
  }
})
