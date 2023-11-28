<script setup lang="ts">
import { Film, FilmCard } from '~/entities/film';
import { SearchPanel } from '~/features/film';
import { AppText, AppIcon } from '~/shared/ui';
import { useControlSide } from '~/shared/ui/layout/useControlSide';

const route = useRoute();
const { close } = useControlSide();
const currentFilm = ref<Film | null>(null);

const selectFilm = async (id: Film['id']) => {
  const res = await useFetch<Film>(`/api/film/${id}`);
  currentFilm.value = res.data.value as Film;
}

if (route.query.id) selectFilm(Number(route.query.id));
</script>

<template>
  <NuxtLayout :headerSideTriggerShow="true">
    <template #sideTriggerTitle>
      <AppIcon icon-name="search" />
    </template>
    <template #side>
      <SearchPanel @selectFilm="close()" />
    </template>

    <div v-if="!$route.query.id" class="w-full text-center pt-4">
      <AppText variant="h6" class="text-gray-500">Начните поиск и выберите фильм</AppText>
    </div>
    <FilmCard v-if="$route.query.id" :filmID="Number($route.query.id)" />
  </NuxtLayout>
</template>
