<template>
  <div>
    <section class="hero container">
      <div class="hero__grid">
        <div>
          <span class="eyebrow">◎ Radar 2026</span>
          <h1>Los agentes que <em>de verdad</em> trabajan por ti</h1>
          <p class="lead">
            Cada repositorio se evalúa <b>uno por uno</b> con una rúbrica de 7 dimensiones y 8 pilares
            de agencia. Aquí ves la nota, la cuenta que la produce y el veredicto del juez —sin
            fórmulas que mezclen peras con manzanas.
          </p>
          <div class="hero__cta">
            <a href="#ranking" class="btn btn--primary">Ver el ranking</a>
            <NuxtLink to="/versus" class="btn btn--violet">⚔️ Iniciar un versus</NuxtLink>
            <NuxtLink to="/metodologia" class="btn btn--ghost">Cómo se califica</NuxtLink>
          </div>
        </div>
        <div class="stats">
          <div class="stat"><b>{{ counts.ready || 0 }}</b><span>agentes evaluados</span></div>
          <div class="stat"><b>{{ totalRepos }}</b><span>repositorios en el radar</span></div>
          <div class="stat"><b>{{ pending }}</b><span>pendientes de análisis</span></div>
          <div class="stat"><b>{{ tierA }}</b><span>en tier A o superior</span></div>
        </div>
      </div>
    </section>

    <section id="ranking" class="container" style="padding-top: 24px">
      <div class="panel">
        <div class="panel__head">
          <div class="tabs">
            <button
              v-for="g in groups"
              :key="g.key"
              class="tab"
              :class="{ 'is-active': tab === g.key }"
              @click="tab = g.key"
            >
              {{ g.label }}
              <small>{{ counts[g.key] || 0 }} · {{ g.hint }}</small>
            </button>
          </div>
        </div>

        <div class="filters">
          <label class="search">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" />
            </svg>
            <input v-model="q" type="search" placeholder="Buscar repositorio, resumen, lenguaje…" />
          </label>
          <div class="chips">
            <button
              v-for="t in ['ALL', 'S', 'A', 'B', 'C', 'D', 'E', 'F']"
              :key="t"
              class="chip"
              :class="{ 'is-active': tier === t }"
              @click="tier = t"
            >
              {{ t === 'ALL' ? 'Todos' : t }}
            </button>
          </div>
        </div>

        <div class="table-wrap">
          <table class="ranking">
            <thead>
              <tr>
                <th v-for="col in columns" :key="col.key" :class="{ sorted: sort === col.key }" @click="setSort(col.key)">
                  {{ col.label }}<span v-if="sort === col.key">{{ dir > 0 ? ' ▲' : ' ▼' }}</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(a, i) in visible" :key="a.id" @click="open(a.slug)">
                <td class="rank-num">{{ a.rank ?? i + 1 }}</td>
                <td><span class="tier" :class="`tier--${a.tier}`">{{ a.tier }}</span></td>
                <td>
                  <div class="repo-name">
                    {{ a.full_name }}
                    <span v-if="!a.has_pillars && tab === 'ready'" class="tag tag--warn">v1 sin pilares</span>
                  </div>
                  <div class="repo-desc">{{ a.summary || a.description }}</div>
                  <div class="dims" :title="dimTitle(a)">
                    <i v-for="d in dims" :key="d.key"><b :style="{ width: Math.max(0, Math.min(100, a.dimensions?.[d.key] || 0)) + '%', background: dimColor(a.dimensions?.[d.key] || 0) }" /></i>
                  </div>
                </td>
                <td class="num">{{ Math.round(a.agency || 0) }}</td>
                <td class="num score-cell"><b>{{ a.total.toFixed(1) }}</b></td>
                <td class="num" :style="{ color: confColor(a.confidence) }">{{ a.confidence }}</td>
                <td class="num deltatier">{{ a.next_tier ? `+${a.delta_next.toFixed(1)} → ${a.next_tier}` : '—' }}</td>
                <td class="num">{{ fmt(a.stars) }}</td>
                <td class="num">{{ a.releases_90 }}</td>
                <td><span class="tag">{{ a.kind }}</span></td>
              </tr>
              <tr v-if="!visible.length">
                <td colspan="10" class="empty">Ningún repositorio coincide con el filtro.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <p class="tiny" style="margin: 12px 2px 0">
        {{ visible.length }} de {{ (groups.find(g => g.key === tab)?.count) || 0 }} · Orden: generación (agencia) → puntos → estrellas.
        Haz clic en una fila para ver la ficha completa.
      </p>
    </section>

    <RepoDrawer :slug="selected" @close="selected = ''" />
  </div>
</template>

<script setup lang="ts">
const { data } = await useFetch('/api/agents')
const radar = data.value as any
if (!radar) throw createError({ statusCode: 502, statusMessage: 'Sin datos' })

const counts = computed(() => radar.counts || {})
const meta = radar.meta
const dims = meta.dimensions
const totalRepos = radar.total_repos
const pending = radar.pending
const tierA = computed(() => (radar.groups.ready || []).filter((a: any) => ['S', 'A'].includes(a.tier)).length)

useState('radar-generated', () => radar.generated_at)

const groups = [
  { key: 'ready', label: 'Agentes', hint: 'trabajan por ti' },
  { key: 'harness', label: 'Runtimes / infra', hint: 'ejecutan agentes' },
  { key: 'framework', label: 'Frameworks', hint: 'para construir' },
  { key: 'platform', label: 'Plataformas', hint: 'no-code' },
  { key: 'tool', label: 'Herramientas', hint: 'complementos' }
].map(g => ({ ...g, count: counts.value[g.key] || 0 }))

const tab = ref('ready')
const q = ref('')
const tier = ref('ALL')
const sort = ref('rank')
const dir = ref(1)
const selected = ref('')

const columns = [
  { key: 'rank', label: '#' },
  { key: 'tier', label: 'Tier' },
  { key: 'full_name', label: 'Repositorio' },
  { key: 'agency', label: 'Agencia' },
  { key: 'total', label: 'Pts IA' },
  { key: 'confidence', label: 'Conf.' },
  { key: 'delta_next', label: 'Δ tier' },
  { key: 'stars', label: '⭐' },
  { key: 'releases_90', label: 'Rel. 90d' },
  { key: 'kind', label: 'Tipo' }
]

function setSort(key: string) {
  if (sort.value === key) dir.value *= -1
  else { sort.value = key; dir.value = key === 'full_name' ? 1 : -1 }
}

const visible = computed(() => {
  const list = [...((radar.groups[tab.value] || []) as any[])]
  const needle = q.value.trim().toLowerCase()
  const filtered = list.filter(a => {
    if (tier.value !== 'ALL' && a.tier !== tier.value) return false
    if (!needle) return true
    return [a.full_name, a.summary, a.description, a.language, a.kind, a.archetype_label]
      .join(' ').toLowerCase().includes(needle)
  })
  return filtered.sort((a, b) => {
    const x = a[sort.value], y = b[sort.value]
    if (typeof x === 'string' || typeof y === 'string') return String(x).localeCompare(String(y)) * dir.value
    return ((x ?? -1e9) - (y ?? -1e9)) * dir.value
  })
})

function fmt(n: number) { return new Intl.NumberFormat('es-PE').format(n || 0) }
function dimColor(v: number) { return v >= 80 ? 'var(--good)' : v >= 65 ? 'var(--accent)' : v >= 45 ? 'var(--t-D)' : 'var(--bad)' }
function confColor(v: number) { return v >= 75 ? 'var(--good)' : v >= 50 ? 'var(--ink-2)' : 'var(--bad)' }
function dimTitle(a: any) {
  return dims.map((d: any) => `${d.label}: ${a.dimensions?.[d.key] || 0}`).join(' · ')
}
function open(slug: string) { selected.value = slug }

useHead({
  title: 'Ranking de agentes de IA evaluados uno por uno',
  meta: [
    { name: 'description', content: `Ranking de ${counts.value.ready} agentes de IA con rúbrica de 7 dimensiones y 8 pilares. Nota, desglose y veredicto de cada repositorio.` }
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'Ranking de Agentes IA',
        numberOfItems: (radar.groups.ready || []).length,
        itemListElement: (radar.groups.ready || []).slice(0, 20).map((a: any, i: number) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: a.full_name,
          url: `${useRuntimeConfig().public.siteUrl}/agente/${a.slug}`
        }))
      })
    }
  ]
})
</script>
