<script setup lang="ts">
import { AppTool } from '~/shared/ui';
import { Film } from '~/entities/film';
import { RemoveFilmFeature } from '../model';

const props = defineProps<{film: Film}>();

const featureAdd = new RemoveFilmFeature
const handler = () => {
  featureAdd.execute(props.film.id)
}
</script>

<template>
  <AppTool :tool="{name: 'Remove film', handler}" />
</template>
