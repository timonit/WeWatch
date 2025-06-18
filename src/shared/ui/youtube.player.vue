<script setup lang="ts">
const props = defineProps<{id: string}>();
</script>

<template>
  <iframe
    id="player"
    type="text/html"
    :src="`http://www.youtube.com/embed/${id}`"
    frameborder="0"
  >
  </iframe>
</template>
