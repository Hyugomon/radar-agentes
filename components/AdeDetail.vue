<template>
  <article>
    <div class="block" style="margin-top: 18px">
      <div class="callout">
        <b>#{{ ade.rank }}</b> del ranking ADE · <b>{{ ade.catLabel }}</b> · ADE Score
        <b>{{ ade.total.toFixed(1) }}/100</b>. {{ meta.ranking_rule }}
      </div>
    </div>

    <div class="block">
      <h3>Qué es</h3>
      <p class="verdict-summary">{{ ade.summary }}</p>
      <div class="topics" style="margin-top: 10px">
        <span v-for="h in ade.harnesses" :key="h" class="tag">{{ h }}</span>
      </div>
    </div>

    <div class="block">
      <h3>Cómo sale la puntuación</h3>
      <p class="lede">Nota × peso de cada dimensión. La suma es exactamente el ADE Score guardado; nada se estima en el navegador.</p>
      <table class="calc">
        <thead>
          <tr><th>Dimensión</th><th class="num">Nota</th><th class="num">Peso</th><th class="num">Aporte</th><th /></tr>
        </thead>
        <tbody>
          <tr v-for="d in meta.dimensions" :key="d.key">
            <td class="dim-name">{{ d.label }}<small>{{ d.hint }}</small></td>
            <td class="num"><b>{{ ade.scores[d.key] || 0 }}</b></td>
            <td class="num muted">{{ Math.round(d.weight * 100) }}%</td>
            <td class="num"><b>{{ ((ade.scores[d.key] || 0) * d.weight).toFixed(2) }}</b></td>
            <td><div class="micro"><b :style="{ width: (ade.scores[d.key] || 0) + '%', background: dimColor(ade.scores[d.key] || 0) }" /></div></td>
          </tr>
          <tr class="total">
            <td>ADE Score</td><td /><td />
            <td class="num">{{ ade.total.toFixed(2) }}</td>
            <td class="tiny">{{ ade.next_tier ? `faltan ${ade.delta_next?.toFixed(2)} para ${ade.next_tier}` : 'techo SS' }}</td>
          </tr>
        </tbody>
      </table>
      <div class="ladder">
        <div v-for="t in meta.tiers" :key="t.name" class="rung" :class="{ here: t.name === ade.tier }">
          <b>{{ t.name }}</b>≥ {{ t.floor }}
        </div>
      </div>
    </div>

    <div class="block">
      <h3>Qué resuelve</h3>
      <div class="pillars">
        <div v-for="f in ade.features" :key="f.key" class="pillar" :class="f.on ? 'on' : 'off'">
          <span class="pillar__mark">{{ f.on ? '✓' : '✕' }}</span>
          <div>
            <div class="pillar__t">{{ f.label }}</div>
            <div class="pillar__h">{{ f.on ? 'Documentado en la web oficial o el repo.' : 'No documentado o no es el foco del producto.' }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="block">
      <h3>Fortalezas y carencias</h3>
      <div v-if="ade.strengths?.length">
        <div class="lede" style="color: var(--good); font-weight: 800">Fortalezas</div>
        <ul class="verdict-list up">
          <li v-for="(s, i) in ade.strengths" :key="i">{{ s }}</li>
        </ul>
      </div>
      <div v-if="ade.weaknesses?.length" style="margin-top: 12px">
        <div class="lede" style="color: var(--bad); font-weight: 800">Carencias</div>
        <ul class="verdict-list down">
          <li v-for="(s, i) in ade.weaknesses" :key="i">{{ s }}</li>
        </ul>
      </div>
    </div>

    <div class="block">
      <h3>Ficha del ADE</h3>
      <div class="datagrid">
        <div><span>Licencia</span><b>{{ ade.license || (ade.licenseType === 'No verificada' ? 'No verificada' : 'Comercial') }}</b></div>
        <div><span>Precio</span><b>{{ ade.pricing === 'free' ? 'Gratis' : ade.pricing === 'freemium' ? 'Freemium' : ade.pricing === 'paid' ? 'Pago' : 'Ver web' }}</b></div>
        <div><span>Detalle</span><b>{{ ade.priceNote }}</b></div>
        <div><span>Ejecución</span><b>{{ ade.execution }}</b></div>
        <div><span>Plataformas</span><b>{{ ade.platforms.join(' · ') }}</b></div>
        <div><span>Harnesses</span><b>{{ ade.harnesses.join(', ') || 'No verificado' }}</b></div>
      </div>
    </div>

    <div class="block">
      <h3>Fuentes</h3>
      <p class="lede">Web oficial, repositorio y dossier. Es una revisión documental, no una prueba práctica de cada flujo.</p>
      <div class="sources">
        <a v-for="s in ade.sources" :key="s.url" :href="s.url" target="_blank" rel="noopener" class="source">
          <span>{{ s.label }}</span>
          <span class="tiny">{{ host(s.url) }} ↗</span>
        </a>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
const props = defineProps<{ ade: any; meta: any }>()
function dimColor(v: number) { return v >= 80 ? 'var(--good)' : v >= 65 ? 'var(--accent)' : v >= 45 ? 'var(--t-D)' : 'var(--bad)' }
function host(url: string) {
  try { return new URL(url).hostname.replace(/^www\./, '') } catch { return url }
}
</script>
