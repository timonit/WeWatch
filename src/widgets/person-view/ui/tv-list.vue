<script setup lang="ts">
import type { TVSearchResultItem } from '~/entities/film/types/search-result';
import { EXPORT_URL } from '../model/constants';

const props = defineProps<{films: TVSearchResultItem[]}>();
</script>

<template>
  <div class="w-full flex flex-wrap gap-7 overflow-x-auto overflow-y-hidden py-1">
    <RouterLink
      v-for="movie of films"
      :to="{
        path: '/',
        query: {
          type: 'tv',
          id: movie.id,
        }
      }"
      :title="movie.name"
      class="flex gap-2 flex-col flex-wrap w-[80px] overflow-hidden"
    >
      <img :src="`${EXPORT_URL}/w200${movie.poster_path}`" class="object-cover rounded-lg" />
      <span class="truncate">{{ movie.name }}</span>
    </RouterLink>
  </div>
</template>
