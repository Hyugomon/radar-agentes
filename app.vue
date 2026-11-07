<template>
  <div>
    <AppHeader />
    <main>
      <NuxtPage />
    </main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
const theme = useState<'light' | 'dark'>('theme', () => 'light')

useHead({
  htmlAttrs: { 'data-theme': theme },
  bodyAttrs: { class: 'radar' }
})

onMounted(() => {
  const saved = localStorage.getItem('radar-theme')
  if (saved === 'dark' || saved === 'light') theme.value = saved
})

function toggleTheme() {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
  localStorage.setItem('radar-theme', theme.value)
}

provide('toggleTheme', toggleTheme)
</script>
