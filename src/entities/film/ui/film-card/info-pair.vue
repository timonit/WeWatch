<script setup lang="ts">
import AppText from '~/shared/ui/typography/app-text.vue';

const props = defineProps<{property: string; value: string | number}>();
</script>

<template>
  <div>
    <div>
      <AppText variant="bold" size="sm">{{ props.property }}: </AppText>
      <AppText variant="simple" size="sm">{{ props.value }}</AppText>
    </div>
  </div>
</template>
