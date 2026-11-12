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
        { name: 'description', content: 'Ranking de repos open source medidos contra Grok Bot: identidad, computadora, memoria, rutinas y aprobaciones. Sin frameworks ni productos cerrados.' },
        { property: 'og:site_name', content: 'Radar de Agentes IA' },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary_large_image' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'canonical', href: 'https://radar-agentes.72.60.159.20.sslip.io' }
      ]
    }
  },
  runtimeConfig: {
    insforgeUrl: process.env.INSFORGE_URL || 'https://insforge.amaqon.cloud',
    insforgeAnonKey: process.env.INSFORGE_ANON_KEY || '',
    insforgeApiKey: process.env.INSFORGE_API_KEY || '',
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://radar-agentes.72.60.159.20.sslip.io'
    }
  },
  nitro: {
    compressPublicAssets: true
  }
})
