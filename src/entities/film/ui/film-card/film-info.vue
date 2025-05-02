<script setup lang="ts">
import InfoPair from './info-pair.vue';
import { BadgeWW } from '@/shared/ui';
import { FilmService } from './service';
import AppCollapse from '~/shared/ui/app-collapse.vue';

const service = inject('filmService') as FilmService;

const {film} = service;
const extensionCollapsed = ref(true);
</script>

<template>
  <div v-if="film">
    <div class="info-panel flex gap-4 justify-between max-md:flex-wrap">
      <div class="info-panel order-1 max-md:order-2">
        <InfoPair property="тип" :value="service.mediaType.value" />
        <InfoPair v-if="film.production_companies" property="Компании" :value="film.production_companies.map(g => g.name).join(', ')" />
        <InfoPair property="Бюджет" :value="`${(film.budget || 0).toLocaleString()} $`" />
        <InfoPair property="Сборы" :value="`${(film.revenue || 0).toLocaleString()} $`" />
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

    <AppCollapse class="mt-2" v-model:collapsed="extensionCollapsed" title="Дополнительные данные">
      <div class="info-panel flex gap-4 justify-between max-md:flex-wrap">
        <div class="info-panel order-1 max-md:order-2">
          <InfoPair v-if="film.production_countries" property="Страны" :value="film.production_countries.map(g => g.name).join(', ')" />
          <InfoPair v-if="film.release_date" property="Дата выпуска" :value="new Date(film.release_date).toLocaleDateString()" />
          <InfoPair property="Популярность" :value="film.popularity || 0" />
        </div>
      </div>
    </AppCollapse>
  </div>
</template>
