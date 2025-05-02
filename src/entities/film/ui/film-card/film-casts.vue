<script setup lang="ts">
import ImgResize from '~/shared/ui/img-resize.vue';
import InfoPair from './info-pair.vue';
import { FilmService } from './service';

const service = inject('filmService') as FilmService;

const {film} = service;
</script>

<template>
  <div v-if="film" class="max-md:order-2 grid md:grid-cols-2 grid-cols-1 gap-x-28 gap-y-4">
    <div v-for="cast of film.credits.cast" :key="cast.id"
      class="flex gap-2 rounded-md bg-transparent transition hover:bg-zinc-950"
    >
      <ImgResize
        :src="`${service.EXPORT_URL}/w200${cast.profile_path}`"
        width="50" 
        class="object-cover rounded-lg max-md:w-full"
      />
      <div class="flex flex-col">
        <InfoPair property="Персонаж" :value="cast.character" />
        <InfoPair property="Актер" :value="`${cast.original_name} (${cast.name})`" />
      </div>
    </div>
  </div>
</template>
