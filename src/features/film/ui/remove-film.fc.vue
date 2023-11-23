<script setup lang="ts">
import { AppTool, AppIcon, AppLoader } from '~/shared/ui';
import { Film } from '~/entities/film';
import { RemoveFilmFeature } from '../model';
import { useAuthState } from '~/entities/auth';

const props = defineProps<{film: Film}>();
const isLoading = ref(false);

const featureAdd = new RemoveFilmFeature
const handler = async () => {
  isLoading.value = true;
  await featureAdd.execute(props.film.id);
  isLoading.value = false;
}
const auth = useAuthState();
</script>

<template>
  <AppTool v-if="auth.authorized" :tool="{name: 'Remove film', handler}" >
    <template #icon>
      <AppLoader v-if="isLoading" />
      <AppIcon v-else icon-name="circle-remove" />
    </template>
  </AppTool>
</template>
