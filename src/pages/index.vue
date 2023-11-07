<script setup lang="ts">
import { ref, useFetch } from '#imports';
import { Film, FilmCard } from '~/entities/film';
import { SearchPanel } from '~/features/film';
import { AppText } from '~/shared/ui';
import { AddFilmFC } from '~/features/film';

const currentFilm = ref<Film | null>(null);

const selectFilm = async (film: Film) => {
  const res = await useFetch(`/api/film/${film.id}`);
  currentFilm.value = res.data.value as Film;
}
</script>

<template>
  <NuxtLayout>
    <template #side>
      <SearchPanel @select-film="selectFilm" />
    </template>

    <div v-if="!currentFilm" class="w-full text-center pt-4">
      <AppText variant="h6" class="text-gray-500">Начните поиск и выберите фильм</AppText>
    </div>
    <FilmCard v-if="currentFilm" :film="currentFilm" />
    <div v-if="currentFilm" class="flex w-full justify-center">
      <AddFilmFC :filmID="currentFilm?.id" />
    </div>
  </NuxtLayout>
</template>
