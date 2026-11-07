<template>
  <footer class="site-footer">
    <div class="container">
      <span><b>Radar de Agentes IA</b> · ranking independiente de agentes que trabajan por ti</span>
      <span style="margin-left:auto">
        Datos: veredictos individuales con rúbrica de 7 dimensiones · {{ generated }}
      </span>
      <NuxtLink to="/metodologia">Cómo se califica</NuxtLink>
    </div>
  </footer>
</template>

<script setup lang="ts">
const generated = useState('radar-generated', () => '')
</script>
