<script setup lang="ts">
import { usePlayer } from '@vue-youtube/core';
import { YoutubeIframe } from '@vue-youtube/component';

const props = defineProps<{id: string}>();
// const player = ref();
// usePlayer(props.id, player, {width: '100%'});
</script>

<template>
  <YoutubeIframe :video-id="props.id" class="w-full h-auto aspect-video" />
</template>

<style scoped>
</style>
