<template>
  <Teleport to="body">
    <div class="scrim" :class="{ 'is-open': !!slug }" @click="$emit('close')" />
    <aside class="drawer" :class="{ 'is-open': !!slug }" :aria-hidden="!slug">
      <template v-if="data">
        <div class="drawer__head">
          <button class="close-x" @click="$emit('close')" aria-label="Cerrar">✕</button>
          <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap; margin-bottom: 8px">
            <span class="tier tier--lg" :class="`tier--${data.agent.tier}`">{{ data.agent.tier }}</span>
            <div>
              <h2 style="font-size: 21px; margin: 0">{{ data.agent.full_name }}</h2>
              <div class="tiny">{{ data.agent.archetype_label }} · {{ data.agent.kind }} · confianza {{ data.agent.confidence }}</div>
            </div>
            <div style="margin-left: auto; text-align: right">
              <div style="font-size: 24px; font-weight: 900">{{ data.agent.total.toFixed(1) }}</div>
              <div class="tiny">pts IA</div>
            </div>
          </div>
          <div style="display: flex; gap: 6px; flex-wrap: wrap">
            <a class="tag" :href="data.agent.url" target="_blank" rel="noopener">GitHub ↗</a>
            <NuxtLink class="tag" :to="`/agente/${data.agent.slug}`" @click="$emit('close')">Ficha completa →</NuxtLink>
            <NuxtLink class="tag" :to="`/versus?retador=${data.agent.slug}`" @click="$emit('close')">⚔️ Versus</NuxtLink>
          </div>
        </div>
        <div class="drawer__body">
          <AgentDetail :agent="data.agent" :meta="data.meta" />
        </div>
      </template>
      <div v-else-if="slug" class="drawer__body" style="padding-top: 40px">
        <p class="muted">Cargando ficha…</p>
      </div>
    </aside>
  </Teleport>
</template>

<script setup lang="ts">
const props = defineProps<{ slug: string }>()
defineEmits<{ close: [] }>()

const data = ref<any>(null)

watch(() => props.slug, async (slug) => {
  if (!slug) return
  data.value = null
  data.value = await $fetch(`/api/agent/${slug}`)
  document.body.style.overflow = 'hidden'
}, { immediate: true })

watch(() => props.slug, (slug) => {
  if (!slug) document.body.style.overflow = ''
})

onUnmounted(() => { document.body.style.overflow = '' })
</script>
