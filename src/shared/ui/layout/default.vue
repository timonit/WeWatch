<script setup lang="ts">
import { app } from '~/app/model/app';
import AppHeader from '~/widgets';
</script>

<template>
  <div class='layout-container w-3/3 flex flex-col gap-4 px-2'>
    
    <header>
      <AppHeader />
    </header>
    
    <div class="flex flex-row w-full max-md:flex-col">
      <aside class="md:w-[280px] max-h-[80vh] p-4 rounded-md overflow-hidden box-border border flex-shrink-0">
        <slot name="side"></slot>
      </aside>
      <main class="w-full px-4 rounded-md">
        <slot></slot>
      </main>
    </div>
  </div>
</template>

<style lang="scss">
aside {
  background-color: var(--bg-secondary);
  box-shadow: 0 5px 5px -3px rgba($color: #000000, $alpha: 0.5);
  border-color: var(--border-color-secondary);
}
</style>
