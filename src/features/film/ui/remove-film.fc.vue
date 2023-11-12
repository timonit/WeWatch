<script setup lang="ts">
import { AppTool, AppIcon, AppLoader } from '~/shared/ui';
import { Film } from '~/entities/film';
import { RemoveFilmFeature } from '../model';

const props = defineProps<{film: Film}>();
const isLoading = ref(false);

const featureAdd = new RemoveFilmFeature
const handler = async () => {
  isLoading.value = true;
  await featureAdd.execute(props.film.id);
  isLoading.value = false;
}
</script>

<template>
  <AppTool :tool="{name: 'Remove film', handler}" >
    <template #icon>
      <AppLoader v-if="isLoading" />
      <AppIcon v-else icon-name="circle-remove" />
    </template>
  </AppTool>
</template>
