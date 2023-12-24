<script setup lang="ts">
import { YoutubeIframe } from '@vue-youtube/component';
import { AppText } from '~/shared/ui';
import { FilmService } from './service';

const service = inject('filmService') as FilmService;
const { trailers } = service;
</script>

<template>
  <div>
    <AppText variant="h6" class="mt-6">Трейлеры</AppText>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 flex-wrap">
      <AppText v-if="!trailers.length" variant="simple" class="mt-6">Трейлеры не найдены</AppText>
      <YoutubeIframe
        v-for="trailer in trailers"
        :key="trailer.id"
        :video-id="trailer.key"
        class="w-full h-auto aspect-video"
      />
    </div>
  </div>
</template>
