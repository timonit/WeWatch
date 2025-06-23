<script setup lang="ts">
import { FilmCard } from '~/widgets/film-card';
import { SearchPanel } from '~/features/film';
import { AppText, AppIcon } from '~/shared/ui';
import { useControlSide } from '~/shared/ui/layout/useControlSide';
import { PersonView } from '~/widgets/person-view';

const { close: closeSide } = useControlSide();

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
    
    <template v-if="$route.query.id">
      <PersonView v-if="$route.query.type && $route.query.type ==='person'"
        :personID="Number($route.query.id)"
        class="w-full h-full"
      />
      <FilmCard v-else
        :filmID="Number($route.query.id)"
        :type="($route.query.type as ('tv' | 'movie'))"
      />
    </template>
  </NuxtLayout>
</template>
