<script setup lang="ts">
import { FilmService, PlayerDTO } from './service';
import { AppText, AppLoader } from '~/shared/ui';

const service = inject('filmService') as FilmService;
const { players, playersIsFetching } = service;
const route = useRoute();
</script>

<template>
  <div>
    <AppText variant="h6" class="mt-6">Видео</AppText>
    <div class="grid grid-cols-1 gap-4 flex-wrap">
      <AppText v-if="!players.length && !playersIsFetching" variant="simple" class="mt-6">Видео не найдены</AppText>
      <AppLoader v-if="playersIsFetching" size="md" />

      <template v-if="players.length">
        <div class="film-tab row flex w-full border-b-2">
          <RouterLink
            v-for="player in players"
            class="tab py-1 px-3 hover:bg-slate-500 hover:text-zinc-900 cursor-pointer"
            :class="{ 'bg-slate-300 text-zinc-900': player.source === route.query.source }"
            :to="{
              query: {
                ...route.query,
                source: player.source,
              }
            }"
          >
            {{ player.source }}
          </RouterLink>
        </div>
        
        <iframe
          v-for="player in players"
          v-show="player.source === route.query.source"
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

<style scoped lang="scss">
</style>
