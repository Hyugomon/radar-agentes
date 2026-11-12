<template>
  <div>
    <section class="hero container">
      <div class="hero__grid">
        <div>
          <span class="eyebrow">◎ Radar 2026 · solo open source</span>
          <h1>Los agentes open source que <em>de verdad</em> trabajan por ti</h1>
          <p class="lead">
            Un ranking de <b>repos open source</b> que puedes instalar o autoalojar. El listón es
            <b>Grok Bot</b>, un producto cerrado: identidad propia, computadora, memoria, rutinas y
            aprobaciones. Aquí ves qué tan cerca está cada repo y qué le falta.
          </p>
          <div class="hero__cta">
            <a href="#ranking" class="btn btn--primary">Ver el ranking</a>
            <NuxtLink to="/versus" class="btn btn--violet">⚔️ Iniciar un versus</NuxtLink>
            <NuxtLink to="/metodologia" class="btn btn--ghost">Cómo se califica</NuxtLink>
          </div>
          <div class="hero__proof">
            <span><b>{{ counts.ready || 0 }}</b> repos</span>
            <span><b>{{ counts.personal || 0 }}</b> bots personales</span>
            <span><b>{{ counts.teams || 0 }}</b> equipos</span>
            <span><b>{{ topTiers }}</b> en S</span>
          </div>
        </div>

        <aside v-if="reference" class="benchmark">
          <div class="benchmark__eyebrow">EL LISTÓN · {{ reference.score }}/100</div>
          <div class="benchmark__top">
            <span class="benchmark__avatar">GB</span>
            <div style="min-width: 0">
              <b>{{ reference.name }}</b>
              <small>{{ reference.maker }} · producto cerrado</small>
            </div>
            <span class="tier tier--SS">SS</span>
          </div>
          <p class="benchmark__text">
            No compite: es el estándar. Varios bots con nombre que comparten una computadora,
            memoria, skills, rutinas y aprobaciones. Todo lo demás se mide contra esto.
          </p>
          <ul class="benchmark__list">
            <li v-for="p in meta.pillars" :key="p.key">
              <span>✓</span>{{ p.label }}
            </li>
          </ul>
          <a :href="reference.url" target="_blank" rel="noopener" class="btn btn--ghost btn--sm" style="width: 100%; justify-content: center">
            Ver la documentación oficial ↗
          </a>
        </aside>
      </div>
    </section>

    <section class="container" style="padding-top: 8px">
      <div class="manifesto">
        <div>
          <span class="eyebrow">SOLO OPEN SOURCE</span>
          <h2>Repos open source, no frameworks ni productos cerrados</h2>
          <p>
            Grok Bot, Dots, Muse o Cue son la referencia de lo que debe hacer un agente, pero
            <b>no entran</b>: son cerrados. LangChain, LangGraph, CrewAI, AutoGen, SDKs y runtimes
            tampoco: no son agentes finales. Aquí solo hay repos que puedes instalar, auditar y autoalojar.
          </p>
        </div>
        <div class="manifesto__badges">
          <span class="tag tag--warn">Grok Bot: referencia cerrada</span>
          <span class="tag">Fuera del ranking</span>
          <span v-for="x in meta.excluded.slice(0, 8)" :key="x" class="tag">{{ x }}</span>
        </div>
      </div>
    </section>

    <section class="container" style="padding-top: 26px">
      <div class="shortlist">
        <div class="shortlist__head">
          <div>
            <span class="eyebrow">SHORTLIST</span>
            <h2>Si quieres lo más parecido a Grok Bot</h2>
          </div>
          <p class="muted">Cuatro atajos entre los repos open source del ranking.</p>
        </div>
        <div class="shortlist__grid">
          <NuxtLink
            v-for="pick in shortlist"
            :key="pick.agent.slug"
            :to="`/agente/${pick.agent.slug}`"
            class="shortlist__card"
          >
            <div class="shortlist__top">
              <span class="tiny">{{ pick.label }}</span>
              <span class="tier" :class="`tier--${pick.agent.tier}`">{{ pick.agent.tier }}</span>
            </div>
            <b>{{ pick.agent.full_name }}</b>
            <p>{{ pick.agent.tagline }}</p>
            <div class="shortlist__bottom">
              <span class="shortlist__score">{{ pick.agent.total.toFixed(1) }}<small>/100</small></span>
              <span class="tiny">{{ pick.agent.license }} · {{ pick.agent.setupLabel }}</span>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <section id="ranking" class="container" style="padding-top: 30px">
      <div class="panel">
        <div class="panel__head">
          <div>
            <span class="eyebrow">RANKING 2026</span>
            <h2 style="font-size: 20px; margin-top: 8px">Repos open source que puedes instalar hoy</h2>
          </div>
          <div class="spacer" />
          <div class="chips">
            <button
              v-for="f in filters"
              :key="f.key"
              class="chip"
              :class="{ 'is-active': filter === f.key }"
              @click="filter = f.key"
            >
              {{ f.label }}
            </button>
          </div>
        </div>

        <div class="filters">
          <label class="search">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" />
            </svg>
            <input v-model="q" type="search" placeholder="Buscar repo, maker, licencia…" />
          </label>
          <div class="chips">
            <button
              v-for="t in ['ALL', 'SS', 'S', 'A', 'B', 'C']"
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
              <tr v-for="a in visible" :key="a.slug" @click="open(a.slug)">
                <td class="rank-num">{{ a.rank }}</td>
                <td><span class="tier" :class="`tier--${a.tier}`">{{ a.tier }}</span></td>
                <td>
                  <div class="repo-name">
                    {{ a.full_name }}
                    <span class="tag">{{ a.catLabel }}</span>
                  </div>
                  <div class="repo-desc">{{ a.tagline }} — {{ a.summary }}</div>
                  <div class="dims" :title="dimTitle(a)">
                    <i v-for="d in dims" :key="d.key"><b :style="{ width: Math.max(0, Math.min(100, a.dimensions?.[d.key] || 0)) + '%', background: dimColor(a.dimensions?.[d.key] || 0) }" /></i>
                  </div>
                </td>
                <td class="num score-cell"><b>{{ a.total.toFixed(1) }}</b><div class="tiny">Grok Score</div></td>
                <td class="num">{{ Math.round(a.agency) }}</td>
                <td>
                  <span class="tag">{{ a.license || '—' }}</span>
                  <div class="tiny">Open source</div>
                </td>
                <td>{{ a.setupLabel }}</td>
                <td class="num deltatier">{{ a.next_tier ? `+${a.delta_next.toFixed(1)} → ${a.next_tier}` : '—' }}</td>
              </tr>
              <tr v-if="!visible.length">
                <td colspan="8" class="empty">Ningún repo coincide con el filtro.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <p class="tiny" style="margin: 12px 2px 0">
        {{ visible.length }} de {{ counts.ready || 0 }} repos open source · Orden por Grok Score; el ADN desempata.
        Haz clic en una fila para ver la ficha completa, las fuentes y el dossier.
      </p>
    </section>

    <section class="container" style="padding-top: 28px">
      <div class="panel explainer">
        <div>
          <span class="eyebrow">CÓMO LEERLO</span>
          <h3>Grok Score no es “me gusta más”</h3>
          <p>
            Es una nota de 0 a 100 contra el estándar de Grok Bot: 15 % capacidad, 15 % autonomía,
            15 % computadora, 10 % memoria, 10 % rutinas, 10 % equipo, 10 % confianza y 15 % producto.
            El <b>ADN</b> marca las 8 piezas que separan un bot de un chat con herramientas.
          </p>
        </div>
        <NuxtLink to="/metodologia" class="btn">Ver la rúbrica completa →</NuxtLink>
      </div>
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
const ready = computed(() => (radar.groups.ready || []) as any[])
const reference = computed(() => meta.reference)
const topTiers = computed(() => ready.value.filter(a => ['SS', 'S'].includes(a.tier)).length)

useState('radar-generated', () => radar.generated_at)

const filters = [
  { key: 'ALL', label: 'Todos' },
  { key: 'PERSONAL', label: 'Bots personales' },
  { key: 'TEAMS', label: 'Equipos' },
  { key: 'GENERAL', label: 'Agentes generales' }
]
const filter = ref('ALL')
const q = ref('')
const tier = ref('ALL')
const sort = ref('rank')
const dir = ref(1)
const selected = ref('')

const shortlist = computed(() => {
  const picks = [
    { slug: 'milind-soni-openmausbot', label: 'El más cercano a Grok Bot' },
    { slug: 'leepokai-codync', label: 'Mejor desde el móvil' },
    { slug: 'anil-matcha-open-duet', label: 'Mejor equipo' },
    { slug: 'nanocoai-nanoclaw', label: 'Mejor aislamiento' }
  ]
  return picks
    .map(pick => ({ ...pick, agent: ready.value.find(a => a.slug === pick.slug) }))
    .filter(pick => !!pick.agent)
})

const columns = [
  { key: 'rank', label: '#' },
  { key: 'tier', label: 'Tier' },
  { key: 'full_name', label: 'Repo' },
  { key: 'total', label: 'Grok Score' },
  { key: 'agency', label: 'ADN' },
  { key: 'license', label: 'Licencia' },
  { key: 'setupLabel', label: 'Setup' },
  { key: 'delta_next', label: 'Le falta' }
]

function setSort(key: string) {
  if (sort.value === key) dir.value *= -1
  else { sort.value = key; dir.value = key === 'rank' || key === 'full_name' ? 1 : -1 }
}

function matchesFilter(a: any) {
  if (filter.value === 'PERSONAL') return a.category === 'personal'
  if (filter.value === 'TEAMS') return a.category === 'teams'
  if (filter.value === 'GENERAL') return a.category === 'general'
  return true
}

const visible = computed(() => {
  const list = [...ready.value]
  const needle = q.value.trim().toLowerCase()
  const filtered = list.filter(a => {
    if (!matchesFilter(a)) return false
    if (tier.value !== 'ALL' && a.tier !== tier.value) return false
    if (!needle) return true
    return [a.full_name, a.repo, a.summary, a.tagline, a.maker, a.catLabel, a.license, a.models, a.platforms?.join(' ')]
      .join(' ').toLowerCase().includes(needle)
  })
  return filtered.sort((a, b) => {
    const x = a[sort.value], y = b[sort.value]
    if (typeof x === 'string' || typeof y === 'string') return String(x).localeCompare(String(y)) * dir.value
    return ((x ?? -1e9) - (y ?? -1e9)) * dir.value
  })
})

function dimColor(v: number) { return v >= 80 ? 'var(--good)' : v >= 65 ? 'var(--accent)' : v >= 45 ? 'var(--t-D)' : 'var(--bad)' }
function dimTitle(a: any) {
  return dims.map((d: any) => `${d.label}: ${a.dimensions?.[d.key] || 0}`).join(' · ')
}
function open(slug: string) { selected.value = slug }

useHead({
  title: 'Ranking de agentes open source que trabajan por ti',
  meta: [
    { name: 'description', content: `Ranking de ${counts.value.ready} repos open source medidos contra Grok Bot: identidad, computadora, memoria, rutinas y aprobaciones. Sin frameworks ni productos cerrados.` }
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'Ranking de Agentes IA',
        numberOfItems: ready.value.length,
        itemListElement: ready.value.slice(0, 20).map((a: any, i: number) => ({
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
