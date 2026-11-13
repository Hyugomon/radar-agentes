<template>
  <section class="a2" :class="{ 'a2--done': done }">
    <header class="a2-top">
      <span class="a2-round">Ronda {{ Math.max(0, roundIndex + 1) }} / {{ battleEvents.length || meta.dimensions.length }}</span>
      <span class="a2-phase">{{ phaseLabel }}</span>
      <span style="flex: 1" />
      <button v-if="!done" class="btn btn--sm" @click="skip">Saltar ⏭</button>
      <button v-else class="btn btn--sm" @click="$emit('rematch')">Revancha 🎲</button>
      <button class="btn btn--sm" @click="$emit('close')">Cerrar ✕</button>
    </header>

    <div ref="stage" class="a2-stage" :class="[angleClass, { shake: shaking, sparking, speed: speedLines, cinematic }]">
      <div ref="camera" class="a2-camera">
        <div class="a2-grid" />
        <div class="a2-spotlight" />
        <div class="a2-floor" />
        <div class="a2-speedlines" />
        <div class="a2-debris" :class="{ active: sparking }">
          <i v-for="n in 12" :key="n" :style="{ '--a': `${n * 30}deg`, '--d': `${60 + (n % 4) * 18}px` }" />
        </div>
        <div ref="beam" class="a2-beam" :class="beamSide ? `a2-beam--${beamSide}` : ''" :style="{ '--beam-color': beamSide === 'b' ? skinB.color : skinA.color }" />

        <div class="a2-half a2-half--a" />
        <div class="a2-half a2-half--b" />

        <div
          ref="orbA"
          class="a2-orb a2-orb--a"
          :class="orbClass('a')"
          :style="styleA"
        >
          <div class="a2-aura" />
          <div class="a2-face">
            <div class="a2-brows" :class="{ angry: attackingSide === 'a', hurt: hitSide === 'a' }">
              <i /><i />
            </div>
            <div class="a2-eyes" :class="[`eyes--${skinA.eyes}`, { angry: attackingSide === 'a', hurt: hitSide === 'a', ko: done && winner !== 'a' }]">
              <span class="anime-eye"><i class="iris"><b class="pupil" /><em class="glint" /></i></span>
              <span class="anime-eye"><i class="iris"><b class="pupil" /><em class="glint" /></i></span>
            </div>
            <div class="a2-mouth" :class="mouthClass('a')" />
          </div>
          <span class="a2-mono">{{ initials(a.full_name) }}</span>
          <span class="a2-hand a2-hand--l" :class="`hands--${skinA.hands}`">
            <i class="finger f1" /><i class="finger f2" /><i class="finger f3" /><i class="finger thumb" />
          </span>
          <span class="a2-hand a2-hand--r a2-hand--front" :class="`hands--${skinA.hands}`">
            <i class="finger f1" /><i class="finger f2" /><i class="finger f3" /><i class="finger thumb" />
          </span>
          <span class="a2-shield" :class="{ on: shieldA > 0, broken: shieldBreakSide === 'a' }" />
          <span v-if="done && winner === 'a'" class="a2-crown">👑</span>
        </div>

        <div
          ref="orbB"
          class="a2-orb a2-orb--b"
          :class="orbClass('b')"
          :style="styleB"
        >
          <div class="a2-aura" />
          <div class="a2-face">
            <div class="a2-brows" :class="{ angry: attackingSide === 'b', hurt: hitSide === 'b' }">
              <i /><i />
            </div>
            <div class="a2-eyes" :class="[`eyes--${skinB.eyes}`, { angry: attackingSide === 'b', hurt: hitSide === 'b', ko: done && winner !== 'b' }]">
              <span class="anime-eye"><i class="iris"><b class="pupil" /><em class="glint" /></i></span>
              <span class="anime-eye"><i class="iris"><b class="pupil" /><em class="glint" /></i></span>
            </div>
            <div class="a2-mouth" :class="mouthClass('b')" />
          </div>
          <span class="a2-mono">{{ initials(b.full_name) }}</span>
          <span class="a2-hand a2-hand--l a2-hand--front" :class="`hands--${skinB.hands}`">
            <i class="finger f1" /><i class="finger f2" /><i class="finger f3" /><i class="finger thumb" />
          </span>
          <span class="a2-hand a2-hand--r" :class="`hands--${skinB.hands}`">
            <i class="finger f1" /><i class="finger f2" /><i class="finger f3" /><i class="finger thumb" />
          </span>
          <span class="a2-shield" :class="{ on: shieldB > 0, broken: shieldBreakSide === 'b' }" />
          <span v-if="done && winner === 'b'" class="a2-crown">👑</span>
        </div>

        <div ref="impact" class="a2-impact">
          <svg viewBox="0 0 120 120" aria-hidden="true">
            <polygon points="60,2 70,38 104,24 82,54 118,60 82,66 104,96 70,82 60,118 50,82 16,96 38,66 2,60 38,54 16,24 50,38" />
          </svg>
        </div>
        <div ref="shock" class="a2-shock" />

        <div ref="slash" class="a2-slash" />
        <div ref="dmg" class="a2-dmg">−0</div>
      </div>

      <div class="a2-letterbox"><i class="a2-bar-top" /><i class="a2-bar-bottom" /></div>
      <div ref="flash" class="a2-flash" />
      <div v-if="eventText" class="a2-event" :class="`a2-event--${eventTone}`">{{ eventText }}</div>

      <canvas ref="confetti" class="a2-confetti" />
    </div>

    <div class="a2-hud">
      <div class="a2-card a2-card--a" :class="{ champion: done && winner === 'a', hurt: done && winner === 'b' }">
        <div class="a2-name">{{ a.full_name }}</div>
        <div class="a2-score">{{ displayA.toFixed(1) }}<span>pts</span></div>
        <div class="a2-hp"><i :style="{ width: hpA + '%', background: skinA.color }" /></div>
        <div class="a2-shieldbar"><i :style="{ width: shieldA + '%', background: skinA.color }" /></div>
        <div class="a2-hpnum">{{ Math.ceil(hpA) }} HP <span v-if="shieldA > 0">· 🛡 {{ Math.ceil(shieldA) }}</span></div>
        <div class="a2-sub">#{{ a.rank }} · Tier {{ a.tier }} · {{ a.subLabel || `ADN ${Math.round(a.agency)}` }}</div>
      </div>

      <div class="a2-vs"><span>VS</span></div>

      <div class="a2-card a2-card--b" :class="{ champion: done && winner === 'b', hurt: done && winner === 'a' }">
        <div class="a2-name">{{ b.full_name }}</div>
        <div class="a2-score">{{ displayB.toFixed(1) }}<span>pts</span></div>
        <div class="a2-hp"><i :style="{ width: hpB + '%', background: skinB.color }" /></div>
        <div class="a2-shieldbar"><i :style="{ width: shieldB + '%', background: skinB.color }" /></div>
        <div class="a2-hpnum">{{ Math.ceil(hpB) }} HP <span v-if="shieldB > 0">· 🛡 {{ Math.ceil(shieldB) }}</span></div>
        <div class="a2-sub">#{{ b.rank }} · Tier {{ b.tier }} · {{ b.subLabel || `ADN ${Math.round(b.agency)}` }}</div>
      </div>
    </div>

    <BattleBreakdown v-if="done" :a="a" :b="b" :meta="meta" :winner="winner" :margin="margin" :dims-won="dimsWon" :events="battleEvents" />
  </section>
</template>

<script setup lang="ts">
import { useFighter } from '~/composables/useFighter'

const props = defineProps<{ a: any; b: any; meta: any }>()
const emit = defineEmits<{ close: []; rematch: []; download: []; done: [] }>()

const { skinFor, styleFor } = useFighter()
const skinA = computed(() => skinFor(props.a))
const skinB = computed(() => skinFor(props.b))
const styleA = computed(() => styleFor(props.a))
const styleB = computed(() => styleFor(props.b))

const stage = ref<HTMLElement | null>(null)
const camera = ref<HTMLElement | null>(null)
const orbA = ref<HTMLElement | null>(null)
const orbB = ref<HTMLElement | null>(null)
const impact = ref<HTMLElement | null>(null)
const shock = ref<HTMLElement | null>(null)
const slash = ref<HTMLElement | null>(null)
const dmg = ref<HTMLElement | null>(null)
const flash = ref<HTMLElement | null>(null)
const beam = ref<HTMLElement | null>(null)
const confetti = ref<HTMLCanvasElement | null>(null)

const displayA = ref(0)
const displayB = ref(0)
const hpA = ref(100)
const hpB = ref(100)
const shieldA = ref(100)
const shieldB = ref(100)
const roundIndex = ref(-1)
const done = ref(false)
const shaking = ref(false)
const sparking = ref(false)
const speedLines = ref(false)
const hitSide = ref<'' | 'a' | 'b'>('')
const attackingSide = ref<'' | 'a' | 'b'>('')
const defendingSide = ref<'' | 'a' | 'b'>('')
const shieldBreakSide = ref<'' | 'a' | 'b'>('')
const beamSide = ref<'' | 'a' | 'b'>('')
const angleClass = ref('')
const cinematic = ref(false)
const eventText = ref('')
const eventTone = ref('normal')
const currentEvent = ref<any>(null)
const battleEvents = ref<any[]>([])
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
const margin = computed(() => Math.abs(props.a.total - props.b.total))
const dimsWon = computed(() => {
  const w = winner.value
  return rounds.value.filter(r => (w === 'a' ? r.av > r.bv : r.bv > r.av)).length
})
const phaseLabel = computed(() => {
  if (done.value) return 'resultado'
  if (currentEvent.value) return currentEvent.value.label
  return 'preparados'
})

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms))

function fx(target: any, params: any) {
  if (!animateFn || !target) return
  try { animateFn(target, params) } catch { /* decorativo */ }
}

function initials(name: string) {
  const part = (name.split('/')[1] || name).replace(/[^a-zA-Z0-9]/g, '')
  return part.slice(0, 2).toUpperCase()
}

function orbClass(side: 'a' | 'b') {
  return {
    'is-attacking': attackingSide.value === side,
    'is-defending': defendingSide.value === side,
    'is-hit': hitSide.value === side,
    'shield-break': shieldBreakSide.value === side,
    ko: done.value && winner.value !== side,
    champion: done.value && winner.value === side
  }
}

function mouthClass(side: 'a' | 'b') {
  if (done.value && winner.value !== side) return 'mouth--ko'
  if (hitSide.value === side) return 'mouth--scared'
  if (attackingSide.value === side) {
    return ['special', 'fatal', 'ace'].includes(eventTone.value) ? 'mouth--open' : 'mouth--smirk'
  }
  if (done.value && winner.value === side) return 'mouth--grin'
  const skin = side === 'a' ? skinA.value : skinB.value
  return ['fierce', 'strategic', 'stoic'].includes(skin.eyes) ? 'mouth--smirk' : 'mouth--smile'
}

function featuresOf(side: 'a' | 'b') {
  return (side === 'a' ? props.a.features : props.b.features) || []
}

function uniqueFeature(attacker: 'a' | 'b', defender: 'a' | 'b') {
  const has = new Set(featuresOf(defender).filter((f: any) => f.on).map((f: any) => f.key || f.label))
  return featuresOf(attacker).find((f: any) => f.on && !has.has(f.key || f.label)) || null
}

function rawDamage(type: string, diff: number) {
  const value = type === 'fatal' ? 26 + diff * 0.5
    : type === 'special' || type === 'ace' ? 18 + diff * 0.45
    : type === 'breaker' ? 14 + diff * 0.4
    : type === 'heavy' ? 12 + diff * 0.35
    : 6 + diff * 0.25
  return Math.min(42, Math.round(value))
}

function typeLabel(type: string) {
  return {
    normal: 'Golpe directo',
    heavy: 'Golpe pesado',
    breaker: 'Rompe defensa',
    special: 'Ataque especial',
    fatal: 'GOLPE FATAL',
    ace: 'As bajo la manga',
    finisher: 'Remate final',
    clash: 'Choque de fuerzas'
  }[type] || 'Ataque'
}

function buildBattleEvents() {
  const events: any[] = []
  let hA = 100
  let hB = 100
  let sA = 100
  let sB = 100

  for (const r of rounds.value) {
    if (r.av === r.bv) {
      events.push({
        key: r.key, label: r.label, type: 'clash', attacker: null, defender: null,
        damage: 0, blocked: 0, shieldBreak: false,
        hpA: hA, hpB: hB, shieldA: sA, shieldB: sB
      })
      continue
    }

    const attacker: 'a' | 'b' = r.av > r.bv ? 'a' : 'b'
    const defender: 'a' | 'b' = attacker === 'a' ? 'b' : 'a'
    const winScore = Math.max(r.av, r.bv)
    const loseScore = Math.min(r.av, r.bv)
    const diff = winScore - loseScore
    const defenderStrong = loseScore >= 65
    const special = uniqueFeature(attacker, defender)

    let type = 'normal'
    if (winScore >= 80 && loseScore < 50) type = 'fatal'
    else if (special && diff >= 8) type = 'special'
    else if (defenderStrong && diff >= 12) type = 'breaker'
    else if (diff >= 20) type = 'heavy'

    const raw = rawDamage(type, diff)
    let blocked = 0
    if (defenderStrong && type !== 'fatal') {
      blocked = Math.round(raw * (type === 'breaker' ? 0.25 : type === 'special' ? 0.3 : 0.45))
    }
    if (type === 'fatal') blocked = 0
    const damage = Math.max(1, raw - blocked)
    const shieldBreak = type === 'fatal' || !defenderStrong || (defenderStrong && diff >= 12)

    if (shieldBreak) {
      if (defender === 'a') sA = 0
      else sB = 0
    } else {
      if (defender === 'a') sA = Math.max(0, sA - Math.round(blocked * 1.5))
      else sB = Math.max(0, sB - Math.round(blocked * 1.5))
    }
    if (defender === 'a') hA = Math.max(1, hA - damage)
    else hB = Math.max(1, hB - damage)

    events.push({
      key: r.key, label: r.label, type, attacker, defender,
      damage, blocked, shieldBreak, hpA: hA, hpB: hB, shieldA: sA, shieldB: sB
    })
  }

  const overall = winner.value
  const loser: 'a' | 'b' = overall === 'a' ? 'b' : 'a'
  const special = uniqueFeature(overall, loser)
  const remaining = overall === 'a' ? hB : hA
  if (overall === 'a') hB = 0
  else hA = 0
  if (overall === 'a') sB = 0
  else sA = 0

  events.push({
    key: 'finale',
    label: special ? `As bajo la manga: ${special.label}` : 'Remate final',
    type: special ? 'ace' : 'finisher',
    attacker: overall,
    defender: loser,
    damage: Math.max(1, remaining),
    blocked: 0,
    shieldBreak: true,
    hpA: hA,
    hpB: hB,
    shieldA: sA,
    shieldB: sB
  })
  return events
}

async function performEvent(event: any, index: number) {
  roundIndex.value = index
  currentEvent.value = event
  eventTone.value = event.type
  eventText.value = event.type === 'clash'
    ? `${event.label} · choque`
    : `${typeLabel(event.type)} · ${event.label} −${event.damage}`

  const attackerOrb = event.attacker === 'a' ? orbA.value : orbB.value
  const defenderOrb = event.defender === 'a' ? orbA.value : orbB.value
  const dir = event.attacker === 'a' ? 1 : -1

  if (event.type === 'clash') {
    fx(orbA.value, { translateX: 58, scale: 1.06, duration: 220, ease: 'outQuad' })
    fx(orbB.value, { translateX: -58, scale: 1.06, duration: 220, ease: 'outQuad' })
    setTimeout(() => {
      fx(orbA.value, { translateX: 0, duration: 350, ease: 'outElastic(1, .5)' })
      fx(orbB.value, { translateX: 0, duration: 350, ease: 'outElastic(1, .5)' })
    }, 240)
    fx(impact.value, { scale: [0, 1.5], opacity: [1, 0], duration: 380, ease: 'outQuad' })
    fx(shock.value, { scale: [0.2, 1.9], opacity: [0.85, 0], duration: 480, ease: 'outQuad' })
    shaking.value = true
    setTimeout(() => { shaking.value = false }, 260)
    await sleep(620)
    return
  }

  attackingSide.value = event.attacker
  defendingSide.value = event.defender
  angleClass.value = event.attacker === 'a' ? 'angle-a' : 'angle-b'
  beamSide.value = event.type === 'special' || event.type === 'ace' ? event.attacker : ''
  sparking.value = true
  speedLines.value = event.type === 'special' || event.type === 'ace' || event.type === 'fatal'

  const isCinematic = ['special', 'ace', 'fatal', 'breaker'].includes(event.type)
  if (isCinematic) {
    cinematic.value = true
    fx(camera.value, {
      scale: event.type === 'fatal' || event.type === 'ace' ? 1.22 : 1.14,
      translateX: event.attacker === 'a' ? -46 : 46,
      rotate: event.attacker === 'a' ? -2 : 2,
      duration: 420,
      ease: 'outQuad'
    })
  } else {
    fx(camera.value, {
      scale: 1.035,
      translateX: event.attacker === 'a' ? -10 : 10,
      duration: 220,
      ease: 'outQuad'
    })
  }

  if (event.type === 'fatal' || event.type === 'ace') {
    fx(flash.value, { opacity: [0.75, 0], duration: 450, ease: 'outQuad' })
  }
  if (event.type === 'special' || event.type === 'ace') {
    fx(beam.value, { opacity: [1, 0], scaleX: [0.15, 1], duration: 480, ease: 'outQuad' })
  }

  fx(attackerOrb, { translateX: dir * 86, scale: 1.12, rotate: dir * 9, duration: 210, ease: 'outQuad' })
  setTimeout(() => {
    fx(attackerOrb, { translateX: 0, scale: 1, rotate: 0, duration: 420, ease: 'outElastic(1, .5)' })
  }, 250)

  if (event.blocked > 0) {
    fx(defenderOrb, { translateX: dir * -9, duration: 170, ease: 'outQuad' })
    setTimeout(() => fx(defenderOrb, { translateX: 0, duration: 300, ease: 'outQuad' }), 190)
  }

  if (event.shieldBreak) {
    shieldBreakSide.value = event.defender
    setTimeout(() => { shieldBreakSide.value = '' }, 700)
  }

  hitSide.value = event.defender
  setTimeout(() => { hitSide.value = '' }, 430)

  fx(impact.value, { scale: [0, 1.6], opacity: [1, 0], rotate: [Math.random() * 90, Math.random() * 90 + 40], duration: 380, ease: 'outQuad' })
  fx(shock.value, { scale: [0.2, 2.1], opacity: [0.85, 0], duration: 500, ease: 'outQuad' })
  fx(slash.value, { opacity: [0.9, 0], scaleX: [0.2, 1.5], duration: 340, ease: 'outQuad' })

  if (dmg.value) {
    dmg.value.textContent = `−${Math.max(1, Math.round(event.damage))}`
    dmg.value.className = `a2-dmg a2-dmg--${event.defender}`
    fx(dmg.value, { translateY: [-10, -60], opacity: [1, 0], scale: [1.35, 0.95], duration: 780, ease: 'outQuad' })
  }

  if (event.type === 'fatal' || event.type === 'ace' || event.type === 'breaker') {
    shaking.value = true
    setTimeout(() => { shaking.value = false }, 360)
  }

  setTimeout(() => {
    hpA.value = event.hpA
    hpB.value = event.hpB
    shieldA.value = event.shieldA
    shieldB.value = event.shieldB
  }, 260)

  await sleep(820)

  attackingSide.value = ''
  defendingSide.value = ''
  angleClass.value = ''
  beamSide.value = ''
  sparking.value = false
  speedLines.value = false
  cinematic.value = false
  fx(camera.value, { scale: 1, translateX: 0, rotate: 0, duration: 420, ease: 'outQuad' })
}

function knockout() {
  const lose = winner.value === 'a' ? orbB.value : orbA.value
  const win = winner.value === 'a' ? orbA.value : orbB.value
  fx(lose, { rotate: winner.value === 'a' ? 16 : -16, translateY: 26, scale: 0.9, duration: 700, ease: 'outQuad' })
  fx(win, { scale: [1, 1.14, 1.06], duration: 900, ease: 'outElastic(1, .6)' })
  fireConfetti()
}

async function run() {
  const my = ++token
  displayA.value = 0
  displayB.value = 0
  hpA.value = 100
  hpB.value = 100
  shieldA.value = 100
  shieldB.value = 100
  roundIndex.value = -1
  done.value = false
  cinematic.value = false
  currentEvent.value = null
  eventText.value = ''
  fx(camera.value, { scale: 1, translateX: 0, rotate: 0, duration: 0 })
  battleEvents.value = buildBattleEvents()

  fx(orbA.value, { translateX: [-130, 0], opacity: [0, 1], duration: 520, ease: 'outQuad' })
  fx(orbB.value, { translateX: [130, 0], opacity: [0, 1], duration: 520, ease: 'outQuad' })
  await sleep(260)

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

  fx(camera.value, { scale: [0.985, 1], duration: 420, ease: 'outQuad' })
  await sleep(300)
  if (my !== token) return

  for (let i = 0; i < battleEvents.value.length; i++) {
    if (my !== token) return
    await performEvent(battleEvents.value[i], i)
  }
  if (my !== token) return

  done.value = true
  eventText.value = `🏆 ${winner.value === 'a' ? props.a.full_name : props.b.full_name} gana`
  eventTone.value = 'ace'
  knockout()
  emit('done')
  await sleep(400)
}

function skip() {
  token++
  battleEvents.value = buildBattleEvents()
  const last = battleEvents.value[battleEvents.value.length - 1]
  roundIndex.value = battleEvents.value.length - 1
  currentEvent.value = last
  displayA.value = props.a.total
  displayB.value = props.b.total
  hpA.value = last.hpA
  hpB.value = last.hpB
  shieldA.value = last.shieldA
  shieldB.value = last.shieldB
  eventTone.value = last.type
  eventText.value = last.type === 'clash' ? last.label : `${typeLabel(last.type)} · ${last.label}`
  done.value = true
  cinematic.value = false
  fx(camera.value, { scale: 1, translateX: 0, rotate: 0, duration: 0 })
  knockout()
  emit('done')
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
  const colors = [skinA.value.color, skinB.value.color, '#ffd166', '#ffffff']
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
