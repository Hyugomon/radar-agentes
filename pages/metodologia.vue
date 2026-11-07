<template>
  <div class="container" style="padding-top: 40px">
    <h1 style="font-size: 38px; max-width: 900px">Cómo se califica cada repositorio</h1>
    <p class="muted" style="font-size: 16px; max-width: 820px; margin-top: 12px">
      No hay una fórmula que ordene repositorios entre sí: hay <b>un juez que evalúa uno por uno</b> y deja
      un veredicto con notas. El panel no recalcula nada: muestra ese veredicto y su aritmética.
    </p>

    <div class="grid-2" style="margin-top: 26px">
      <div class="panel" style="padding: 22px 24px">
        <h2 style="font-size: 16px; margin-bottom: 12px">El circuito</h2>
        <ol style="margin: 0; padding-left: 18px; color: var(--ink-2); font-size: 13.5px; line-height: 1.7">
          <li><b style="color: var(--ink)">Expediente.</b> Metadatos de GitHub: descripción, topics, estrellas, lenguaje, licencia, fechas, extracto del README (2.400 caracteres) y últimas releases.</li>
          <li><b style="color: var(--ink)">Juez.</b> Un subagente lee ese expediente, clasifica qué es y puntúa 7 dimensiones + 8 pilares.</li>
          <li><b style="color: var(--ink)">Cálculo.</b> Se validan rangos y se obtienen <b>puntos</b> (dimensiones ponderadas), <b>tier</b> y <b>agencia</b> (suma de pilares).</li>
          <li><b style="color: var(--ink)">Publicación.</b> Orden por generación, luego puntos, luego estrellas.</li>
        </ol>

        <h2 style="font-size: 16px; margin: 22px 0 10px">Escalera de tiers</h2>
        <div class="ladder">
          <div v-for="t in meta.tiers" :key="t.name" class="rung"><b>{{ t.name }}</b>≥ {{ t.floor }}</div>
        </div>

        <h2 style="font-size: 16px; margin: 22px 0 10px">Reglas del juez</h2>
        <ul style="margin: 0; padding-left: 18px; color: var(--ink-2); font-size: 13.5px; line-height: 1.7">
          <li>Si para usarlo hay que programar, no es un agente.</li>
          <li>Las estrellas no puntúan: son contexto de adopción.</li>
          <li>Un CLI o un chat no llega a 90 solo por existir.</li>
          <li>Proyecto con menos de 30 días: madurez ≤ 45 salvo tests, docs y releases.</li>
          <li>Evalúa lo que el repositorio es hoy, no lo que fue.</li>
        </ul>

        <h2 style="font-size: 16px; margin: 22px 0 10px">Límites, dicho claro</h2>
        <ul style="margin: 0; padding-left: 18px; color: var(--ink-2); font-size: 13.5px; line-height: 1.7">
          <li v-for="(l, i) in meta.limits" :key="i">{{ l }}</li>
        </ul>
      </div>

      <div class="panel" style="padding: 22px 24px">
        <h2 style="font-size: 16px; margin-bottom: 10px">Dimensiones y pesos</h2>
        <p class="lede">Capacidad y autonomía pesan 46 % juntas: lo que demuestra que el producto trabaja por ti. Madurez y ecosistema pesan poco a propósito.</p>
        <table class="calc">
          <tbody>
            <tr v-for="d in meta.dimensions" :key="d.key">
              <td class="dim-name">{{ d.label }}<small>{{ d.hint }}</small></td>
              <td class="num"><b>{{ Math.round(d.weight * 100) }}%</b></td>
            </tr>
          </tbody>
        </table>

        <h2 style="font-size: 16px; margin: 22px 0 10px">Pilares de Grok Bot</h2>
        <p class="lede">Suman {{ meta.agency_max }}. Se marcan solo con evidencia; ante la duda, falso.</p>
        <table class="calc">
          <tbody>
            <tr v-for="p in meta.pillars" :key="p.key">
              <td class="dim-name">{{ p.label }}<small>{{ p.hint }}</small></td>
              <td class="num"><b>{{ p.weight }}</b></td>
            </tr>
          </tbody>
        </table>

        <h2 style="font-size: 16px; margin: 22px 0 10px">Calibración 2026</h2>
        <div v-for="c in meta.calibration" :key="c.band" style="display: flex; gap: 12px; padding: 7px 0; border-bottom: 1px solid var(--line-2); font-size: 13px">
          <b style="color: var(--accent); min-width: 64px">{{ c.band }}</b>
          <span><b>{{ c.verdict }}</b> — {{ c.text }}</span>
        </div>

        <h2 style="font-size: 16px; margin: 22px 0 10px">Cobertura</h2>
        <div class="kvrow" style="padding: 6px 0; border-bottom: 1px solid var(--line-2)"><span>Repositorios activos</span><b>{{ fmt(counts.total_repos) }}</b></div>
        <div class="kvrow" style="padding: 6px 0; border-bottom: 1px solid var(--line-2)"><span>Con veredicto</span><b>{{ fmt(counts.total_analyzed) }}</b></div>
        <div class="kvrow" style="padding: 6px 0; border-bottom: 1px solid var(--line-2)"><span>Pendientes</span><b>{{ fmt(counts.pending) }}</b></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { data } = await useFetch('/api/agents')
const radar = data.value as any
const meta = radar.meta
const counts = { total_repos: radar.total_repos, total_analyzed: radar.total_analyzed, pending: radar.pending }

function fmt(n: number) { return new Intl.NumberFormat('es-PE').format(n || 0) }

useHead({
  title: 'Metodología: cómo se evalúa cada agente',
  meta: [{ name: 'description', content: 'Rúbrica de 7 dimensiones ponderadas, 8 pilares de agencia, tiers y calibración 2026. La cuenta completa, sin cajas negras.' }]
})
</script>
