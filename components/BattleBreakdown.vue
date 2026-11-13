<template>
  <section class="a2-breakdown">
    <div class="a2-breakdown__head">
      <div>
        <span class="eyebrow">DESGLOSE DEL VERSUS</span>
        <h3>Gana {{ winnerName }} · Tier {{ winnerTier }}</h3>
      </div>
      <div class="tiny">
        por {{ margin.toFixed(1) }} pts · {{ dimsWon }} de {{ meta.dimensions.length }} dimensiones
      </div>
    </div>

    <div class="a2-breakdown__grid">
      <div>
        <table class="calc vs-breakdown">
          <thead>
            <tr>
              <th>Dimensión</th>
              <th class="num">{{ shortName(a.full_name) }}</th>
              <th class="num">{{ shortName(b.full_name) }}</th>
              <th>Ataque</th>
              <th>Ventaja</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="d in meta.dimensions" :key="d.key">
              <td class="dim-name">{{ d.label }}</td>
              <td class="num" :class="{ win: value(a, d.key) > value(b, d.key) }">{{ value(a, d.key) }}</td>
              <td class="num" :class="{ win: value(b, d.key) > value(a, d.key) }">{{ value(b, d.key) }}</td>
              <td><span class="tag" :class="`tag--atk-${attackType(d.key)}`">{{ attackLabel(attackType(d.key)) }}</span></td>
              <td>
                <span class="tag" :class="{ 'tag--open': value(a, d.key) > value(b, d.key) }">
                  {{ dimWinner(d.key) }}
                </span>
              </td>
            </tr>
            <tr class="total">
              <td>Total</td>
              <td class="num">{{ a.total.toFixed(1) }}</td>
              <td class="num">{{ b.total.toFixed(1) }}</td>
              <td />
              <td class="tiny">{{ a.tier }} vs {{ b.tier }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="vs-features">
        <div v-for="side in [a, b]" :key="side.slug" class="vs-feature-col">
          <div class="vs-feature-head">
            <b>{{ shortName(side.full_name) }}</b>
            <span class="tiny">{{ side.subLabel }}</span>
          </div>
          <div v-for="f in side.features" :key="f.key || f.label" class="vs-feature" :class="{ on: f.on }">
            <span>{{ f.on ? '✓' : '✕' }}</span>{{ f.label }}
          </div>
          <NuxtLink :to="side.profileUrl" class="tag" style="margin-top: 8px">Ver ficha completa →</NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const props = defineProps<{
  a: any
  b: any
  meta: any
  winner: 'a' | 'b'
  margin: number
  dimsWon: number
  events?: any[]
}>()

const winnerName = computed(() => props.winner === 'a' ? props.a.full_name : props.b.full_name)
const winnerTier = computed(() => props.winner === 'a' ? props.a.tier : props.b.tier)

function shortName(name: string) {
  return String(name).split('/').pop()
}
function value(side: any, key: string) {
  return Number(side.dimensions?.[key] || 0)
}
function dimWinner(key: string) {
  const av = value(props.a, key)
  const bv = value(props.b, key)
  if (av === bv) return 'Empate'
  return av > bv ? shortName(props.a.full_name) : shortName(props.b.full_name)
}
function attackType(key: string) {
  return props.events?.find(e => e.key === key)?.type || 'normal'
}
function attackLabel(type: string) {
  return {
    normal: 'Directo',
    heavy: 'Pesado',
    breaker: 'Rompe defensa',
    special: 'Especial',
    fatal: 'Fatal',
    ace: 'As bajo la manga',
    finisher: 'Remate',
    clash: 'Choque'
  }[type] || type
}
</script>
