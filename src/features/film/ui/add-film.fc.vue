<script setup lang="ts">
import { AppTool, AppIcon, AppLoader } from '~/shared/ui';
import { AddFilmFeature } from '../model';
import { Film } from '~/entities/film';
import { useAuthState } from '~/entities/auth';

const props = defineProps<{film: Film}>();
const isLoading = ref(false);

const featureAdd = new AddFilmFeature();
const handler = async () => {
  isLoading.value = true;
  await featureAdd.execute(props.film.id, props.film.title)
  isLoading.value = false;
}
const auth = useAuthState();
</script>

<template>
  <AppTool v-if="auth.authorized" :tool="{ handler, name: 'Add film' }" >
    <template #icon>
      <AppLoader v-if="isLoading" />
      <AppIcon v-else icon-name="circle-add" />
    </template>
  </AppTool>
</template>
