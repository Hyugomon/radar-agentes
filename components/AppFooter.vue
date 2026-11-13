<template>
  <footer class="site-footer">
    <div class="container">
      <span><b>Radar de Agentes IA</b> · agentes open source y ADEs investigados uno por uno</span>
      <span style="margin-left:auto">
        Datos: dossiers de investigación · {{ generated }}
      </span>
      <NuxtLink to="/metodologia">Cómo se califica</NuxtLink>
    </div>
  </footer>
</template>

<script setup lang="ts">
const generated = useState('radar-generated', () => 'nov 2026')
</script>
