<script setup lang="ts">
import { AddFilmFeature } from '../model';

const props = defineProps<{filmID: number}>();

const featureAdd = new AddFilmFeature();
</script>

<template>
  <button
    @click="featureAdd.execute(props.filmID)"
    class="p-2 bg-gray-500"
  >
    Add film
  </button>
</template>
