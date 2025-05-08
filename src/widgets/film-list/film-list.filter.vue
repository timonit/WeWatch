<script setup lang="ts">
import { FilterFields } from './types';

const state = defineModel<FilterFields>({ required: true });

const changeState = (key: keyof FilterFields, value: any) => {
  state.value = {...state.value, [key]: value};
}
</script>

<template>
  <div class="flex flex-col">
    <div class="flex gap-4 border-b px-3 py-1">
      <input type="checkbox" @input="changeState('hideWatched', $event.target.checked)" :value="state.hideWatched" />
      <span>hide watched</span>
    </div>
  </div>
</template>
