<script setup lang="ts">
const props = defineProps<{
  modelValue?: string;
  name?: string;
}>();
defineEmits(['update:modelValue']);
</script>

<template>
  <input
    class="px-3 py-2 bg-zinc-300 rounded-lg w-full"
    :name="name"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target?.value)"
  />
</template>

<style scoped lang="scss">
input {
  border: none;
  color: black;

  &:focus {
    outline: none;
  }
}
</style>
