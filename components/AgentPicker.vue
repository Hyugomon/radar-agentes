<template>
  <div ref="root" class="picker">
    <span class="picker__label">{{ label }}</span>
    <div class="picker__input" @click="focusInput">
      <span
        v-if="selected"
        class="avatar"
        :style="{ background: avatarBg(selected.full_name) }"
        style="width: 28px; height: 28px; flex: 0 0 28px; font-size: 11px"
      >{{ initials(selected.full_name) }}</span>
      <span v-else class="avatar" style="width: 28px; height: 28px; flex: 0 0 28px; font-size: 12px; background: var(--line); color: var(--ink-3)">?</span>

      <input
        ref="input"
        v-model="query"
        :placeholder="selected ? selected.full_name : 'Busca el agente…'"
        aria-label="Buscar agente"
        @focus="open = true"
        @input="open = true"
        @keydown.down.prevent="move(1)"
        @keydown.up.prevent="move(-1)"
        @keydown.enter.prevent="choose(filtered[cursor])"
        @keydown.esc="open = false"
      />

      <button v-if="selected" class="btn btn--sm btn--ghost" style="padding: 3px 7px" @click.stop="clear">✕</button>
    </div>

    <div v-if="selected && !open" class="tiny" style="margin-top: 6px">
      #{{ selected.rank }} · Tier {{ selected.tier }} · {{ selected.total.toFixed(1) }} pts · agencia {{ Math.round(selected.agency) }}
    </div>

    <div v-if="open" class="picker__list">
      <div v-if="!filtered.length" class="picker__empty">Sin resultados para “{{ query }}”.</div>
      <div
        v-for="(a, i) in filtered"
        :key="a.slug"
        class="picker__item"
        :class="{ 'is-cursor': i === cursor }"
        @mouseenter="cursor = i"
        @click.stop="choose(a)"
      >
        <span class="avatar" :style="{ background: avatarBg(a.full_name) }">{{ initials(a.full_name) }}</span>
        <div style="min-width: 0">
          <b>{{ a.full_name }}</b>
          <div class="tiny" style="max-width: 300px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap">
            {{ a.summary || a.description }}
          </div>
        </div>
        <span class="meta">
          <span class="tier" :class="`tier--${a.tier}`" style="height: 20px; min-width: 24px; font-size: 11px">{{ a.tier }}</span>
          {{ a.total.toFixed(1) }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ agents: any[]; modelValue: string; label: string }>()
const emit = defineEmits<{ 'update:modelValue': [string] }>()

const root = ref<HTMLElement | null>(null)
const input = ref<HTMLInputElement | null>(null)
const open = ref(false)
const query = ref('')
const cursor = ref(0)

const selected = computed(() => props.agents.find(a => a.slug === props.modelValue))

const filtered = computed(() => {
  const needle = query.value.trim().toLowerCase()
  const list = needle
    ? props.agents.filter(a => `${a.full_name} ${a.summary} ${a.language}`.toLowerCase().includes(needle))
    : props.agents
  return list.slice(0, 8)
})

watch(filtered, () => { cursor.value = 0 })

function focusInput() {
  open.value = true
  nextTick(() => input.value?.focus())
}
function move(delta: number) {
  if (!open.value) { open.value = true; return }
  const n = filtered.value.length
  if (!n) return
  cursor.value = (cursor.value + delta + n) % n
}
function choose(a: any) {
  if (!a) return
  emit('update:modelValue', a.slug)
  open.value = false
  query.value = ''
  input.value?.blur()
}
function clear() {
  emit('update:modelValue', '')
  open.value = true
  query.value = ''
  nextTick(() => input.value?.focus())
}
function initials(name: string) {
  const part = (name.split('/')[1] || name).replace(/[^a-zA-Z0-9]/g, '')
  return part.slice(0, 2).toUpperCase()
}
function avatarBg(name: string) {
  let h = 0
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) % 360
  return `linear-gradient(135deg, hsl(${h} 68% 50%), hsl(${(h + 40) % 360} 68% 42%))`
}

function onDocClick(e: MouseEvent) {
  if (root.value && !root.value.contains(e.target as Node)) open.value = false
}
onMounted(() => document.addEventListener('click', onDocClick))
onUnmounted(() => document.removeEventListener('click', onDocClick))
</script>
