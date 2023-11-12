<script setup lang="ts">
const props = defineProps<{iconName: string}>();
</script>

<template>
  <i :class="`mi-${props.iconName}`" ></i>
</template>
