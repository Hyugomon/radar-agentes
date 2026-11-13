<template>
  <div class="container vs-hero">
    <span class="eyebrow">⚔️ Modo versus</span>
    <h1 style="font-size: clamp(32px, 4vw, 46px); margin: 16px 0 10px">Ponlos cara a cara</h1>
    <p class="muted" style="font-size: 16px; max-width: 720px">
      {{ mode === 'agents'
        ? 'Elige dos repos open source y deja que se peleen dimensión por dimensión. Gana el que más Grok Score tiene; si empatan, decide el ADN y luego la dimensión de producto.'
        : 'Elige dos ADEs y compara sus dimensiones: harnesses, paralelismo, orquestación, revisión, remoto y móvil. Nada de mezclar agentes con ADEs.' }}
    </p>

    <div class="vs-modes">
      <button class="vs-mode" :class="{ 'is-active': mode === 'agents' }" @click="setMode('agents')">
        🤖 Agentes open source
        <small>{{ agentItems.length }}</small>
      </button>
      <button class="vs-mode" :class="{ 'is-active': mode === 'ades' }" @click="setMode('ades')">
        🧰 ADEs
        <small>{{ adeItems.length }}</small>
      </button>
    </div>

    <div class="panel" style="padding: 22px; margin-top: 22px">
      <div class="picker-grid">
        <AgentPicker v-model="slugA" :agents="catalog" label="Retador A" />
        <div class="vs-middle"><div class="vs-badge">VS</div></div>
        <AgentPicker v-model="slugB" :agents="catalog" label="Retador B" />
      </div>

      <div v-if="a && b" class="vs-preview">
        <div class="vs-preview__side">
          <FighterPortrait :fighter="a" />
          <div class="vs-preview__info">
            <b>{{ a.full_name }}</b>
            <span>{{ a.tagline }}</span>
            <div class="vs-preview__meta">
              <span class="tier" :class="`tier--${a.tier}`">{{ a.tier }}</span>
              <span class="tiny">{{ a.total.toFixed(1) }} pts</span>
            </div>
          </div>
        </div>
        <div class="vs-preview__vs">VS</div>
        <div class="vs-preview__side vs-preview__side--b">
          <FighterPortrait :fighter="b" />
          <div class="vs-preview__info">
            <b>{{ b.full_name }}</b>
            <span>{{ b.tagline }}</span>
            <div class="vs-preview__meta">
              <span class="tier" :class="`tier--${b.tier}`">{{ b.tier }}</span>
              <span class="tiny">{{ b.total.toFixed(1) }} pts</span>
            </div>
          </div>
        </div>
      </div>

      <div class="vs-start">
        <button class="btn btn--primary" :disabled="!canStart" @click="startBattle">
          ▶ Iniciar versus
        </button>
        <button class="btn" @click="randomize">🎲 Aleatorio</button>
        <button
          v-if="mode === 'agents'"
          class="btn"
          :disabled="!battleDone"
          :title="battleDone ? 'Descargar tarjeta del resultado' : 'Primero termina el versus'"
          @click="downloadCard"
        >
          📸 Tarjeta
        </button>
      </div>
      <p v-if="!canStart" class="tiny" style="text-align: center">
        Elige dos {{ mode === 'agents' ? 'agentes' : 'ADEs' }} distintos para comenzar.
      </p>
    </div>

    <div v-if="a && b && !battleOpen" class="panel" style="padding: 16px 20px; margin-top: 18px">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px">
        <b style="font-size: 13.5px">{{ a.full_name }}</b>
        <span class="tiny" style="text-transform: uppercase; letter-spacing: .1em">cara a cara</span>
        <b style="font-size: 13.5px">{{ b.full_name }}</b>
      </div>
      <div v-for="d in meta.dimensions" :key="d.key" class="preview-row">
        <span class="preview-val">{{ a.dimensions?.[d.key] || 0 }}</span>
        <div class="preview-bar"><i :style="{ width: (a.dimensions?.[d.key] || 0) + '%', background: 'var(--accent)' }" /></div>
        <span class="preview-label">{{ d.label }}</span>
        <div class="preview-bar"><i :style="{ width: (b.dimensions?.[d.key] || 0) + '%', background: 'var(--violet)' }" /></div>
        <span class="preview-val" style="text-align: right">{{ b.dimensions?.[d.key] || 0 }}</span>
      </div>
    </div>

    <div ref="arenaSlot">
      <BattleStage
        v-if="battleOpen && a && b"
        :key="battleKey"
        :a="a"
        :b="b"
        :meta="meta"
        @close="battleOpen = false"
        @rematch="rematch"
        @download="downloadCard"
        @done="battleDone = true"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const { data: agentsData } = await useFetch('/api/agents')
const { data: adesData } = await useFetch('/api/ades')
if (!agentsData.value || !adesData.value) throw createError({ statusCode: 502, statusMessage: 'Sin datos' })

const route = useRoute()
const router = useRouter()
const { download } = usePoster()

const agentMeta = (agentsData.value as any).meta
const adeMeta = (adesData.value as any).meta

const agentItems = ((agentsData.value as any).groups.ready || []).map((a: any) => ({
  ...a,
  dimensions: a.dimensions,
  features: agentMeta.pillars.map((p: any) => ({ key: p.key, label: p.label, on: !!a.pillars?.[p.key] })),
  subLabel: `ADN ${Math.round(a.agency)}`,
  profileUrl: `/agente/${a.slug}`,
  kind: 'agent'
}))

const adeItems = ((adesData.value as any).groups.ready || []).map((a: any) => ({
  ...a,
  full_name: a.name,
  dimensions: a.scores,
  features: a.features || [],
  subLabel: `${a.features.filter((f: any) => f.on).length}/${a.features.length} capacidades`,
  profileUrl: `/ades/${a.slug}`,
  agency: 0,
  confidence: 0,
  stars: 0,
  language: '',
  kind: 'ade'
}))

const mode = ref<'agents' | 'ades'>('agents')
const slugA = ref('')
const slugB = ref('')
const battleOpen = ref(false)
const battleDone = ref(false)
const battleKey = ref(0)
const arenaSlot = ref<HTMLElement | null>(null)

const catalog = computed(() => mode.value === 'agents' ? agentItems : adeItems)
const meta = computed(() => mode.value === 'agents' ? agentMeta : adeMeta)
const a = computed(() => catalog.value.find((x: any) => x.slug === slugA.value))
const b = computed(() => catalog.value.find((x: any) => x.slug === slugB.value))
const canStart = computed(() => !!a.value && !!b.value && slugA.value !== slugB.value)
const stamp = computed(() => String((mode.value === 'agents' ? agentsData.value : adesData.value)?.generated_at || '').slice(0, 10))

// Estado inicial en SSR para que la vista previa de personajes exista antes de hidratar.
const initialMode: 'agents' | 'ades' = route.query.mode === 'ades' ? 'ades' : 'agents'
mode.value = initialMode
const initialList = initialMode === 'agents' ? agentItems : adeItems
const initialA = typeof route.query.a === 'string' ? route.query.a : ''
const initialB = typeof route.query.b === 'string' ? route.query.b : ''
slugA.value = initialList.some(x => x.slug === initialA) ? initialA : (initialList[0]?.slug || '')
slugB.value = initialList.some(x => x.slug === initialB) ? initialB : (initialList[1]?.slug || '')

function pickRandom(pool: any[]) {
  return pool[Math.floor(Math.random() * pool.length)]
}

function setMode(next: 'agents' | 'ades') {
  if (mode.value === next) return
  mode.value = next
  battleOpen.value = false
  battleDone.value = false
  const list = next === 'agents' ? agentItems : adeItems
  slugA.value = list[0]?.slug || ''
  slugB.value = list[1]?.slug || ''
  router.replace({ query: { mode: next } })
}

function resetBattle() {
  battleOpen.value = false
  battleDone.value = false
  battleKey.value++
}

watch([slugA, slugB], resetBattle, { flush: 'sync' })

function randomize() {
  resetBattle()
  const list = catalog.value
  if (list.length < 2) return
  const first = pickRandom(list)
  const same = list.filter(x => x.slug !== first.slug && x.generation === first.generation)
  const others = list.filter(x => x.slug !== first.slug)
  const second = pickRandom(same.length && Math.random() < 0.65 ? same : others)
  slugA.value = first.slug
  slugB.value = second.slug
}

function startBattle() {
  if (!canStart.value) return
  battleDone.value = false
  battleKey.value++
  battleOpen.value = true
  router.replace({ query: { mode: mode.value, a: slugA.value, b: slugB.value } })
  nextTick(() => arenaSlot.value?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
}

function rematch() {
  battleKey.value++
  randomize()
  nextTick(() => { battleKey.value++; battleOpen.value = true })
}

function downloadCard() {
  if (!battleDone.value || mode.value !== 'agents' || !a.value || !b.value) return
  download(a.value, b.value, meta.value.dimensions, stamp.value)
}

onMounted(() => {
  const queryMode = route.query.mode === 'ades' ? 'ades' : 'agents'
  mode.value = queryMode
  const list = queryMode === 'agents' ? agentItems : adeItems
  const queryA = route.query.a as string | undefined
  const queryB = route.query.b as string | undefined
  const retador = route.query.retador as string | undefined

  if (queryA && list.some(x => x.slug === queryA)) slugA.value = queryA
  if (queryB && list.some(x => x.slug === queryB)) slugB.value = queryB

  if (retador && agentItems.some(x => x.slug === retador)) {
    mode.value = 'agents'
    slugA.value = retador
    if (!slugB.value) {
      const same = agentItems.filter(x => x.slug !== retador && x.generation === agentItems.find(y => y.slug === retador)?.generation)
      const pool = same.length ? same : agentItems.filter(x => x.slug !== retador)
      slugB.value = pickRandom(pool).slug
    }
  }

  if (!slugA.value) slugA.value = list[0]?.slug || ''
  if (!slugB.value) slugB.value = list[1]?.slug || ''
  if (slugB.value === slugA.value) {
    const other = list.find(x => x.slug !== slugA.value)
    if (other) slugB.value = other.slug
  }

  if (route.query.auto === '1' && canStart.value) nextTick(() => startBattle())
})

useHead({
  title: 'Versus: compara agentes open source y ADEs cara a cara',
  meta: [{ name: 'description', content: 'Duelo animado entre agentes open source o entre ADEs, con dimensiones, desglose completo y tarjeta para compartir. Sin mezclar tipos.' }]
})
</script>
