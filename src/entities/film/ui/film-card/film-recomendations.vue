<script setup lang="ts">
import { AppText, AppIcon, BadgeWW, AppLoader } from '~/shared/ui';
import { FilmService } from './service';

const service = inject('filmService') as FilmService;
const recommendations = service.recommendations;
const loading = ref(false);

onMounted(async () => {
  if (!recommendations) return;
  loading.value = true;
  await recommendations.fetch();
  
  loading.value = false;
})
</script>

<template>
  <div v-if="recommendations" class="w-full flex gap-4 overflow-x-auto overflow-y-hidden py-1">
    <div v-if="loading" class="flex justify-center">
      <AppLoader size="md" />
    </div>
    <template v-else>
      <AppText v-if="!recommendations.asyncData?.results.length" variant="simple" class="mt-6">Рекоммендаций нет</AppText>
      <RouterLink
        v-else
        v-for="movie of recommendations.asyncData.results"
        :to="{
          path: '/',
          query: {
            type: movie.media_type,
            id: movie.id,
          }
        }"
        class="flex gap-2 flex-col flex-shrink-0 flex-grow-0"
      >
        <img :src="`${service.EXPORT_URL}/w200${movie.poster_path}`" class="object-cover rounded-lg h-[100px]" />
        {{ movie.title }}
      </RouterLink>
    </template>
  </div>
</template>
