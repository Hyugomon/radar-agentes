<template>
  <div class="container">
    <div class="agent-hero">
      <div class="crumbs">
        <NuxtLink to="/ades">ADEs</NuxtLink> <span>/</span> <span>{{ ade.catLabel }}</span>
      </div>
      <div class="agent-hero__grid">
        <div>
          <h1 class="agent-title">{{ ade.name }}</h1>
          <p class="muted" style="font-size: 16px; max-width: 720px">{{ ade.summary }}</p>
          <div style="display: flex; gap: 6px; flex-wrap: wrap; margin-top: 14px">
            <span class="tag">{{ ade.catLabel }}</span>
            <span class="tag">{{ ade.license || (ade.licenseType === 'No verificada' ? 'No verificada' : 'Comercial') }}</span>
            <span class="tag">{{ ade.execution }}</span>
            <span class="tag">#{{ ade.rank }} del ranking ADE</span>
            <a v-if="ade.website" class="tag" :href="ade.website" target="_blank" rel="noopener">Web ↗</a>
            <a v-if="ade.repo" class="tag" :href="ade.repo" target="_blank" rel="noopener">Repo ↗</a>
            <a v-if="ade.researchUrl" class="tag" :href="ade.researchUrl" target="_blank" rel="noopener">Dossier ↗</a>
          </div>
        </div>

        <aside class="panel score-card">
          <div class="gauge">
            <svg width="150" height="150" viewBox="0 0 150 150">
              <circle cx="75" cy="75" r="62" fill="none" stroke="var(--line)" stroke-width="12" />
              <circle
                cx="75" cy="75" r="62" fill="none" :stroke="ringColor" stroke-width="12"
                stroke-linecap="round" :stroke-dasharray="`${Math.PI * 2 * 62}`"
                :stroke-dashoffset="Math.PI * 2 * 62 * (1 - ade.total / 100)"
              />
            </svg>
            <div class="gauge__val">
              <b>{{ ade.total.toFixed(1) }}</b>
              <span>ADE Score</span>
            </div>
          </div>
          <span class="tier tier--lg" :class="`tier--${ade.tier}`">{{ ade.tier }}</span>
          <div class="kvrow"><span>Harnesses</span><b>{{ ade.harnesses.length || '—' }}</b></div>
          <div class="kvrow"><span>Remoto</span><b>{{ feature('remoto') ? 'Sí' : '—' }}</b></div>
          <div class="kvrow"><span>Móvil</span><b>{{ feature('movil') ? 'Sí' : '—' }}</b></div>
          <div class="kvrow"><span>Siguiente tier</span><b>{{ ade.next_tier ? `${ade.next_tier} (−${ade.delta_next?.toFixed(1)})` : '—' }}</b></div>
        </aside>
      </div>
    </div>

    <div class="panel" style="padding: 22px 24px; margin-top: 18px">
      <AdeDetail :ade="ade" :meta="meta" />
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { data, error } = await useFetch(`/api/ade/${route.params.slug}`)

if (error.value || !data.value) {
  throw createError({ statusCode: 404, statusMessage: 'ADE no encontrado', fatal: true })
}

const ade = (data.value as any).ade
const meta = (data.value as any).meta
const ringColor = computed(() => ade.total >= 85 ? 'var(--good)' : ade.total >= 70 ? 'var(--accent)' : 'var(--t-D)')
const feature = (key: string) => !!ade.features?.find((f: any) => f.key === key)?.on

useHead({
  title: `${ade.name} — ADE ${ade.total.toFixed(1)} · Tier ${ade.tier}`,
  meta: [
    { name: 'description', content: `${ade.name}: ${String(ade.summary || ade.tagline).slice(0, 155)}` },
    { property: 'og:title', content: `${ade.name} — ADE Score ${ade.total.toFixed(1)}` },
    { property: 'og:description', content: `${ade.catLabel} · ${ade.license || 'Comercial'} · ${ade.execution} · Tier ${ade.tier}` },
    { property: 'og:url', content: `${useRuntimeConfig().public.siteUrl}/ades/${ade.slug}` }
  ],
  link: [{ rel: 'canonical', href: `${useRuntimeConfig().public.siteUrl}/ades/${ade.slug}` }]
})
</script>
