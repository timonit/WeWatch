<script setup lang="ts">
import tooltip from '~/shared/directives/tooltip';

const nuxtApp = useNuxtApp();
nuxtApp.vueApp.directive('tooltip', tooltip);
</script>

<template>
  <div class="max-w-screen-xl mx-auto">
    <NuxtPage />
  </div>
</template>
