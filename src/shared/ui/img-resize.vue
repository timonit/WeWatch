<script setup lang="ts">
type Props = {
  src: string;
  width?: string | number;
}

const props = defineProps<Props>();

const hover = ref(false);
</script>

<template>
  <div class="relative aspect-[2/3] object-cover" :style="{ width: `${width}px` }">
    <div
      class="absolute transition hover:z-10 hover:scale-150 hover:shadow-md"
      @mouseenter="hover = true"
      @mouseleave="hover = false"
    >
      <img :src="src" class="rounded-md" />
    </div>
  </div>
</template>
