<script setup lang="ts">
import { AddFilmFC, RemoveFilmFC, WatchedToggleFc } from '~/features/film';
import { AppToolbar } from '~/shared/ui';

import { FilmService } from '../model';

const service = inject('filmService') as FilmService;
const { film, filmIsExist } = service;
</script>

<template>
  <AppToolbar class="mt-4 gap-2" v-if="film">
    <AddFilmFC v-if="!filmIsExist" :film="film" :type="service.mediaType.value" @executed="service.updateExist" />
    <RemoveFilmFC v-if="filmIsExist" :film="film" @executed="service.updateExist" />
    <WatchedToggleFc :film="film" />
  </AppToolbar>
</template>
