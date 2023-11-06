<script setup lang="ts">
import { ref } from '#imports';
import { Film } from '~/entities/film';

const props = defineProps<{list: Film[]}>();
const emit = defineEmits<{
  (e: 'selected', film: Film): void
}>();

const selected = ref<Film | undefined>();
const select = (item: Film) => selected.value = item;

const tooltip = ref();
</script>

<template>
  <ul class="flex flex-col overflow-auto h-full" ref="ul">
    <li
      v-tooltip:right-start="tooltip"
      v-for="item of props.list"
      class="px-3 py-2 mr-2 rounded-lg"
      @click="emit('selected', item)"
      @mouseenter="select(item)"
    >
      {{ item.title }} ({{ new Date(item.release_date).getFullYear() }})
    </li>
    <div class="invisible bg-gray-600 rounded-lg px-3 py-2 absolute w-max" ref="tooltip">
      <div v-if="selected" class="flex flex-col ">
        <span>{{ selected.title }}</span>
        <p class="mt-2 text-[0.8em] whitespace-break-spaces indent-2 text-ellipsis w-60 max-h-60 overflow-clip">{{ selected.overview }}</p>
      </div>
    </div>
  </ul>
</template>

<style scoped lang="scss">
li {
  cursor: pointer;
  font-size: .8em;

  &:hover {
    background-color: rgba($color: #000, $alpha: 0.2);
  }
}
</style>
