<script setup lang="ts">
import { useNotify } from './useNotify';
import NotifyItem from './notify-item.vue';

const { state, remove } = useNotify();

const msgs = toRef(state);

const onClose = (id: number) => remove(id);
</script>

<template>
  <div class="fixed mb-2 bottom-0 left-0 right-0">
    <NotifyItem v-for="item in msgs" :msg="item.message" :id="item.id" @close="onClose" />
  </div>
</template>
