<script setup lang="ts">
import { app } from './model/app';

onBeforeMount(async () => {
  await app.init();
})
</script>

<template>
  <div class="max-w-screen-xl mx-auto">
    <div v-if="!app.isInited.value" class="loader fixed w-screen h-screen flex justify-center items-center">
      <h1>Loading...</h1>
    </div>
    <NuxtPage v-if="app.isInited.value" />
  </div>
</template>

<style scoped>
  .loader {
    background-color: var(--bg-color);
  }
</style>
