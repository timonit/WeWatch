<script setup lang="ts">
import { AddFilmFC, RemoveFilmFC } from '~/features/film';
import { AppToolbar } from '~/shared/ui';

import { FilmService } from './service';

const service = inject('filmService') as FilmService;
const {film} = service;
</script>

<template>
  <AppToolbar class="mt-4" v-if="film">
      <AddFilmFC v-if="!service.filmIsExist" :film="film" :type="service.mediaType.value" @executed="service.updateExist" />
      <RemoveFilmFC v-if="service.filmIsExist" :film="film" @executed="service.updateExist" />
    </AppToolbar>
</template>
