<template>
  <header class="site-header">
    <div class="container site-header__inner">
      <NuxtLink to="/" class="brand">
        <span class="brand__mark">◎</span>
        <span>
          Radar de Agentes IA
          <small>solo open source · 2026</small>
        </span>
      </NuxtLink>

      <nav class="nav">
        <NuxtLink to="/" :class="{ active: route.path === '/' }">Ranking</NuxtLink>
        <NuxtLink to="/versus" :class="{ active: route.path.startsWith('/versus') }">Versus</NuxtLink>
        <NuxtLink to="/ades" :class="{ active: route.path.startsWith('/ades') }">ADEs</NuxtLink>
        <NuxtLink to="/metodologia" :class="{ active: route.path.startsWith('/metodologia') }">Metodología</NuxtLink>
      </nav>

      <div class="header-actions">
        <NuxtLink to="/versus" class="btn btn--sm btn--violet">⚔️ Versus</NuxtLink>
        <button class="btn btn--sm btn--icon" :title="theme === 'dark' ? 'Tema claro' : 'Tema oscuro'" @click="toggle">
          {{ theme === 'dark' ? '☀️' : '🌙' }}
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
const route = useRoute()
const theme = useState<'light' | 'dark'>('theme')
const toggle = inject<() => void>('toggleTheme', () => {})
</script>
