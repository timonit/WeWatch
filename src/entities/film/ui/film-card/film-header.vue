<script setup lang="ts">
import { FilmService } from './service';
import { AppText, AppIcon } from '~/shared/ui';

const service = inject('filmService') as FilmService;
const { film, filmIsExist } = service;
</script>

<template>
  <div class="film-header flex justify-between items-start" v-if="film">
    <AppText variant="h1">{{ film.title || film.name }}</AppText>
    <AppText v-show="filmIsExist" variant="h1">
      <AppIcon class="icon" title="Добавлен в список" icon-name="circle-check" />
    </AppText>
  </div>
</template>

<style scoped>
.icon {
  color: var(--brand-first);
}
</style>
