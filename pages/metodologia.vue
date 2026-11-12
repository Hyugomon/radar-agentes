<template>
  <div class="container" style="padding-top: 40px">
    <span class="eyebrow">METODOLOGÍA · 2026</span>
    <h1 style="font-size: 38px; max-width: 980px; margin-top: 14px">Cómo se califica: solo open source, con Grok Bot como listón</h1>
    <p class="muted" style="font-size: 16px; max-width: 860px; margin-top: 12px">
      Esto no es un ranking de frameworks ni de productos cerrados. Es un ranking de <b>repos open source</b>
      que puedes instalar o autoalojar. Grok Bot define el estándar —identidad, computadora propia, memoria,
      rutinas, apps reales, coordinación y aprobaciones—, pero <b>no compite</b>: es cerrado. Cada repo se
      mide contra esa lista y guarda su dossier con las fuentes consultadas.
    </p>

    <div class="grid-2" style="margin-top: 26px">
      <div class="panel" style="padding: 22px 24px">
        <h2 style="font-size: 16px; margin-bottom: 10px">Qué entra y qué no</h2>
        <div class="callout" style="margin-bottom: 14px">
          <b>Entra:</b> repos open source con licencia publicada que puedas instalar o autoalojar como
          bot, agente, asistente o equipo.
        </div>
        <div class="callout callout--warn" style="margin-bottom: 14px">
          <b>No entra:</b> productos cerrados como Grok Bot, Dots, Muse o Cue. Son la referencia, no
          competidores. Tampoco frameworks, SDKs, runtimes e infraestructura: LangChain, LangGraph,
          CrewAI, AutoGen, OpenAI Agents SDK y compañía no son agentes finales.
        </div>
        <div class="manifesto__badges" style="justify-content: flex-start; max-width: none">
          <span v-for="x in meta.excluded" :key="x" class="tag">{{ x }}</span>
        </div>

        <h2 style="font-size: 16px; margin: 22px 0 10px">El circuito</h2>
        <ol style="margin: 0; padding-left: 18px; color: var(--ink-2); font-size: 13.5px; line-height: 1.7">
          <li><b style="color: var(--ink)">Ficha.</b> README actual, web oficial, releases y snapshot previo. Cada repo guarda su carpeta <code>research/&lt;slug&gt;/</code> con la evidencia y las citas.</li>
          <li><b style="color: var(--ink)">Puntuación.</b> 8 dimensiones ponderadas + 8 piezas del ADN Grok Bot.</li>
          <li><b style="color: var(--ink)">Lectura.</b> Grok Score (0-100) y tier. El ADN desempata; no premia la popularidad.</li>
          <li><b style="color: var(--ink)">Revisión.</b> Precios, límites y funciones cambian: la fecha de revisión queda en cada ficha.</li>
        </ol>

        <h2 style="font-size: 16px; margin: 22px 0 10px">Escalera de tiers</h2>
        <div class="ladder">
          <div v-for="t in meta.tiers" :key="t.name" class="rung"><b>{{ t.name }}</b>≥ {{ t.floor }}</div>
        </div>

        <h2 style="font-size: 16px; margin: 22px 0 10px">Límites, dicho claro</h2>
        <ul style="margin: 0; padding-left: 18px; color: var(--ink-2); font-size: 13.5px; line-height: 1.7">
          <li v-for="(l, i) in meta.limits" :key="i">{{ l }}</li>
        </ul>
      </div>

      <div class="panel" style="padding: 22px 24px">
        <h2 style="font-size: 16px; margin-bottom: 10px">Dimensiones y pesos</h2>
        <p class="lede">Capacidad, autonomía y computadora pesan 45 % juntas: lo que separa un bot que trabaja de un chat con herramientas. Producto pesa 15 % porque la mejor arquitectura no sirve si no puedes usarla.</p>
        <table class="calc">
          <tbody>
            <tr v-for="d in meta.dimensions" :key="d.key">
              <td class="dim-name">{{ d.label }}<small>{{ d.hint }}</small></td>
              <td class="num"><b>{{ Math.round(d.weight * 100) }}%</b></td>
            </tr>
          </tbody>
        </table>

        <h2 style="font-size: 16px; margin: 22px 0 10px">ADN Grok Bot</h2>
        <p class="lede">Suman {{ meta.agency_max }}. Se marcan solo con evidencia; ante la duda, falso. No es lo mismo tener “memoria” en el marketing que recordar por bot.</p>
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
        <div class="kvrow" style="padding: 6px 0; border-bottom: 1px solid var(--line-2)"><span>Repos open source</span><b>{{ fmt(counts.ready) }}</b></div>
        <div class="kvrow" style="padding: 6px 0; border-bottom: 1px solid var(--line-2)"><span>Bots personales</span><b>{{ fmt(counts.personal) }}</b></div>
        <div class="kvrow" style="padding: 6px 0; border-bottom: 1px solid var(--line-2)"><span>Equipos</span><b>{{ fmt(counts.teams) }}</b></div>
        <div class="kvrow" style="padding: 6px 0; border-bottom: 1px solid var(--line-2)"><span>Agentes generales</span><b>{{ fmt(counts.general) }}</b></div>
      </div>
    </div>

    <div class="panel" style="padding: 22px 24px; margin-top: 24px">
      <h2 style="font-size: 16px; margin-bottom: 10px">El listón, en una frase</h2>
      <p class="muted" style="font-size: 14px; max-width: 920px">
        Grok Bot gana porque junta las piezas que casi nadie junta: varios bots con nombre, una computadora
        persistente con navegador y terminal, memoria, skills y rutinas, coordinación entre bots y
        aprobaciones antes de lo irreversible. Es cerrado y no entra al ranking; los repos open source se
        miden contra esa lista. Un repo puede ser mejor en una pieza —más barato, más abierto, más privado—
        pero si le falta la mitad del paquete, no es el listón.
      </p>
      <a href="https://docs.x.ai/grok-bot/overview" target="_blank" rel="noopener" class="btn" style="margin-top: 14px">Ver la documentación oficial de Grok Bot ↗</a>
    </div>
  </div>
</template>

<script setup lang="ts">
const { data } = await useFetch('/api/agents')
const radar = data.value as any
const meta = radar.meta
const counts = radar.counts || {}

function fmt(n: number) { return new Intl.NumberFormat('es-PE').format(n || 0) }

useHead({
  title: 'Metodología: cómo se califica cada repo open source contra Grok Bot',
  meta: [{ name: 'description', content: 'Rúbrica de 8 dimensiones, 8 piezas del ADN Grok Bot y tiers. Solo repos open source; productos cerrados y frameworks quedan fuera del ranking.' }]
})
</script>
