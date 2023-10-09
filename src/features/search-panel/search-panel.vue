<script setup lang="ts">
import { AppText, FormInput } from '@/shared';
import ResultList from './result-list.vue';
import { Film } from '@/entities/film';
import { debounce } from 'lodash';
import AppLoader from '~/shared/ui/loader/app-loader.vue';

const results = ref<Film[]>([]);
const isLoading = ref<boolean>(false);
const searchText = ref<string>('');

const emit = defineEmits<{(e: 'selectFilm', film: Film): void}>();

const film: Film[] = [
  {
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
  },
  {
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
]

const handler = async (film: Film) => {
  emit('selectFilm', film);
}

const autoSearch = debounce(async (e: Event) => {
  if (searchText.value.trim()) {
    isLoading.value = true;
    
    if (searchText.value.trim()) {
      const result = await useFetch(
        '/api/film/search',
        {
          query: { query: searchText },
        }
      );

      results.value = result.data.value?.results;
      isLoading.value = false;
    }
    // setTimeout(() => {
    // }, 800);
  } else {
    results.value = [];
    isLoading.value = false;
  }
}, 500);
</script>

<template>
  <div class="h-full">
    <FormInput v-model="searchText" @input="autoSearch" placeholder="search" />
    <div class="result mt-4">
      <div v-if="!isLoading && !searchText" class="w-full flex justify-center">
        <AppText variant="simple" class="text-gray-500">Введите название фильма</AppText>
      </div>
      <div v-if="isLoading" class="w-full flex justify-center">
        <AppLoader />
      </div>
      <ResultList v-else :list="results" @selected="handler" />
    </div>
  </div>
</template>

<style lang="scss">
.result {
  height: calc(100% - 1rem - 1em - 2rem);
}
</style>
