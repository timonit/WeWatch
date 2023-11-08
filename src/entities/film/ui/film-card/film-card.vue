<script setup lang="ts">
import { AppText, BadgeWW, AppIcon, AppToolbar } from '@/shared/ui';
import { Film } from '../../types';
import InfoPair from './info-pair.vue';
import { DBAPI } from '../../model';
import { AddFilmFC, RemoveFilmFC } from '~/features/film';

const props = defineProps<{film: Film}>();
const EXPORT_URL = 'https://image.tmdb.org/t/p';
const db = await DBAPI.instance();

const filmIsExist = computed(() => {
  const film = db.data.list.find((film) => film.id === props.film.id);
  return !!film;
})
</script>

<template>
  <div class="flex flex-col">
    <div class="film-header flex justify-between items-start">
      <AppText variant="h1">{{ props.film.title }}</AppText>
      <AppText v-show="filmIsExist" variant="h1">
        <AppIcon class="icon" title="Добавлен в список" icon-name="circle-check" />
      </AppText>
    </div>

    <div class="main-block flex my-2">
      <img :src="`${EXPORT_URL}/w200${props.film.poster_path}`" width="200" height="200" class="object-cover rounded-lg" />
      <div class="pl-4">
        <AppText variant="h5">{{ props.film.tagline }}</AppText>
        <AppText variant="paragraph">{{ props.film.overview }}</AppText>
      </div>
    </div>

    <div class="info-panel flex gap-4 justify-between">
      <div class="info-panel">
        <InfoPair v-if="props.film.production_companies" property="Компании" :value="props.film.production_companies.map(g => g.name).join(', ')" />
        <InfoPair v-if="props.film.production_countries" property="Страны" :value="props.film.production_countries.map(g => g.name).join(', ')" />
        <InfoPair property="Бюджет" :value="`${(props.film.budget || 0).toLocaleString()} $`" />
        <InfoPair property="Сборы" :value="`${(props.film.revenue || 0).toLocaleString()} $`" />
        <InfoPair v-if="props.film.release_date" property="Дата выпуска" :value="new Date(props.film.release_date).toLocaleDateString()" />
        <InfoPair property="Популярность" :value="props.film.popularity || 0" />
      </div>
      <div class="flex flex-col items-end gap-6">
        <div class="flex flex-wrap justify-end gap-2">
          <BadgeWW v-for="g of props.film.genres" color="danger" class="text-sm">{{ g.name }}</BadgeWW>
        </div>
        <BadgeWW color="danger" class="text-sm whitespace-nowrap">
          {{ props.film.status }}
        </BadgeWW>
        <BadgeWW color="danger" title="Продолжительность" class="text-sm whitespace-nowrap">
          <i class="mi-clock mr-1"></i>
          {{ props.film.runtime || 0 }} min
        </BadgeWW>
      </div>
    </div>


    <AppToolbar class="mt-4">
      <AddFilmFC v-show="!filmIsExist" :film="props.film" />
      <RemoveFilmFC v-show="filmIsExist" :film="props.film" />
    </AppToolbar>
  </div>
</template>

<style scoped>
.icon {
  color: var(--brand-first);
}
</style>
