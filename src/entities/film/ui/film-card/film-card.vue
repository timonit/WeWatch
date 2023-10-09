<script setup lang="ts">
import AppText from '@/shared/ui/typography/app-text.vue';
import { Film } from '../../types';
import InfoPair from './info-pair.vue';

const props = defineProps<{film: Film}>();

const EXPORT_URL = 'https://image.tmdb.org/t/p';
</script>

<template>
  <div class="flex flex-col">
    <div class="film-header flex justify-between items-center">
      <AppText variant="h1">{{ props.film.title }}</AppText>
      <div class="bg-indigo-700 w-fit h-fit px-4 rounded-xl">{{ props.film.status }}</div>
    </div>

    <div class="main-block flex my-2">
      <img :src="`${EXPORT_URL}/w200${props.film.poster_path}`" width="200" height="200" class="object-cover rounded-lg" />
      <div class="pl-4">
        <AppText variant="h5">{{ props.film.tagline }}</AppText>
        <AppText variant="paragraph">{{ props.film.overview }}</AppText>
      </div>
    </div>

    <div class="info-panel grid grid-cols-3 gap-x-4">
      <InfoPair property="Genre" :value="props.film.genres.map(g => g.name).join(', ')" />
      <InfoPair property="Runtime" :value="`${(props.film.runtime || 0) / 60} h`" />
      <InfoPair property="Budget" :value="props.film.budget || 0" />
      <InfoPair property="Popularity" :value="props.film.popularity || 0" />
      <InfoPair v-if="props.film.production_companies" property="Companies" :value="props.film.production_companies.map(g => g.name).join(', ')" />
      <InfoPair v-if="props.film.production_countries" property="Countries" :value="props.film.production_countries.map(g => g.name).join(', ')" />
      <InfoPair v-if="props.film.revenue" property="Revenue" :value="props.film.revenue" />
      <InfoPair v-if="props.film.release_date" property="Release" :value="props.film.release_date" />
    </div>
  </div>
</template>
