<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    color?: string
  }>(),
  {
    color: 'zinc-300'
  }
);
</script>

<template>
  <button
    :class="[
      'button-app',
      `bg-${props.color}`,
      'px-1',
      'py-2',
      'rounded-lg',
      'w-full',
      'relative',
      'text-zinc-800',
      'font-bold'
    ]">
    <slot ></slot>
  </button>
</template>

<style scoped lang="scss">
.button-app {

  &:focus {
    outline: none;
  }

  &:hover::before {
    content: '';
    position: absolute;
    top: 1px;
    bottom: 1px;
    left: 1px;
    right: 1px;
    width: calc(100% - 2px);
    height: calc(100% - 2px);
    background: #000;
    mix-blend-mode: multiply;
    opacity: .2;
    border-radius: inherit;
  }
}
</style>
