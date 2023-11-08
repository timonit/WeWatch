<script setup lang="ts">
import { AppTool, AppIcon } from '~/shared/ui';
import { AddFilmFeature } from '../model';
import { Film } from '~/entities/film';

const props = defineProps<{film: Film}>();

const featureAdd = new AddFilmFeature();
const handler = () => {
  featureAdd.execute(props.film.id, props.film.title)
}
</script>

<template>
  <AppTool :tool="{ handler, name: 'Add film' }" >
    <template #icon>
      <AppIcon icon-name="circle-add" />
    </template>
  </AppTool>
</template>
