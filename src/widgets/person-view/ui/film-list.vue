<script setup lang="ts">
import type { MovieSearchResultItem } from '~/entities/film/types/search-result';
import { EXPORT_URL } from '../model/constants';

const props = defineProps<{films: MovieSearchResultItem[]}>();
</script>

<template>
  <div class="w-full flex flex-wrap gap-7 overflow-x-auto overflow-y-hidden py-1">
    <RouterLink
      v-for="movie of films"
      :to="{
        path: '/',
        query: {
          type: 'movie',
          id: movie.id,
        }
      }"
      :title="movie.title"
      class="flex gap-2 flex-col flex-wrap w-[80px] overflow-hidden"
    >
      <img :src="`${EXPORT_URL}/w200${movie.poster_path}`" class="object-cover rounded-lg" />
      <span class="truncate">{{ movie.title }}</span>
    </RouterLink>
  </div>
</template>
