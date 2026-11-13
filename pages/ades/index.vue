<template>
  <div>
    <section class="hero container">
      <div class="hero__grid">
        <div>
          <span class="eyebrow">◎ ADE 2026 · Agent Development Environment</span>
          <h1>El workspace donde <em>orquestas</em> tus agentes</h1>
          <p class="lead">
            Un ADE no es un agente ni un framework: es el entorno donde corres, aíslas, revisas y
            entregas el trabajo de varios agentes de código. Aquí solo hay ADEs investigados uno por
            uno; el resto queda en cola, sin nota inventada.
          </p>
          <div class="hero__cta">
            <a href="#ranking" class="btn btn--primary">Ver el ranking ADE</a>
            <NuxtLink to="/" class="btn btn--ghost">← Volver a agentes</NuxtLink>
          </div>
          <div class="hero__proof">
            <span><b>{{ counts.researched || 0 }}</b> investigados</span>
            <span><b>{{ counts.queue || 0 }}</b> en cola</span>
            <span><b>{{ counts.open || 0 }}</b> open source</span>
            <span><b>{{ counts.closed || 0 }}</b> comerciales</span>
            <span v-if="counts.unverified"><b>{{ counts.unverified }}</b> sin licencia verificada</span>
          </div>
        </div>

        <aside class="benchmark">
          <div class="benchmark__eyebrow">QUÉ MIDE UN ADE</div>
          <div class="benchmark__top">
            <span class="benchmark__avatar">AD</span>
            <div style="min-width: 0">
              <b>ADE Score</b>
              <small>10 dimensiones · 0-100</small>
            </div>
            <span class="tier tier--SS">SS</span>
          </div>
          <p class="benchmark__text">
            No puntuamos lo bonita que es la landing. Puntuamos si el workspace resuelve el ciclo
            real: varios harnesses, paralelo, orquestación, revisión, remoto y móvil.
          </p>
          <ul class="benchmark__list">
            <li v-for="d in meta.dimensions.slice(0, 6)" :key="d.key">
              <span>✓</span>{{ d.label }}
            </li>
          </ul>
          <a href="#metodologia" class="btn btn--ghost btn--sm" style="width: 100%; justify-content: center">
            Ver la rúbrica ADE →
          </a>
        </aside>
      </div>
    </section>

    <section class="container" style="padding-top: 8px">
      <div class="manifesto">
        <div>
          <span class="eyebrow">ADE ≠ HARNESS</span>
          <h2>Workspace, no motor</h2>
          <p>
            Claude Code, Codex o Gemini CLI son <b>harnesses</b>: el motor que ejecuta al agente.
            Un <b>ADE</b> es donde los pones a trabajar juntos: sesiones, worktrees, revisión,
            SSH, cloud y móvil. Por eso los harnesses sueltos y los frameworks no entran en este ranking.
          </p>
        </div>
        <div class="manifesto__badges">
          <span class="tag tag--warn">Solo ADEs</span>
          <span class="tag">Sesiones</span>
          <span class="tag">Worktrees</span>
          <span class="tag">Revisión</span>
          <span class="tag">Remoto</span>
          <span class="tag">Móvil</span>
        </div>
      </div>
    </section>

    <section id="ranking" class="container" style="padding-top: 30px">
      <div class="panel">
        <div class="panel__head">
          <div>
            <span class="eyebrow">RANKING ADE</span>
            <h2 style="font-size: 20px; margin-top: 8px">Investigar uno por uno, sin copiar rankings</h2>
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
            <input v-model="q" type="search" placeholder="Buscar ADE, harness, licencia…" />
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
                    {{ a.name }}
                    <span class="tag">{{ a.catLabel }}</span>
                  </div>
                  <div class="repo-desc">{{ a.tagline }} — {{ a.summary }}</div>
                  <div class="dims" :title="dimTitle(a)">
                    <i v-for="d in dims" :key="d.key"><b :style="{ width: Math.max(0, Math.min(100, a.scores?.[d.key] || 0)) + '%', background: dimColor(a.scores?.[d.key] || 0) }" /></i>
                  </div>
                </td>
                <td class="num score-cell"><b>{{ a.total.toFixed(1) }}</b><div class="tiny">ADE Score</div></td>
                <td>
                  <span class="tag">{{ a.license || (a.licenseType === 'No verificada' ? 'No verificada' : 'Comercial') }}</span>
                  <div class="tiny">{{ a.execution }}</div>
                </td>
                <td>{{ a.harnesses.length >= 2 ? 'Multi' : '1' }}</td>
                <td>{{ feature(a, 'remoto') ? 'Sí' : '—' }}</td>
                <td>{{ feature(a, 'movil') ? 'Sí' : '—' }}</td>
                <td class="num deltatier">{{ a.next_tier ? `+${a.delta_next.toFixed(1)} → ${a.next_tier}` : '—' }}</td>
              </tr>
              <tr v-if="!visible.length">
                <td colspan="9" class="empty">Ningún ADE coincide con el filtro.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <p class="tiny" style="margin: 12px 2px 0">
        {{ visible.length }} de {{ counts.researched || 0 }} ADEs investigados · Orden por ADE Score.
        La cola de abajo todavía no tiene nota.
      </p>
    </section>

    <section class="container" style="padding-top: 30px">
      <div class="panel" style="padding: 22px 24px">
        <div class="panel__head" style="padding: 0 0 14px; border: 0">
          <div>
            <span class="eyebrow">COLA DE INVESTIGACIÓN</span>
            <h2 style="font-size: 20px; margin-top: 8px">{{ queue.length }} ADE pendientes, sin nota</h2>
          </div>
          <p class="tiny" style="max-width: 360px; text-align: right">
            Solo nombres y web oficial. No se rankean hasta tener dossier propio.
          </p>
        </div>
        <div class="topics">
          <a v-for="q in queue" :key="q.name" :href="q.url" target="_blank" rel="noopener" class="tag">
            {{ q.name }} ↗
          </a>
        </div>
      </div>
    </section>

    <section id="metodologia" class="container" style="padding-top: 28px">
      <div class="panel explainer">
        <div>
          <span class="eyebrow">CÓMO SE MIDE</span>
          <h3>10 dimensiones, no una captura de pantalla</h3>
          <p>
            Harnesses 15 %, paralelismo 15 %, orquestación 12 %, revisión 12 %, remoto 10 %,
            móvil 6 %, extensiones 10 %, control 8 %, apertura 6 % y producto 6 %.
            Cada dossier guarda las fuentes y las citas que sustentan la nota.
          </p>
        </div>
        <span class="tag">Investigación documental, no hands-on</span>
      </div>
    </section>

    <AdeDrawer :slug="selected" @close="selected = ''" />
  </div>
</template>

<script setup lang="ts">
const { data } = await useFetch('/api/ades')
const ades = data.value as any
if (!ades) throw createError({ statusCode: 502, statusMessage: 'Sin datos ADE' })

const counts = computed(() => ades.counts || {})
const meta = ades.meta
const dims = meta.dimensions
const ready = computed(() => (ades.groups.ready || []) as any[])
const queue = computed(() => (ades.queue || []) as any[])

useState('radar-generated', () => ades.generated_at)

const filters = [
  { key: 'ALL', label: 'Todos' },
  { key: 'workspace', label: 'Workspaces' },
  { key: 'ide', label: 'IDEs' },
  { key: 'orchestrator', label: 'Orquestadores' },
  { key: 'terminal', label: 'Terminal' }
]
const filter = ref('ALL')
const q = ref('')
const tier = ref('ALL')
const sort = ref('rank')
const dir = ref(1)
const selected = ref('')

const columns = [
  { key: 'rank', label: '#' },
  { key: 'tier', label: 'Tier' },
  { key: 'name', label: 'ADE' },
  { key: 'total', label: 'ADE Score' },
  { key: 'license', label: 'Licencia' },
  { key: 'harnesses', label: 'Harness' },
  { key: 'remoto', label: 'Remoto' },
  { key: 'movil', label: 'Móvil' },
  { key: 'delta_next', label: 'Le falta' }
]

function setSort(key: string) {
  if (sort.value === key) dir.value *= -1
  else { sort.value = key; dir.value = key === 'rank' || key === 'name' ? 1 : -1 }
}

function matchesFilter(a: any) {
  if (filter.value === 'ALL') return true
  return a.category === filter.value
}

const visible = computed(() => {
  const list = [...ready.value]
  const needle = q.value.trim().toLowerCase()
  const filtered = list.filter(a => {
    if (!matchesFilter(a)) return false
    if (tier.value !== 'ALL' && a.tier !== tier.value) return false
    if (!needle) return true
    return [a.name, a.tagline, a.summary, a.license, a.execution, a.catLabel, a.harnesses?.join(' ')]
      .join(' ').toLowerCase().includes(needle)
  })
  return filtered.sort((a, b) => {
    const rawX = a[sort.value], rawY = b[sort.value]
    const x = Array.isArray(rawX) ? rawX.length : rawX
    const y = Array.isArray(rawY) ? rawY.length : rawY
    if (typeof x === 'string' || typeof y === 'string') return String(x).localeCompare(String(y)) * dir.value
    return ((x ?? -1e9) - (y ?? -1e9)) * dir.value
  })
})

function feature(a: any, key: string) {
  return !!a.features?.find((f: any) => f.key === key)?.on
}
function dimColor(v: number) { return v >= 80 ? 'var(--good)' : v >= 65 ? 'var(--accent)' : v >= 45 ? 'var(--t-D)' : 'var(--bad)' }
function dimTitle(a: any) {
  return dims.map((d: any) => `${d.label}: ${a.scores?.[d.key] || 0}`).join(' · ')
}
function open(slug: string) { selected.value = slug }

useHead({
  title: 'Ranking de ADEs: Agent Development Environments',
  meta: [{ name: 'description', content: `Ranking de ${counts.value.researched} ADEs investigados uno por uno: harnesses, paralelismo, orquestación, revisión, remoto y móvil. ${counts.value.queue} pendientes en cola, sin nota inventada.` }]
})
</script>
