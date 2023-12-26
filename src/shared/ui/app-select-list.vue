<script setup lang="ts">
const props = defineProps<{list?: any[]; keyTitle?: string}>();
const emit = defineEmits<{(e: 'selected', film: any): void}>();

// type ListItemType = typeof props.list[number];
const key = props.keyTitle || 'title';
</script>

<template>
  <ul class="flex flex-col overflow-auto">
    <template v-if="$slots.default">
      <slot></slot>
    </template>

    <template v-if="list">
      <li
        v-for="item of props.list"
        class="px-3 py-2 mr-2 rounded-lg"
        @click="emit('selected', item)"
        :title="item[key]"
      >
        {{ item[key] }}
      </li>
    </template>
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
