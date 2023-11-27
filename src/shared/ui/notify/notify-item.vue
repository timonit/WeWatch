<script setup lang="ts">
import { AppText } from '..';
import AppIcon from '../app-icon.vue';

const props = defineProps<{msg: string; id: number}>()
const emit = defineEmits<{(e: 'close', id: number): void}>();
</script>

<template>
  <div>
    <div class="p-4 bg-slate-300 text-slate-950 flex">
      <AppText variant="paragraph" class="grow text-center">
        {{ props.msg }}
      </AppText>
      <div class="flex items-start">
        <button @click="emit('close', props.id)" class="p-2">
          <AppIcon icon-name="close" />
        </button>
      </div>
    </div>
  </div>
</template>
