<template>
  <Teleport to="body">
    <div class="scrim" :class="{ 'is-open': !!slug }" @click="$emit('close')" />
    <aside class="drawer" :class="{ 'is-open': !!slug }" :aria-hidden="!slug">
      <template v-if="data">
        <div class="drawer__head">
          <button class="close-x" @click="$emit('close')" aria-label="Cerrar">✕</button>
          <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap; margin-bottom: 8px">
            <span class="tier tier--lg" :class="`tier--${data.ade.tier}`">{{ data.ade.tier }}</span>
            <div>
              <h2 style="font-size: 21px; margin: 0">{{ data.ade.name }}</h2>
              <div class="tiny">{{ data.ade.catLabel }} · {{ data.ade.license || (data.ade.licenseType === 'No verificada' ? 'No verificada' : 'Comercial') }} · {{ data.ade.execution }}</div>
            </div>
            <div style="margin-left: auto; text-align: right">
              <div style="font-size: 24px; font-weight: 900">{{ data.ade.total.toFixed(1) }}</div>
              <div class="tiny">ADE Score</div>
            </div>
          </div>
          <div style="display: flex; gap: 6px; flex-wrap: wrap">
            <a v-if="data.ade.website" class="tag" :href="data.ade.website" target="_blank" rel="noopener">Web ↗</a>
            <a v-if="data.ade.repo" class="tag" :href="data.ade.repo" target="_blank" rel="noopener">Repo ↗</a>
            <a v-if="data.ade.researchUrl" class="tag" :href="data.ade.researchUrl" target="_blank" rel="noopener">Dossier ↗</a>
            <NuxtLink class="tag" :to="`/ades/${data.ade.slug}`" @click="$emit('close')">Ficha completa →</NuxtLink>
          </div>
        </div>
        <div class="drawer__body">
          <AdeDetail :ade="data.ade" :meta="data.meta" />
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
  data.value = await $fetch(`/api/ade/${slug}`)
  document.body.style.overflow = 'hidden'
}, { immediate: true })

watch(() => props.slug, (slug) => {
  if (!slug) document.body.style.overflow = ''
})

onUnmounted(() => { document.body.style.overflow = '' })
</script>
