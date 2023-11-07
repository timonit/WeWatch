<script setup lang="ts">
import { app } from './model/app';

onBeforeMount(async () => {
  app.init();
})
</script>

<template>
  <div class="max-w-screen-xl mx-auto">
    <NuxtPage />
  </div>
</template>

<style scoped>
  .loader {
    background-color: var(--bg-color);
    opacity: .5;
  }
</style>
