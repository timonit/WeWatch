<script setup lang="ts">
import { FilmService } from './service';
import { AppText, AppLoader } from '~/shared/ui';

const service = inject('filmService') as FilmService;
const { players, playersIsFetching } = service;
</script>

<template>
  <div>
    <AppText variant="h6" class="mt-6">Видео</AppText>
    <div class="grid grid-cols-1 gap-4 flex-wrap">
      <AppText v-if="!players.length && !playersIsFetching" variant="simple" class="mt-6">Видео не найдены</AppText>
      <AppLoader v-if="playersIsFetching" size="md" />

      <template v-if="players.length">
        <iframe
          v-for="player in players"
          :src="player.iframeUrl"
          width="720"
          height="450"
          frameborder="0"
          scrolling="no"
          allowfullscreen
          class="w-full h-auto aspect-video"
          loading=""
        ></iframe>
      </template>

    </div>
  </div>
</template>
