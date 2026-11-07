<template>
  <div class="container">
    <div class="agent-hero">
      <div class="crumbs">
        <NuxtLink to="/">Ranking</NuxtLink> <span>/</span> <span>{{ agent.kind }}</span>
      </div>
      <div class="agent-hero__grid">
        <div>
          <h1 class="agent-title">{{ agent.full_name }}</h1>
          <p class="muted" style="font-size: 16px; max-width: 720px">{{ agent.summary || agent.description }}</p>
          <div style="display: flex; gap: 6px; flex-wrap: wrap; margin-top: 14px">
            <span class="tag">{{ agent.kind }}</span>
            <span class="tag">{{ agent.archetype_label }}</span>
            <span class="tag">{{ generationLabel }}</span>
            <span class="tag">#{{ agent.rank }} del ranking</span>
            <a class="tag" :href="agent.url" target="_blank" rel="noopener">GitHub ↗</a>
            <NuxtLink class="tag" :to="`/versus?retador=${agent.slug}`">⚔️ Versus</NuxtLink>
          </div>
        </div>

        <aside class="panel score-card">
          <div class="gauge">
            <svg width="150" height="150" viewBox="0 0 150 150">
              <circle cx="75" cy="75" r="62" fill="none" stroke="var(--line)" stroke-width="12" />
              <circle
                cx="75" cy="75" r="62" fill="none" :stroke="ringColor" stroke-width="12"
                stroke-linecap="round" :stroke-dasharray="`${Math.PI * 2 * 62}`"
                :stroke-dashoffset="Math.PI * 2 * 62 * (1 - agent.total / 100)"
              />
            </svg>
            <div class="gauge__val">
              <b>{{ agent.total.toFixed(1) }}</b>
              <span>pts IA</span>
            </div>
          </div>
          <span class="tier tier--lg" :class="`tier--${agent.tier}`">{{ agent.tier }}</span>
          <div class="kvrow"><span>Agencia</span><b>{{ Math.round(agent.agency) }}/{{ agent.agency_max }}</b></div>
          <div class="kvrow"><span>Confianza</span><b>{{ agent.confidence }}/100</b></div>
          <div class="kvrow"><span>Estrellas</span><b>{{ fmt(agent.stars) }}</b></div>
          <div class="kvrow"><span>Siguiente tier</span><b>{{ agent.next_tier ? `${agent.next_tier} (−${agent.delta_next?.toFixed(1)})` : '—' }}</b></div>
        </aside>
      </div>
    </div>

    <div class="panel" style="padding: 22px 24px; margin-top: 18px">
      <AgentDetail :agent="agent" :meta="meta" />
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { data, error } = await useFetch(`/api/agent/${route.params.slug}`)

if (error.value || !data.value) {
  throw createError({ statusCode: 404, statusMessage: 'Agente no encontrado', fatal: true })
}

const agent = (data.value as any).agent
const meta = (data.value as any).meta

const generationLabel = computed(() => {
  const g = (meta.generations || []).find((x: any) => x.key === agent.generation)
  return g?.label || agent.generation
})
const ringColor = computed(() => agent.total >= 75 ? 'var(--good)' : agent.total >= 55 ? 'var(--accent)' : 'var(--t-D)')

function fmt(n: number) { return new Intl.NumberFormat('es-PE').format(n || 0) }

useHead({
  title: `${agent.full_name} — Tier ${agent.tier} · ${agent.total.toFixed(1)} pts`,
  meta: [
    { name: 'description', content: `${agent.full_name}: ${String(agent.summary || agent.description).slice(0, 155)}` },
    { property: 'og:title', content: `${agent.full_name} — Tier ${agent.tier}` },
    { property: 'og:description', content: `Agencia ${Math.round(agent.agency)}/100 · ${agent.total.toFixed(1)} pts en el Radar de Agentes IA.` },
    { property: 'og:url', content: `${useRuntimeConfig().public.siteUrl}/agente/${agent.slug}` }
  ],
  link: [{ rel: 'canonical', href: `${useRuntimeConfig().public.siteUrl}/agente/${agent.slug}` }],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: agent.full_name,
        description: agent.summary || agent.description,
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'Web',
        url: agent.url,
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: agent.total,
          bestRating: 100,
          worstRating: 0,
          ratingCount: 1
        }
      })
    }
  ]
})
</script>
