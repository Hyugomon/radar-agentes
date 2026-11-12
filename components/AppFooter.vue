<template>
  <footer class="site-footer">
    <div class="container">
      <span><b>Radar de Agentes IA</b> · ranking de productos medidos contra Grok Bot</span>
      <span style="margin-left:auto">
        Datos: catálogo curado de productos · {{ generated }}
      </span>
      <NuxtLink to="/metodologia">Cómo se califica</NuxtLink>
    </div>
  </footer>
</template>

<script setup lang="ts">
const generated = useState('radar-generated', () => 'nov 2026')
</script>
