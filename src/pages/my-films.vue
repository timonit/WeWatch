<script setup lang="ts">
import { Film, FilmCard } from '~/entities/film';
import { AppText } from '~/shared/ui';
import { useControlSide } from '~/shared/ui/layout/useControlSide';
import { FilmList } from '~/widgets';

const route = useRoute();
const { close } = useControlSide();
const currentFilm = ref<Film | null>(null);
const selectedID = ref();

const selectFilm = async (id: Film['id']) => {
  selectedID.value = id;
  const res = await useFetch(`/api/film/${id}`);
  currentFilm.value = res.data.value as Film;
}

if (route.query.id) selectFilm(Number(route.query.id));
</script>

<template>
  <NuxtLayout :headerSideTriggerShow="true">
    <template #side>
      <FilmList @selectFilm="close()" />
    </template>

    <div v-if="!$route.query.id" class="w-full text-center pt-4">
      <AppText variant="h6" class="text-gray-500">Выберите фильм</AppText>
    </div>
    <FilmCard v-if="$route.query.id" :filmID="Number($route.query.id)" />
  </NuxtLayout>
</template>
