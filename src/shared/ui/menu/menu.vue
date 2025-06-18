<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';

const open = ref(false);
const wrapper = ref<HTMLElement | null>(null);

const toggleMenu = () => open.value = !open.value;

const closeMenu = (e: any) => {
  if (wrapper.value && !wrapper.value.contains(e.target) ) {
    open.value = false;
  }
}

onMounted(() => document.addEventListener('mousedown', closeMenu));

onBeforeUnmount(() => document.removeEventListener('mousedown', closeMenu));
</script>

<template>
  <div class="menu-wrapper" ref="wrapper">
    <slot name="trigger" :toggle="toggleMenu" :open="open"></slot>
    <div
      v-show="open"
      class="menu"
      ref="menu"
      @click.stop
    >
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.15s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
