<script setup lang="ts">
import { AppSelectList } from '~/shared/ui';
import { type ResultItem } from './types';

const router = useRouter();
const props = defineProps<{list: ResultItem[]}>();
const emit = defineEmits<{
  (e: 'selected', film: ResultItem): void
}>();

const selected = ref<ResultItem | undefined>();
const select = (item: ResultItem) => selected.value = item;
const go = (item: ResultItem) => {
  emit('selected', item);
  router.push({ path: '/', query: { id: item.id, type: item.media_type } });
}

const tooltip = ref();
</script>

<template>
  <AppSelectList :list="props.list">
    <template #item="item">
      <li
        v-tooltip:right-start="tooltip"
        class="px-3 py-2 mr-2 rounded-lg select-none"
        :class="{ active: Number($route.query.id) === Number(item.id) }"
        :to="{ path: '/', query: {id: item.id} }"
        @click="go(item)"
        @mouseenter="select(item)"
      >
        {{ item.title || item.name }} ({{ new Date(item.release_date || item.first_air_date).getFullYear() }})
      </li>
    </template>
  </AppSelectList>
  <div class="invisible bg-gray-600 rounded-lg px-3 py-2 absolute w-max max-md:hidden" ref="tooltip">
    <div v-if="selected" class="flex flex-col">
      <span>{{ selected.title }}</span>
      <p class="mt-2 text-[0.8em] whitespace-break-spaces indent-2 text-ellipsis w-60 max-h-60 overflow-clip">{{ selected.overview }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
li {
  cursor: pointer;
  font-size: .8em;
  transition: background-color 0.2s ease-in-out;

  &.active {
    background-color: rgba($color: #000, $alpha: 0.2);
  }

  &:hover {
    background-color: rgba($color: #000, $alpha: 0.3);
  }
}
</style>
