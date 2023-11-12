<script setup lang="ts">
import { AppText } from '~/shared/ui';

const props = defineProps<{property: string; value: string | number}>();
</script>

<template>
  <div class="my-1 flex gap-2">
    <AppText variant="bold" size="sm">{{ props.property }}: </AppText>
    <AppText variant="simple" size="sm">{{ props.value }}</AppText>
  </div>
</template>

<style scoped lang="scss">
</style>
