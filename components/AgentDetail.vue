<template>
  <article>
    <div class="block" style="margin-top: 18px">
      <div class="callout">
        <b>#{{ agent.rank }}</b> en el ranking · generación
        <b>{{ generationLabel }}</b>. {{ meta.ranking_rule }}
      </div>
    </div>

    <div class="block">
      <h3>Cómo sale la puntuación</h3>
      <p class="lede">Nota × peso de cada dimensión. La suma es exactamente el total guardado; nada se estima en el navegador.</p>
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
            <td>Total</td><td /><td />
            <td class="num">{{ agent.total.toFixed(2) }}</td>
            <td class="tiny">{{ agent.next_tier ? `faltan ${agent.delta_next?.toFixed(2)} para ${agent.next_tier}` : 'techo S' }}</td>
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
      <h3>Agencia · pilares de Grok Bot</h3>
      <template v-if="isAgent">
        <p class="lede">Cada pilar se marca solo si el expediente lo demuestra (ante la duda, falso). Suman {{ meta.agency_max }} y deciden la banda.</p>
        <div class="callout callout--warn" v-if="!agent.has_pillars" style="margin-bottom: 10px">
          Veredicto anterior a la rúbrica de pilares: la agencia quedó en 0 y cae en la banda de sesión.
          Se re-evaluará en el próximo ciclo.
        </div>
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
          {{ agent.pillars_detail.filter(p => p.on).length }} de {{ agent.pillars_detail.length }} pilares ·
          <b>agencia {{ Math.round(agent.agency) }}</b>
          {{ agent.agency >= 70 ? '· banda de bots persistentes (≥70)' : agent.agency >= 45 ? '· banda de agentes autónomos (45-69)' : '· banda de sesión (<45)' }}
        </div>
      </template>
      <div v-else class="callout">No aplica: <b>{{ agent.kind }}</b> no es un agente. Se ordena por puntos en su propia sección.</div>
    </div>

    <div class="block">
      <h3>Veredicto del juez</h3>
      <blockquote>{{ agent.summary }}</blockquote>
      <div v-if="agent.strengths?.length" style="margin-top: 14px">
        <div class="lede" style="color: var(--good); font-weight: 800">Fortalezas</div>
        <ul class="verdict-list up">
          <li v-for="(s, i) in agent.strengths" :key="i">{{ s }}</li>
        </ul>
      </div>
      <div v-if="agent.weaknesses?.length" style="margin-top: 12px">
        <div class="lede" style="color: var(--bad); font-weight: 800">Debilidades</div>
        <ul class="verdict-list down">
          <li v-for="(s, i) in agent.weaknesses" :key="i">{{ s }}</li>
        </ul>
      </div>
      <div v-if="agent.comparison" style="margin-top: 12px">
        <div class="lede" style="font-weight: 800">Comparación</div>
        <blockquote style="border-left-color: var(--ink-3)">{{ agent.comparison }}</blockquote>
      </div>
      <p class="tiny" style="margin-top: 10px">Confianza del veredicto: <b>{{ agent.confidence }}</b>/100 · evaluado {{ agent.judged_day }}.</p>
    </div>

    <div class="block">
      <h3>Datos y versiones</h3>
      <div class="datagrid">
        <div><span>Estrellas</span><b>{{ fmt(agent.stars) }}</b></div>
        <div><span>Forks</span><b>{{ fmt(agent.forks) }}</b></div>
        <div><span>Issues abiertos</span><b>{{ fmt(agent.open_issues) }}</b></div>
        <div><span>Lenguaje</span><b>{{ agent.language || '—' }}</b></div>
        <div><span>Licencia</span><b>{{ agent.license || '—' }}</b></div>
        <div><span>Tipo</span><b>{{ agent.kind }}</b></div>
        <div><span>Creado</span><b>{{ agent.created_day || '—' }}</b></div>
        <div><span>Último push</span><b>{{ (agent.pushed_at || '').slice(0, 10) || '—' }}</b></div>
        <div><span>Releases 90 d</span><b>{{ agent.releases_90 }}</b></div>
        <div><span>Última versión</span><b>{{ (agent.last_release || '').slice(0, 10) || '—' }}</b></div>
      </div>
      <div v-if="agent.releases_recent?.length" style="margin-top: 14px">
        <div class="lede" style="font-weight: 800">Últimas versiones</div>
        <div v-for="r in agent.releases_recent" :key="r.tag" class="kvrow" style="border-bottom: 1px solid var(--line-2); padding: 5px 0">
          <b>{{ r.tag }} <span v-if="r.pre" class="tag">pre</span></b>
          <span class="tiny">{{ r.date }}</span>
        </div>
      </div>
    </div>

    <div class="block">
      <h3>Lo que vio el juez</h3>
      <p class="lede">Extracto del README que entró en el expediente. El juez no consultó internet ni el repositorio completo.</p>
      <div v-if="agent.readme" class="readme">{{ agent.readme }}</div>
      <div v-else class="callout callout--warn">Sin extracto de README guardado.</div>
      <div v-if="agent.topics?.length" class="topics">
        <span v-for="t in agent.topics" :key="t" class="tag">{{ t }}</span>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
const props = defineProps<{ agent: any; meta: any }>()

const dims = computed(() => props.meta.dimensions as any[])
const dimensions = computed(() => dims.value)
const isAgent = computed(() => ['agent', 'bot', 'assistant'].includes(props.agent.kind))

const generationLabel = computed(() => {
  const g = (props.meta.generations || []).find((x: any) => x.key === props.agent.generation)
  return g?.label || props.agent.generation
})

function value(key: string) { return Number(props.agent.dimensions?.[key] || 0) }
function dimColor(v: number) { return v >= 80 ? 'var(--good)' : v >= 65 ? 'var(--accent)' : v >= 45 ? 'var(--t-D)' : 'var(--bad)' }
function fmt(n: number) { return new Intl.NumberFormat('es-PE').format(n || 0) }
</script>
