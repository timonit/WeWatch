<script setup lang="ts">
import AppText from '@/shared/ui/typography/app-text.vue';
import BadgeWw from '@/shared/ui/badge-ww.vue';
import { Film } from '../../types';
import InfoPair from './info-pair.vue';

const props = defineProps<{film: Film}>();
const EXPORT_URL = 'https://image.tmdb.org/t/p';
</script>

<template>
  <div class="flex flex-col">
    <div class="film-header flex justify-between items-start">
      <AppText variant="h1">{{ props.film.title }}</AppText>
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
          <badge-ww v-for="g of props.film.genres" color="danger" class="text-sm">{{ g.name }}</badge-ww>
        </div>
        <badge-ww color="danger" class="text-sm whitespace-nowrap">
          {{ props.film.status }}
        </badge-ww>
        <badge-ww color="danger" title="Продолжительность" class="text-sm whitespace-nowrap">
          <i class="mi-clock mr-1"></i>
          {{ props.film.runtime || 0 }} min
        </badge-ww>
      </div>
    </div>
  </div>
</template>
