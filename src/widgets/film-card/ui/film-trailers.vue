<script setup lang="ts">
import { AppText, AppLoader } from '~/shared/ui';
import { FilmService } from '../model';
import YoutubePlayer from '~/shared/ui/youtube.player.vue';

const service = inject('filmService') as FilmService;
const { trailers, trailersIsFetching } = service;
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 flex-wrap">
    <div v-if="trailersIsFetching" class="md:col-span-2 flex justify-center">
      <AppLoader size="md" />
    </div>
    <template v-else>
      <AppText v-if="!trailers.length" variant="simple" class="mt-6">Трейлеры не найдены</AppText>
      <YoutubePlayer
        v-for="trailer in trailers"
        :key="trailer.id"
        :id="trailer.key"
        class="w-full h-auto aspect-video"
       />
    </template>
  </div>
</template>
