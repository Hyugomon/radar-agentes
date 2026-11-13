<template>
  <div class="fp" :style="style">
    <div class="fp__aura" />
    <div class="fp__orb">
      <div class="fp__face">
        <div class="fp__brows"><i /><i /></div>
        <div class="fp__eyes" :class="`eyes--${skin.eyes}`">
          <span class="anime-eye"><i class="iris"><b class="pupil" /><em class="glint" /></i></span>
          <span class="anime-eye"><i class="iris"><b class="pupil" /><em class="glint" /></i></span>
        </div>
        <div class="a2-mouth" :class="mouthClass" style="transform: scale(.85)" />
      </div>
      <span class="fp__mono">{{ initials }}</span>
      <span class="fp__hand fp__hand--l" :class="`hands--${skin.hands}`">
        <i class="finger f1" /><i class="finger f2" /><i class="finger f3" /><i class="finger thumb" />
      </span>
      <span class="fp__hand fp__hand--r" :class="`hands--${skin.hands}`">
        <i class="finger f1" /><i class="finger f2" /><i class="finger f3" /><i class="finger thumb" />
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFighter } from '~/composables/useFighter'

const props = defineProps<{ fighter: any }>()
const { skinFor, styleFor } = useFighter()
const skin = computed(() => skinFor(props.fighter))
const style = computed(() => styleFor(props.fighter))
const initials = computed(() => {
  const name = String(props.fighter?.full_name || props.fighter?.name || '?')
  const part = (name.split('/')[1] || name).replace(/[^a-zA-Z0-9]/g, '')
  return part.slice(0, 2).toUpperCase()
})
const mouthClass = computed(() => ['fierce', 'strategic', 'stoic'].includes(skin.value.eyes) ? 'mouth--smirk' : 'mouth--smile')
</script>
