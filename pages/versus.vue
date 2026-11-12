<template>
  <div class="container vs-hero">
    <span class="eyebrow">⚔️ Modo versus</span>
    <h1 style="font-size: clamp(32px, 4vw, 46px); margin: 16px 0 10px">Ponlos cara a cara</h1>
    <p class="muted" style="font-size: 16px; max-width: 720px">
      Elige dos repos open source y deja que se peleen dimensión por dimensión. Gana el que más Grok Score
      tiene; si empatan, decide el ADN y luego la dimensión de producto. Todo con los números reales del veredicto.
    </p>

    <div class="panel" style="padding: 22px; margin-top: 22px">
      <div class="picker-grid">
        <AgentPicker v-model="slugA" :agents="agents" label="Retador A" />
        <div class="vs-middle"><div class="vs-badge">VS</div></div>
        <AgentPicker v-model="slugB" :agents="agents" label="Retador B" />
      </div>

      <div class="vs-start">
        <button class="btn btn--primary" :disabled="!canStart" @click="startBattle">
          ▶ Iniciar versus
        </button>
        <button class="btn" @click="randomize">🎲 Aleatorio</button>
        <button v-if="a && b" class="btn" @click="downloadCard">📸 Tarjeta</button>
      </div>
      <p v-if="!canStart" class="tiny" style="text-align: center">Elige dos agentes distintos para comenzar.</p>
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
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const { data } = await useFetch('/api/agents')
const radar = data.value as any
const agents = radar.groups.ready as any[]
const meta = radar.meta
const route = useRoute()
const router = useRouter()
const { download } = usePoster()

const slugA = ref('')
const slugB = ref('')
const battleOpen = ref(false)
const battleKey = ref(0)
const arenaSlot = ref<HTMLElement | null>(null)

const a = computed(() => agents.find(x => x.slug === slugA.value))
const b = computed(() => agents.find(x => x.slug === slugB.value))
const canStart = computed(() => !!a.value && !!b.value && slugA.value !== slugB.value)

const stamp = computed(() => String(radar.generated_at || '').slice(0, 10))

function pickRandom(pool: any[]) {
  return pool[Math.floor(Math.random() * pool.length)]
}

function randomize() {
  const first = pickRandom(agents)
  const same = agents.filter(x => x.slug !== first.slug && x.generation === first.generation)
  const others = agents.filter(x => x.slug !== first.slug)
  const second = pickRandom(same.length && Math.random() < 0.65 ? same : others)
  slugA.value = first.slug
  slugB.value = second.slug
}

function startBattle() {
  if (!canStart.value) return
  battleKey.value++
  battleOpen.value = true
  router.replace({ query: { a: slugA.value, b: slugB.value } })
  nextTick(() => arenaSlot.value?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
}

function rematch() {
  battleKey.value++
  randomize()
  nextTick(() => { battleKey.value++; battleOpen.value = true })
}

function downloadCard() {
  if (!a.value || !b.value) return
  download(a.value, b.value, meta.dimensions, stamp.value)
}

function initials(name: string) {
  const part = (name.split('/')[1] || name).replace(/[^a-zA-Z0-9]/g, '')
  return part.slice(0, 2).toUpperCase()
}
function avatarBg(name: string) {
  let h = 0
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) % 360
  return `linear-gradient(135deg, hsl(${h} 68% 50%), hsl(${(h + 40) % 360} 68% 42%))`
}

onMounted(() => {
  const module_ = route.query.a as string | undefined
  const queryB = route.query.b as string | undefined
  const retador = route.query.retador as string | undefined

  if (module_ && agents.some(x => x.slug === module_)) slugA.value = module_
  if (queryB && agents.some(x => x.slug === queryB)) slugB.value = queryB

  if (retador && agents.some(x => x.slug === retador)) {
    slugA.value = retador
    if (!slugB.value) {
      const same = agents.filter(x => x.slug !== retador && x.generation === (agents.find(y => y.slug === retador)?.generation))
      const pool = same.length ? same : agents.filter(x => x.slug !== retador)
      slugB.value = pickRandom(pool).slug
    }
  }

  if (!slugA.value) slugA.value = agents[0]?.slug || ''
  if (!slugB.value) slugB.value = agents[1]?.slug || ''
  if (slugB.value === slugA.value) {
    const other = agents.find(x => x.slug !== slugA.value)
    if (other) slugB.value = other.slug
  }

  if (route.query.auto === '1' && canStart.value) nextTick(() => startBattle())
})

useHead({
  title: 'Versus: compara dos agentes open source cara a cara',
  meta: [{ name: 'description', content: 'Duelo animado entre dos repos open source: 8 dimensiones, ADN Grok Bot y tarjeta para compartir. Con los números reales del radar.' }]
})
</script>
