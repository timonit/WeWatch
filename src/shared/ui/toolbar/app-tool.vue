<script setup lang="ts">
import { AppText } from '..';
import { ITool } from './types';

const props = defineProps<{tool: ITool}>();
</script>

<template>
  <div
    @click="props.tool.handler"
    class="py-1 px-3 border-b-[1px] border-transparent cursor-pointer rounded-lg tool-container"
  >
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
