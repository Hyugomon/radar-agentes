<template>
  <div class="battle">
    <div class="battle__top">
      <button class="btn btn--sm" @click="$emit('close')">← Salir</button>
      <span style="font-weight: 800; letter-spacing: .08em; text-transform: uppercase; font-size: 12px; color: #9fb0cc">
        Versus · {{ Math.max(0, roundIndex + 1) }}/{{ rounds.length }}
      </span>
      <span style="margin-left: 18px; font-size: 13px; color: #c7d3e6; font-weight: 700">
        {{ a.full_name }} <span style="color: #7f8ea8">vs</span> {{ b.full_name }}
      </span>
      <span style="margin-left: auto" />
      <button v-if="!done" class="btn btn--sm" @click="skip">Saltar ⏭</button>
      <template v-else>
        <button class="btn btn--sm" @click="$emit('rematch')">Revancha 🎲</button>
        <button class="btn btn--sm" @click="$emit('download')">📸 Tarjeta</button>
      </template>
    </div>

    <div ref="stage" class="battle__stage" :class="{ shake: shaking }">
      <div class="fighter fighter--left" :class="{ hurt: done && winner === 'b', champion: done && winner === 'a' }">
        <div v-if="done && winner === 'a'" class="crown">👑</div>
        <div class="fighter__name">{{ a.full_name }}</div>
        <div class="fighter__sub">#{{ a.rank }} · {{ a.archetype_label }} · {{ a.confidence }}% conf.</div>
        <div class="fighter__score">{{ displayA.toFixed(1) }}</div>
        <div class="hp">
          <div class="hp__label"><span>HP</span><span>{{ Math.round(hpA) }}</span></div>
          <div class="hp__bar"><div class="hp__fill" :style="{ width: hpA + '%' }" /></div>
        </div>
      </div>

      <div class="clash">
        <div class="clash__ball" :class="{ shake: shaking }">VS</div>
        <div class="round__name" style="margin-top: 12px">{{ currentLabel }}</div>
        <div style="display: flex; gap: 5px; margin-top: 10px">
          <i
            v-for="(r, i) in rounds"
            :key="r.key"
            style="width: 7px; height: 7px; border-radius: 50%; display: block; background: rgba(255,255,255,.2)"
            :style="{ background: i <= roundIndex ? '#ffd166' : 'rgba(255,255,255,.2)' }"
          />
        </div>
      </div>

      <div class="fighter fighter--right" :class="{ hurt: done && winner === 'a', champion: done && winner === 'b' }">
        <div v-if="done && winner === 'b'" class="crown" style="left: auto; right: 22px">👑</div>
        <div class="fighter__name">{{ b.full_name }}</div>
        <div class="fighter__sub">#{{ b.rank }} · {{ b.archetype_label }} · {{ b.confidence }}% conf.</div>
        <div class="fighter__score">{{ displayB.toFixed(1) }}</div>
        <div class="hp">
          <div class="hp__label"><span>HP</span><span>{{ Math.round(hpB) }}</span></div>
          <div class="hp__bar"><div class="hp__fill" :style="{ width: hpB + '%' }" /></div>
        </div>
      </div>

      <canvas ref="confetti" class="confetti-half" :class="winner === 'a' ? 'left' : 'right'" />

      <div class="battle__result" :class="{ on: done }">
        <b v-if="done">👑 Gana {{ winnerName }} · Tier {{ winnerTier }}</b>
        <span v-if="done">
          por {{ margin.toFixed(1) }} pts · {{ dimsWon }} de {{ rounds.length }} dimensiones ·
          agencia {{ Math.round(a.agency) }} vs {{ Math.round(b.agency) }}
        </span>
      </div>
    </div>

    <div class="flash" :class="{ on: flashing }" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ a: any; b: any; meta: any }>()
defineEmits<{ close: []; rematch: []; download: [] }>()

const stage = ref<HTMLElement | null>(null)
const confetti = ref<HTMLCanvasElement | null>(null)
const displayA = ref(0)
const displayB = ref(0)
const hpA = ref(100)
const hpB = ref(100)
const roundIndex = ref(-1)
const done = ref(false)
const shaking = ref(false)
const flashing = ref(false)
let token = 0

const rounds = computed(() => [...props.meta.dimensions]
  .sort((x: any, y: any) => y.weight - x.weight)
  .map((d: any) => ({
    key: d.key,
    label: d.label,
    av: Number(props.a.dimensions?.[d.key] || 0),
    bv: Number(props.b.dimensions?.[d.key] || 0),
    weight: d.weight
  })))

const winner = computed(() => {
  if (Math.abs(props.a.total - props.b.total) > 0.049) return props.a.total > props.b.total ? 'a' : 'b'
  if (props.a.agency !== props.b.agency) return props.a.agency > props.b.agency ? 'a' : 'b'
  return props.a.stars > props.b.stars ? 'a' : 'b'
})
const winnerName = computed(() => (winner.value === 'a' ? props.a.full_name : props.b.full_name))
const winnerTier = computed(() => (winner.value === 'a' ? props.a.tier : props.b.tier))
const margin = computed(() => Math.abs(props.a.total - props.b.total))
const dimsWon = computed(() => {
  const w = winner.value
  return rounds.value.filter(r => (w === 'a' ? r.av > r.bv : r.bv > r.av)).length
})
const currentLabel = computed(() => {
  if (done.value) return 'resultado'
  if (roundIndex.value < 0) return 'preparados…'
  return rounds.value[roundIndex.value]?.label || '…'
})

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms))

async function run() {
  const my = ++token
  displayA.value = 0
  displayB.value = 0
  hpA.value = 100
  hpB.value = 100
  roundIndex.value = -1
  done.value = false

  // contadores de puntos (por ticks: no depende del reloj del navegador)
  await new Promise<void>((resolve) => {
    let ticks = 0
    const total = 38
    const timer = setInterval(() => {
      if (my !== token) { clearInterval(timer); return resolve() }
      ticks++
      const e = 1 - Math.pow(1 - Math.min(1, ticks / total), 3)
      displayA.value = props.a.total * e
      displayB.value = props.b.total * e
      if (ticks >= total) { clearInterval(timer); resolve() }
    }, 18)
  })

  await sleep(220)
  flashing.value = true
  await sleep(180)
  flashing.value = false
  if (my !== token) return

  // turnos
  const gap = Math.abs(props.a.total - props.b.total)
  const finalLoserHp = Math.max(16, Math.min(96, 100 - gap * 2.6))
  const loser = winner.value === 'a' ? 'b' : 'a'

  for (let i = 0; i < rounds.value.length; i++) {
    if (my !== token) return
    roundIndex.value = i
    const r = rounds.value[i]
    const loserVal = loser === 'a' ? r.av : r.bv
    const winnerVal = loser === 'a' ? r.bv : r.av
    const diff = Math.max(0, winnerVal - loserVal)

    if (diff > 0) {
      shaking.value = true
      const dmg = Math.min(18, 4 + diff * 0.45)
      if (loser === 'a') hpA.value = Math.max(finalLoserHp, hpA.value - dmg)
      else hpB.value = Math.max(finalLoserHp, hpB.value - dmg)
      setTimeout(() => { shaking.value = false }, 420)
    }
    await sleep(430)
  }

  if (my !== token) return
  roundIndex.value = rounds.value.length - 1
  if (loser === 'a') { hpA.value = finalLoserHp } else { hpB.value = finalLoserHp }
  hpA.value = winner.value === 'a' ? 100 : finalLoserHp
  hpB.value = winner.value === 'b' ? 100 : finalLoserHp
  await sleep(320)
  if (my !== token) return

  done.value = true
  await nextTick()
  fireConfetti()
}

function skip() {
  token++
  roundIndex.value = rounds.value.length - 1
  displayA.value = props.a.total
  displayB.value = props.b.total
  const gap = Math.abs(props.a.total - props.b.total)
  const finalLoserHp = Math.max(16, Math.min(96, 100 - gap * 2.6))
  hpA.value = winner.value === 'a' ? 100 : finalLoserHp
  hpB.value = winner.value === 'b' ? 100 : finalLoserHp
  done.value = true
  nextTick(() => fireConfetti())
}

function fireConfetti() {
  const cv = confetti.value
  if (!cv) return
  const rect = cv.getBoundingClientRect()
  const w = rect.width || window.innerWidth / 2
  const h = rect.height || window.innerHeight
  const dpr = Math.min(2, window.devicePixelRatio || 1)
  cv.width = Math.round(w * dpr)
  cv.height = Math.round(h * dpr)
  const g = cv.getContext('2d')
  if (!g) return
  g.setTransform(dpr, 0, 0, dpr, 0, 0)
  const colors = ['#ffd166', '#5b9dff', '#a78bfa', '#3ed383', '#ffffff']
  const parts = Array.from({ length: 130 }, (_, i) => ({
    x: Math.random() * w,
    y: -20 - Math.random() * h * 0.25,
    vx: (Math.random() - 0.5) * 2.2,
    vy: 1.6 + Math.random() * 3.2,
    r: 3 + Math.random() * 4,
    rot: Math.random() * 6.28,
    vr: (Math.random() - 0.5) * 0.3,
    c: colors[i % colors.length]
  }))
  const start = performance.now()
  const frame = (t: number) => {
    const elapsed = t - start
    g.clearRect(0, 0, w, h)
    for (const p of parts) {
      p.vy += 0.28; p.x += p.vx; p.y += p.vy; p.vx *= 0.995; p.rot += p.vr
      const life = Math.max(0, 1 - elapsed / 2400)
      g.save(); g.translate(p.x, p.y); g.rotate(p.rot); g.globalAlpha = life
      g.fillStyle = p.c; g.fillRect(-p.r / 2, -p.r / 2, p.r, p.r * 1.7); g.restore()
    }
    if (elapsed < 2400) requestAnimationFrame(frame)
    else g.clearRect(0, 0, w, h)
  }
  requestAnimationFrame(frame)
}

onMounted(() => {
  const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  if (reduced) skip()
  else run()
})
onBeforeUnmount(() => { token++ })
</script>
