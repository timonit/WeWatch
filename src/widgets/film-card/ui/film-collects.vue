<script setup lang="ts">
import { AppText, AppLoader } from '~/shared/ui';
import { FilmService } from '../model';

const service = inject('filmService') as FilmService;
const collects = service.collects;
const loading = ref(false);

onMounted(async () => {
  if (!collects) return;
  loading.value = true;
  await collects.fetch();
  
  loading.value = false;
});
</script>

<template>
  <div v-if="collects" class="w-full flex gap-4 overflow-x-auto overflow-y-hidden py-1">
    <div v-if="loading" class="flex justify-center">
      <AppLoader size="md" />
    </div>
    <template v-else>
      <AppText v-if="!collects.data?.parts.length" variant="simple" class="mt-6">...иквелов нет</AppText>
      <RouterLink
        v-else
        v-for="movie of collects.data?.parts"
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
