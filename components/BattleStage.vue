<template>
  <section class="a2" :class="{ 'a2--done': done }">
    <header class="a2-top">
      <span class="a2-round">Ronda {{ Math.max(0, roundIndex + 1) }} / {{ rounds.length }}</span>
      <span class="a2-phase">{{ phaseLabel }}</span>
      <span style="flex: 1" />
      <button v-if="!done" class="btn btn--sm" @click="skip">Saltar ⏭</button>
      <button v-else class="btn btn--sm" @click="$emit('rematch')">Revancha 🎲</button>
      <button class="btn btn--sm" @click="$emit('close')">Cerrar ✕</button>
    </header>

    <div ref="stage" class="a2-stage" :class="{ shake: shaking }">
      <div class="a2-half a2-half--a" />
      <div class="a2-half a2-half--b" />

      <div ref="orbA" class="a2-orb a2-orb--a" :class="{ hit: hitSide === 'a', ko: done && winner === 'b', champion: done && winner === 'a' }">
        <span class="a2-mono">{{ initials(a.full_name) }}</span>
        <span v-if="done && winner === 'a'" class="a2-crown">👑</span>
      </div>

      <div ref="orbB" class="a2-orb a2-orb--b" :class="{ hit: hitSide === 'b', ko: done && winner === 'a', champion: done && winner === 'b' }">
        <span class="a2-mono">{{ initials(b.full_name) }}</span>
        <span v-if="done && winner === 'b'" class="a2-crown">👑</span>
      </div>

      <div ref="impact" class="a2-impact">
        <svg viewBox="0 0 120 120" aria-hidden="true">
          <polygon points="60,2 70,38 104,24 82,54 118,60 82,66 104,96 70,82 60,118 50,82 16,96 38,66 2,60 38,54 16,24 50,38" />
        </svg>
      </div>

      <div ref="slash" class="a2-slash" />
      <div ref="dmg" class="a2-dmg">−0</div>

      <canvas ref="confetti" class="a2-confetti" />
    </div>

    <div class="a2-hud">
      <div class="a2-card a2-card--a" :class="{ champion: done && winner === 'a', hurt: done && winner === 'b' }">
        <div class="a2-name">{{ a.full_name }}</div>
        <div class="a2-score">{{ displayA.toFixed(1) }}<span>pts</span></div>
        <div class="a2-hp"><i :style="{ width: hpA + '%' }" /></div>
        <div class="a2-sub">#{{ a.rank }} · Tier {{ a.tier }} · ADN {{ Math.round(a.agency) }}</div>
      </div>

      <div class="a2-vs"><span>VS</span></div>

      <div class="a2-card a2-card--b" :class="{ champion: done && winner === 'b', hurt: done && winner === 'a' }">
        <div class="a2-name">{{ b.full_name }}</div>
        <div class="a2-score">{{ displayB.toFixed(1) }}<span>pts</span></div>
        <div class="a2-hp"><i :style="{ width: hpB + '%' }" /></div>
        <div class="a2-sub">#{{ b.rank }} · Tier {{ b.tier }} · ADN {{ Math.round(b.agency) }}</div>
      </div>
    </div>

    <div class="a2-result" :class="{ on: done }">
      <b v-if="done">👑 Gana {{ winnerName }} · Tier {{ winnerTier }}</b>
      <span v-if="done">
        por {{ margin.toFixed(1) }} pts · {{ dimsWon }} de {{ rounds.length }} dimensiones ·
        ADN {{ Math.round(a.agency) }} vs {{ Math.round(b.agency) }}
      </span>
    </div>
  </section>
</template>

<script setup lang="ts">
const props = defineProps<{ a: any; b: any; meta: any }>()
const emit = defineEmits<{ close: []; rematch: []; download: [] }>()

const stage = ref<HTMLElement | null>(null)
const orbA = ref<HTMLElement | null>(null)
const orbB = ref<HTMLElement | null>(null)
const impact = ref<HTMLElement | null>(null)
const slash = ref<HTMLElement | null>(null)
const dmg = ref<HTMLElement | null>(null)
const confetti = ref<HTMLCanvasElement | null>(null)

const displayA = ref(0)
const displayB = ref(0)
const hpA = ref(100)
const hpB = ref(100)
const roundIndex = ref(-1)
const done = ref(false)
const shaking = ref(false)
const hitSide = ref<'' | 'a' | 'b'>('')
let animateFn: any = null
let token = 0

const rounds = computed(() => [...props.meta.dimensions]
  .sort((x: any, y: any) => y.weight - x.weight)
  .map((d: any) => ({
    key: d.key,
    label: d.label,
    av: Number(props.a.dimensions?.[d.key] || 0),
    bv: Number(props.b.dimensions?.[d.key] || 0)
  })))

const winner = computed(() => {
  if (Math.abs(props.a.total - props.b.total) > 0.049) return props.a.total > props.b.total ? 'a' : 'b'
  if (props.a.agency !== props.b.agency) return props.a.agency > props.b.agency ? 'a' : 'b'
  const ap = Number(props.a.dimensions?.producto || 0)
  const bp = Number(props.b.dimensions?.producto || 0)
  return ap >= bp ? 'a' : 'b'
})
const winnerName = computed(() => (winner.value === 'a' ? props.a.full_name : props.b.full_name))
const winnerTier = computed(() => (winner.value === 'a' ? props.a.tier : props.b.tier))
const margin = computed(() => Math.abs(props.a.total - props.b.total))
const dimsWon = computed(() => {
  const w = winner.value
  return rounds.value.filter(r => (w === 'a' ? r.av > r.bv : r.bv > r.av)).length
})
const phaseLabel = computed(() => {
  if (done.value) return 'resultado'
  if (roundIndex.value < 0) return 'preparados'
  return rounds.value[roundIndex.value]?.label || ''
})

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms))

function fx(target: any, params: any) {
  if (!animateFn || !target) return
  try {
    animateFn(target, params)
  } catch {
    /* la animación es decorativa: si falla, el estado igual avanza */
  }
}

function initials(name: string) {
  const part = (name.split('/')[1] || name).replace(/[^a-zA-Z0-9]/g, '')
  return part.slice(0, 2).toUpperCase()
}

function punch(side: 'a' | 'b', amount: number) {
  const attacker = side === 'a' ? orbA.value : orbB.value
  const defender = side === 'a' ? orbB.value : orbA.value
  const dir = side === 'a' ? 1 : -1

  fx(attacker, { translateX: dir * 70, scale: 1.08, duration: 170, ease: 'outQuad' })
  setTimeout(() => fx(attacker, { translateX: 0, scale: 1, duration: 320, ease: 'outElastic(1, .5)' }), 190)

  hitSide.value = side === 'a' ? 'b' : 'a'
  setTimeout(() => fx(defender, { translateX: [-14, 0], rotate: [-6, 0], duration: 320, ease: 'outQuad' }), 150)
  setTimeout(() => { hitSide.value = '' }, 420)

  fx(impact.value, { scale: [0, 1.6], opacity: [1, 0], rotate: [Math.random() * 90, Math.random() * 90 + 40], duration: 380, ease: 'outQuad' })
  fx(slash.value, { opacity: [0.9, 0], scaleX: [0.2, 1.5], duration: 340, ease: 'outQuad' })

  if (dmg.value) {
    dmg.value.textContent = `−${Math.max(1, Math.round(amount))}`
    fx(dmg.value, { translateY: [-10, -56], opacity: [1, 0], scale: [1.35, 0.95], duration: 720, ease: 'outQuad' })
  }

  shaking.value = true
  setTimeout(() => { shaking.value = false }, 260)
}

function knockout() {
  const lose = winner.value === 'a' ? orbB.value : orbA.value
  const win = winner.value === 'a' ? orbA.value : orbB.value
  fx(lose, { rotate: winner.value === 'a' ? 16 : -16, translateY: 26, scale: 0.9, duration: 700, ease: 'outQuad' })
  fx(win, { scale: [1, 1.12, 1.06], duration: 900, ease: 'outElastic(1, .6)' })
  fireConfetti()
}

async function run() {
  const my = ++token
  displayA.value = 0
  displayB.value = 0
  hpA.value = 100
  hpB.value = 100
  roundIndex.value = -1
  done.value = false

  await new Promise<void>((resolve) => {
    let ticks = 0
    const timer = setInterval(() => {
      if (my !== token) { clearInterval(timer); return resolve() }
      ticks++
      const e = 1 - Math.pow(1 - Math.min(1, ticks / 32), 3)
      displayA.value = props.a.total * e
      displayB.value = props.b.total * e
      if (ticks >= 32) { clearInterval(timer); resolve() }
    }, 18)
  })
  if (my !== token) return

  fx(stage.value, { scale: [0.985, 1], duration: 420, ease: 'outQuad' })
  await sleep(320)
  if (my !== token) return

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
      const dmg = Math.min(18, 4 + diff * 0.45)
      if (loser === 'a') hpA.value = Math.max(finalLoserHp, hpA.value - dmg)
      else hpB.value = Math.max(finalLoserHp, hpB.value - dmg)
      punch(winner.value as 'a' | 'b', dmg)
    } else {
      fx(stage.value, { scale: [1, 1.006, 1], duration: 220 })
    }
    await sleep(430)
  }
  if (my !== token) return

  roundIndex.value = rounds.value.length - 1
  hpA.value = winner.value === 'a' ? 100 : finalLoserHp
  hpB.value = winner.value === 'b' ? 100 : finalLoserHp
  knockout()
  await sleep(500)
  if (my !== token) return
  done.value = true
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
  knockout()
}

function fireConfetti() {
  const cv = confetti.value
  if (!cv) return
  const rect = cv.getBoundingClientRect()
  const w = rect.width || 600
  const h = rect.height || 300
  const dpr = Math.min(2, window.devicePixelRatio || 1)
  cv.width = Math.round(w * dpr)
  cv.height = Math.round(h * dpr)
  const g = cv.getContext('2d')
  if (!g) return
  g.setTransform(dpr, 0, 0, dpr, 0, 0)
  const colors = ['#ffd166', '#5b9dff', '#a78bfa', '#3ed383', '#ffffff']
  const originX = winner.value === 'a' ? w * 0.25 : w * 0.75
  const parts = Array.from({ length: 130 }, (_, i) => ({
    x: originX + (Math.random() - 0.5) * w * 0.42,
    y: -20 - Math.random() * h * 0.3,
    vx: (Math.random() - 0.5) * 2.4,
    vy: 1.4 + Math.random() * 3.2,
    r: 3 + Math.random() * 4,
    rot: Math.random() * 6.28,
    vr: (Math.random() - 0.5) * 0.35,
    c: colors[i % colors.length]
  }))
  const start = performance.now()
  const frame = (t: number) => {
    const elapsed = t - start
    g.clearRect(0, 0, w, h)
    for (const p of parts) {
      p.vy += 0.3; p.x += p.vx; p.y += p.vy; p.vx *= 0.99; p.rot += p.vr
      const life = Math.max(0, 1 - elapsed / 2200)
      g.save(); g.translate(p.x, p.y); g.rotate(p.rot); g.globalAlpha = life
      g.fillStyle = p.c; g.fillRect(-p.r / 2, -p.r / 2, p.r, p.r * 1.7); g.restore()
    }
    if (elapsed < 2200) requestAnimationFrame(frame)
    else g.clearRect(0, 0, w, h)
  }
  requestAnimationFrame(frame)
}

onMounted(async () => {
  try {
    const mod: any = await import('animejs')
    animateFn = mod.animate
  } catch (err) {
    console.warn('[versus] anime.js no disponible, animación en CSS', err)
  }
  const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  if (reduced) skip()
  else run()
})

onBeforeUnmount(() => { token++ })
</script>
