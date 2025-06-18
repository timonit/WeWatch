<script setup lang="ts">
import { DBAPI } from '~/entities/film';
import { FilmService } from '../model';
import { AppText, AppIcon } from '~/shared/ui';

const db = DBAPI.instance();
const service = inject('filmService') as FilmService;
const { film, filmIsExist } = service;

const filmIsWatched = computed(() => {
  if (!Array.isArray(db.data.watched) || !film.value) return false;
  return db.data.watched.indexOf(film.value.id) > -1;
});
</script>

<template>
  <div class="film-header flex justify-between items-start" v-if="film">
    <AppText variant="h1">{{ film.title || film.name }}</AppText>
    
    <div class="flex justify-end gap-4">
      <AppText v-show="filmIsWatched" variant="h1">
        <AppIcon class="" title="Просмотрено" icon-name="eye" />
      </AppText>

      <AppText v-show="filmIsExist" variant="h1">
        <AppIcon class="icon" title="Добавлен в список" icon-name="circle-check" />
      </AppText>
    </div>
  </div>
</template>

<style scoped>
.icon {
  color: var(--brand-first);
}
</style>
