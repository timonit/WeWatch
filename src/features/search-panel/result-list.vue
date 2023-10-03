<script setup lang="ts">
import { Film } from '~/entities/film';

const props = defineProps<{list: Film[]}>();
const emit = defineEmits<{
  (e: 'selected', film: Film): void
}>();
</script>

<template>
  <ul class="flex flex-col overflow-auto h-full">
    <li
      v-for="item of props.list"
      class="px-3 py-2 mr-2 rounded-lg"
      @click="$emit('selected', item)"
      :title="item.title"
    >
      {{ item.title }}
    </li>
  </ul>
</template>

<style scoped lang="scss">
li {
  cursor: pointer;

  &:hover {
    background-color: rgba($color: #000, $alpha: 0.2);
  }
}
</style>
