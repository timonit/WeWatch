<script setup lang="ts">
import { AppTool, AppIcon } from '~/shared/ui';
import { Film } from '~/entities/film';
import { RemoveFilmFeature } from '../model';

const props = defineProps<{film: Film}>();

const featureAdd = new RemoveFilmFeature
const handler = () => {
  featureAdd.execute(props.film.id)
}
</script>

<template>
  <AppTool :tool="{name: 'Remove film', handler}" >
    <template #icon>
      <AppIcon icon-name="circle-remove" />
    </template>
  </AppTool>
</template>
