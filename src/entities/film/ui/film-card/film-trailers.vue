<script setup lang="ts">
import { YoutubeIframe } from '@vue-youtube/component';
import { AppText, AppIcon, BadgeWW, AppLoader } from '~/shared/ui';
import { FilmService } from './service';

const service = inject('filmService') as FilmService;
const { trailers, trailersIsFetching } = service;
const isShow = ref(false);
</script>

<template>
  <div>
    <AppText variant="h6" class="mt-6">Трейлеры
      <BadgeWW class="text-sm inline-flex cursor-pointer ml-2 align-text-top" color="warning" @click="isShow = !isShow">
        <AppIcon v-show="!isShow" class="icon" title="Добавлен в список" icon-name="chevron-down" />
        <AppIcon v-show="isShow" class="icon" title="Добавлен в список" icon-name="chevron-up" />
      </BadgeWW>
    </AppText>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 flex-wrap" v-if="isShow">
      <div v-if="trailersIsFetching" class="md:col-span-2 flex justify-center">
        <AppLoader size="md" />
      </div>
      <template v-else>
        <AppText v-if="!trailers.length" variant="simple" class="mt-6">Трейлеры не найдены</AppText>
        <YoutubeIframe
          v-for="trailer in trailers"
          :key="trailer.id"
          :video-id="trailer.key"
          class="w-full h-auto aspect-video"
        />
      </template>
    </div>
  </div>
</template>
