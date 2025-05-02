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
import FilmCollects from './film-collects.vue';
import AppCollapse from '~/shared/ui/app-collapse.vue';
import FilmRecomendations from './film-recomendations.vue';
import FilmCasts from './film-casts.vue';

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

const collectsIsCollapsed = ref(true);
const recommendationsIsCollapsed = ref(true);
const treilersIsCollapsed = ref(true);
const castsIsCollapsed = ref(false);
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

    <AppCollapse class="mt-6" v-model:collapsed="castsIsCollapsed" title="Актеры">
      <FilmCasts />
    </AppCollapse>

    <AppCollapse class="mt-6" v-if="service.film.value?.belongs_to_collection" v-model:collapsed="collectsIsCollapsed" title="...иквелы">
      <FilmCollects />
    </AppCollapse>

    <AppCollapse class="mt-6" v-model:collapsed="recommendationsIsCollapsed" title="Рекоммендации">
      <FilmRecomendations />
    </AppCollapse>

    <AppCollapse class="mt-6" v-model:collapsed="treilersIsCollapsed" title="Трейлеры">
      <FilmTrailers />
    </AppCollapse>

    <FilmPlayers class="mt-6" />
  </div>
</template>
