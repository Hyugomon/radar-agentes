<template>
  <article>
    <div class="block" style="margin-top: 18px">
      <div class="callout">
        <b>#{{ agent.rank }}</b> del ranking · <b>{{ agent.catLabel }}</b> · Grok Score
        <b>{{ agent.total.toFixed(1) }}/100</b>. {{ meta.ranking_rule }}
      </div>
    </div>

    <div class="block">
      <h3>Qué es</h3>
      <p class="verdict-summary">{{ agent.summary }}</p>
      <p v-if="agent.comparison" class="lede" style="margin-top: 10px">
        <b>Frente a Grok Bot:</b> {{ agent.comparison }}
      </p>
    </div>

    <div class="block">
      <h3>Cómo sale la puntuación</h3>
      <p class="lede">Nota × peso de cada dimensión. La suma es exactamente el Grok Score guardado; nada se estima en el navegador.</p>
      <table class="calc">
        <thead>
          <tr><th>Dimensión</th><th class="num">Nota</th><th class="num">Peso</th><th class="num">Aporte</th><th /></tr>
        </thead>
        <tbody>
          <tr v-for="d in dimensions" :key="d.key">
            <td class="dim-name">{{ d.label }}<small>{{ d.hint }}</small></td>
            <td class="num"><b>{{ value(d.key) }}</b></td>
            <td class="num muted">{{ Math.round(d.weight * 100) }}%</td>
            <td class="num"><b>{{ (value(d.key) * d.weight).toFixed(2) }}</b></td>
            <td><div class="micro"><b :style="{ width: value(d.key) + '%', background: dimColor(value(d.key)) }" /></div></td>
          </tr>
          <tr class="total">
            <td>Grok Score</td><td /><td />
            <td class="num">{{ agent.total.toFixed(2) }}</td>
            <td class="tiny">{{ agent.next_tier ? `faltan ${agent.delta_next?.toFixed(2)} para ${agent.next_tier}` : 'el listón' }}</td>
          </tr>
        </tbody>
      </table>
      <div class="ladder">
        <div v-for="t in meta.tiers" :key="t.name" class="rung" :class="{ here: t.name === agent.tier }">
          <b>{{ t.name }}</b>≥ {{ t.floor }}
        </div>
      </div>
    </div>

    <div class="block">
      <h3>ADN Grok Bot · {{ Math.round(agent.agency) }}/{{ agent.agency_max }}</h3>
      <p class="lede">Cada pieza se marca solo si la documentación oficial la demuestra (ante la duda, falso). No es lo mismo un chat con herramientas que un bot que trabaja por ti.</p>
      <div class="pillars">
        <div v-for="p in agent.pillars_detail" :key="p.key" class="pillar" :class="p.on ? 'on' : 'off'">
          <span class="pillar__mark">{{ p.on ? '✓' : '✕' }}</span>
          <div>
            <div class="pillar__t">{{ p.label }}</div>
            <div class="pillar__h">{{ p.hint }}</div>
          </div>
          <span class="pillar__w">{{ p.weight }}</span>
        </div>
      </div>
      <div class="callout" style="margin-top: 10px">
        {{ agent.pillars_detail.filter(p => p.on).length }} de {{ agent.pillars_detail.length }} piezas ·
        <b>ADN {{ Math.round(agent.agency) }}</b>
        {{ agent.agency >= 85 ? '· bot completo, al nivel del listón' : agent.agency >= 65 ? '· bot persistente con piezas claras' : '· más asistente que bot autónomo' }}
      </div>
    </div>

    <div class="block">
      <h3>Lo que le falta para Grok Bot</h3>
      <div v-if="agent.strengths?.length">
        <div class="lede" style="color: var(--good); font-weight: 800">Fortalezas</div>
        <ul class="verdict-list up">
          <li v-for="(s, i) in agent.strengths" :key="i">{{ s }}</li>
        </ul>
      </div>
      <div v-if="agent.weaknesses?.length" style="margin-top: 12px">
        <div class="lede" style="color: var(--bad); font-weight: 800">Carencias</div>
        <ul class="verdict-list down">
          <li v-for="(s, i) in agent.weaknesses" :key="i">{{ s }}</li>
        </ul>
      </div>
      <p class="tiny" style="margin-top: 10px">Confianza del veredicto: <b>{{ agent.confidence }}</b>/100 · revisado {{ agent.judged_day }}.</p>
    </div>

    <div class="block">
      <h3>Ficha del producto</h3>
      <div class="datagrid">
        <div><span>Maker</span><b>{{ agent.maker }}</b></div>
        <div><span>Precio</span><b>{{ agent.priceLabel }}</b></div>
        <div><span>Detalle</span><b>{{ agent.priceNote }}</b></div>
        <div><span>Setup</span><b>{{ agent.setupLabel }}</b></div>
        <div><span>Licencia</span><b>{{ agent.license || 'Propietaria' }}</b></div>
        <div><span>Madurez</span><b>{{ agent.maturityLabel }}</b></div>
        <div><span>Modelos</span><b>{{ agent.models }}</b></div>
        <div><span>Canales</span><b>{{ agent.channels.join(' · ') || '—' }}</b></div>
        <div><span>Plataformas</span><b>{{ agent.platforms.join(' · ') || '—' }}</b></div>
      </div>
    </div>

    <div class="block">
      <h3>Fuentes</h3>
      <p class="lede">Documentación oficial consultada para la ficha. Es una revisión editorial, no una prueba práctica de cada tarea.</p>
      <div class="sources">
        <a v-for="s in agent.sources" :key="s.url" :href="s.url" target="_blank" rel="noopener" class="source">
          <span>{{ s.label }}</span>
          <span class="tiny">{{ host(s.url) }} ↗</span>
        </a>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
const props = defineProps<{ agent: any; meta: any }>()

const dims = computed(() => props.meta.dimensions as any[])
const dimensions = computed(() => dims.value)

function value(key: string) { return Number(props.agent.dimensions?.[key] || 0) }
function dimColor(v: number) { return v >= 80 ? 'var(--good)' : v >= 65 ? 'var(--accent)' : v >= 45 ? 'var(--t-D)' : 'var(--bad)' }
function host(url: string) {
  try { return new URL(url).hostname.replace(/^www\./, '') } catch { return url }
}
</script>
