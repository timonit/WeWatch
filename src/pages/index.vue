<script setup lang="ts">
import DefaultLayout from '@/shared/ui/layout/default-layout.vue';
import { Film, FilmCard } from '~/entities/film';
import { SearchPanel } from '~/features';
import { AppText } from '~/shared';
import AppHeader from '~/widgets';

const currentFilm = ref<Film | null>(null);

const selectFilm = async (film: Film) => {
  const res = await useFetch(`/api/film/${film.id}`);
  currentFilm.value = res.data.value as Film;
}
</script>

<template>
  <DefaultLayout title="timon">
    <template #header>
      <AppHeader />
    </template>
    
    <template #side>
      <SearchPanel @select-film="selectFilm" />
    </template>
    
    <div v-if="!currentFilm" class="w-full text-center pt-4">
      <AppText variant="h6" class="text-gray-500">Начните поиск и выберите фильм</AppText>
    </div>
    <FilmCard v-else :film="currentFilm" />
  </DefaultLayout>
</template>
