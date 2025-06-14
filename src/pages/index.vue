<script setup lang="ts">
import { type Film, FilmCard } from '~/entities/film';
import { SearchPanel } from '~/features/film';
import { AppText, AppIcon } from '~/shared/ui';
import { useControlSide } from '~/shared/ui/layout/useControlSide';

const route = useRoute();
const { close: closeSide } = useControlSide();
const currentFilm = ref<Film | null>(null);

const selectFilm = async (id: Film['id']) => {
  const res = await useFetch<Film>(`/api/movie/${id}`);
  currentFilm.value = res.data.value as Film;
}

if (route.query.id) selectFilm(Number(route.query.id));

const isMobile = ref(false);
onBeforeMount(() => {
  if (innerWidth && innerWidth < 768) isMobile.value = true;
})
</script>

<template>
  <NuxtLayout :headerSideTriggerShow="true">
    <template #sideTriggerTitle v-if="!isMobile">
      <AppIcon icon-name="search" />
    </template>

    <template #side v-if="!isMobile">
      <SearchPanel @selectFilm="closeSide()" />
    </template>
    <SearchPanel v-if="isMobile" @selectFilm="closeSide()" />

    <div v-if="!$route.query.id" class="w-full text-center pt-4">
      <AppText variant="h6" class="text-gray-500">Начните поиск и выберите фильм</AppText>
    </div>
    <FilmCard v-if="$route.query.id" :filmID="Number($route.query.id)" :type="($route.query.type as ('tv' | 'movie'))" />
  </NuxtLayout>
</template>
