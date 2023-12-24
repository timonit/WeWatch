<script setup lang="ts">
import { Film } from '../../types';
import { onBeforeMount } from 'vue';
import FilmTrailers from './film-trailers.vue';
import { MediaTypes } from '~/shared';
import FilmPlayers from './film-players.vue';
import FilmInfo from './film-info.vue';
import FilmDescription from './film-description.vue';
import FilmToolbar from './film-toolbar.vue';
import FilmHeader from './film-header.vue';
import { FilmService } from './service';
import { AppLoader } from '~/shared/ui';

const props = defineProps<{filmID: Film['id'], type: MediaTypes}>();
const service = new FilmService(props.filmID, props.type);
const {isFetching, film} = service;

onBeforeMount(async () => {
  await service.init();
});

watch(props, () => {
  service.setFilm(props.filmID, props.type);
})
  
provide('filmService', service);
</script>

<template>
  <div v-if="isFetching" class="flex justify-center items-center">
    <AppLoader size="md" />
  </div>
  <div v-if="film && !isFetching" class="flex flex-col">
    <FilmHeader />
    <FilmToolbar />
    <FilmDescription />
    <FilmInfo />
    <FilmTrailers />
    <FilmPlayers />
  </div>
</template>
