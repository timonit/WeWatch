<script setup lang="ts">
import { AppText } from '@/shared/ui';
import { FilmService } from './service';

const service = inject('filmService') as FilmService;
const EXPORT_URL = 'https://image.tmdb.org/t/p';
const {film} = service;
</script>

<template>
  <div class="main-block flex my-2 max-md:flex-wrap" v-if="film">
    <img :src="`${EXPORT_URL}/w200${film.poster_path}`" width="200" height="200" class="object-cover rounded-lg max-md:w-full" />
    <div class="md:pl-4">
      <AppText variant="h5">{{ film.tagline }}</AppText>
      <AppText variant="paragraph">{{ film.overview }}</AppText>
    </div>
  </div>
</template>
