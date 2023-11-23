<script setup lang="ts">
import { AppText, BadgeWW, AppIcon, AppToolbar, AppLoader } from '@/shared/ui';
import { Film } from '../../types';
import InfoPair from './info-pair.vue';
import { DBAPI } from '../../model';
import { AddFilmFC, RemoveFilmFC } from '~/features/film';
import {  } from '@headlessui/vue';

const props = defineProps<{filmID: Film['id']}>();
const EXPORT_URL = 'https://image.tmdb.org/t/p';
const isFetching = ref(false);
const film = ref<Film | null>(null);
let db: DBAPI;

onBeforeMount(async () => {
  db = await DBAPI.instance();
  updateExist();
});

const filmIsExist = ref(false);
const updateExist = () => {
  const filmExist = db.data.list.find((itemFilm) => itemFilm.id === props.filmID);
  filmIsExist.value = !!filmExist;
}

const fetchFilm = async () => {
  const res = await useFetch<Film>(`/api/film/${props.filmID}`);
  film.value = res.data.value;
};
fetchFilm();

watch(props, async () => {
  isFetching.value = true;
  await fetchFilm();
  isFetching.value = false;
  updateExist();
});
</script>

<template>
  <div v-if="isFetching" class="flex justify-center items-center">
    <AppLoader size="md" />
  </div>
  <div v-if="film && !isFetching" class="flex flex-col">
    <div class="film-header flex justify-between items-start">
      <AppText variant="h1">{{ film.title }}</AppText>
      <AppText v-show="filmIsExist" variant="h1">
        <AppIcon class="icon" title="Добавлен в список" icon-name="circle-check" />
      </AppText>
    </div>

    <div class="main-block flex my-2 max-md:flex-wrap">
      <img :src="`${EXPORT_URL}/w200${film.poster_path}`" width="200" height="200" class="object-cover rounded-lg max-md:w-full" />
      <div class="md:pl-4">
        <AppText variant="h5">{{ film.tagline }}</AppText>
        <AppText variant="paragraph">{{ film.overview }}</AppText>
      </div>
    </div>

    <div class="info-panel flex gap-4 justify-between max-md:flex-wrap">
      <div class="info-panel order-1 max-md:order-2">
        <InfoPair v-if="film.production_companies" property="Компании" :value="film.production_companies.map(g => g.name).join(', ')" />
        <InfoPair v-if="film.production_countries" property="Страны" :value="film.production_countries.map(g => g.name).join(', ')" />
        <InfoPair property="Бюджет" :value="`${(film.budget || 0).toLocaleString()} $`" />
        <InfoPair property="Сборы" :value="`${(film.revenue || 0).toLocaleString()} $`" />
        <InfoPair v-if="film.release_date" property="Дата выпуска" :value="new Date(film.release_date).toLocaleDateString()" />
        <InfoPair property="Популярность" :value="film.popularity || 0" />
      </div>
      <div class="flex flex-col items-end gap-6 order-2 max-md:order-1 max-md:flex-row max-md:mt-8 max-md:flex-wrap">
        <div class="flex flex-wrap justify-end gap-2 max-md:w-full max-md:justify-start">
          <BadgeWW v-for="g of film.genres" color="danger" class="text-sm">{{ g.name }}</BadgeWW>
        </div>
        <BadgeWW color="danger" class="text-sm whitespace-nowrap">
          {{ film.status }}
        </BadgeWW>
        <BadgeWW color="danger" title="Продолжительность" class="text-sm whitespace-nowrap">
          <i class="mi-clock mr-1"></i>
          {{ film.runtime || 0 }} min
        </BadgeWW>
      </div>
    </div>


    <AppToolbar class="mt-4">
      <AddFilmFC v-show="!filmIsExist" :film="film" />
      <RemoveFilmFC v-show="filmIsExist" :film="film" />
    </AppToolbar>
  </div>
</template>

<style scoped>
.icon {
  color: var(--brand-first);
}
</style>
