<script setup lang="ts">
import { AppText, AppIcon, BadgeWW } from '~/shared/ui';

const props = defineProps<{
  title: string,
  collapsed: boolean,
}>();

const emit = defineEmits<{(e: 'update:collapsed', val: boolean): void}>();
</script>

<template>
  <div class="w-full">
    <AppText variant="h6" class="mt-6">
      <BadgeWW class="text-sm inline-flex cursor-pointer mr-2 align-text-top" color="warning" @click="emit('update:collapsed', !props.collapsed)">
        <AppIcon v-show="props.collapsed" class="icon" title="Добавлен в список" icon-name="chevron-down" />
        <AppIcon v-show="!props.collapsed" class="icon" title="Добавлен в список" icon-name="chevron-up" />
      </BadgeWW>
      {{ props.title }}
    </AppText>
    <div class="flex" v-if="!props.collapsed">
      <slot></slot>
    </div>
  </div>
</template>
