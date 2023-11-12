<script setup lang="ts">
type LoaderSize = 'sm' | 'md' | 'lg';
const props = defineProps<{size?: LoaderSize}>();
</script>

<template>
  <div class="loader" :class="props.size">
    <div class="spinner-1 animate-spin"></div>
    <div class="spinner-2 animate-spin"></div>
  </div>
</template>

<style scoped lang="scss">
.loader {
  --border-width: .15em;
  position: relative;
  width: 1em;
  height: 1em;
  
  .spinner-1 {
    font-size: inherit;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: solid var(--border-width) var(--brand-second);
    clip: rect(auto, .66em, auto, 0.33em);
    position: absolute;
    top: 0;
    left: 0;
  }

  .spinner-2 {
    font-size: inherit;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: solid var(--border-width) var(--brand-first);
    clip: rect(0.33em, auto, .66em, auto);
    position: absolute;
    top: 0;
    left: 0;
  }
}

.sm {
  font-size: 13pt;
}

.md {
  font-size: 23pt;
}

.lg {
  font-size: 43pt;
}
</style>
