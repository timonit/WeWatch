<script setup lang="ts">
import { reactive } from '#imports';

const defaultColor = [ 'danger', 'success', 'warning' ];
type BadgeColor = string | typeof defaultColor[number];

const props = defineProps<{color: BadgeColor}>();

const classes = reactive({
  'bg-red-600': props.color === 'danger',
  'bg-green-600': props.color === 'success',
  'bg-orange-600': props.color === 'warning',
  [props.color]: defaultColor.includes(props.color),
});
</script>

<template>
  <div :class="classes" class="flex justify-center items-center rounded-full h-min w-min px-[1em]">
    <slot></slot>
  </div>
</template>
