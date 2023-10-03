<script setup lang="ts">
import DefaultLayout from '@/shared/ui/layout/default-layout.vue';
import { Film, FilmCard } from '~/entities/film';
import { SearchPanel } from '~/features';
import { AppText } from '~/shared';
import AppHeader from '~/widgets';

const film: Film = {
  adult: false,
  budget: 40000,
  genres: [
    {
      id: 1,
      name: 'Comedy',
    }
  ],
  id: 0,
  original_language: 'ru',
  original_title: 'film name',
  overview: `Two lost souls visiting Tokyo -- the young, neglected wife of a photographer and a washed-up movie star shooting a TV commercial -- find an odd solace and pensive freedom to be real in each other's company, away from their lives in America.`,
  popularity: 0,
  poster_path: 'https://picsum.photos/300/300',
  production_companies: [{
      "id": 17041,
      "name": "Full House",
      "origin_country": ""
    },],
  production_countries: [{
      "iso_3166_1": "BE",
      "name": "Belgium"
    },],
  release_date: '2022-02-16',
  revenue: 0,
  runtime: 102,
  spoken_languages: [{
      "english_name": "French",
      "iso_639_1": "fr",
      "name": "Français"
    }],
  status: 'Rumored',
  tagline: "Everyone wants to be found.",
  title: 'Король-львёнок',
  video: false,
  vote_average: 6.5,
  vote_count: 120
}
</script>

<template>
  <DefaultLayout title="timon">
    <template #header>
      <AppHeader />
    </template>
    
    <template #side>
      <SearchPanel />
    </template>
    
    <FilmCard :film="film" />
    <!-- <div class="w-full text-center pt-4">
      <AppText variant="h6" class="text-gray-500">Начните поиск и выберите фильм</AppText>
    </div> -->
  </DefaultLayout>
</template>
