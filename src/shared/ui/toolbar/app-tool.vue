<script setup lang="ts">
import { AppText } from '..';
import type { ITool } from './types';
const props = defineProps<{tool: ITool}>();
</script>

<template>
  <div
    @click="props.tool.handler"
    class="py-1 px-3 border-b-[1px] border-transparent cursor-pointer rounded-lg tool-container divide-x-8 divide-transparent flex items-center"
  >
    <slot name="icon"></slot>
    <AppText variant="simple">
      {{ props.tool.name }}
    </AppText>
  </div>
</template>

<style scoped>
.tool-container:hover {
  background: rgb(30, 50, 50);;
}

.tool-container {
  background: var(--bg-secondary);
}
</style>
