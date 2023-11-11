<script setup lang="ts">
import { AppHeader } from '~/widgets';
import { AppText } from '~/shared/ui';
import { AppLoader } from '~/shared/ui';
import { app } from '~/app/model/app';

const isInited = toRef(app.isInited);

onBeforeMount(async () => {
  if (app.status.value !== 'inited') await app.init();
});
</script>

<template>
   <div v-if="!isInited" class="fixed w-screen h-screen flex justify-center items-center">
    <AppLoader size="lg" />
  </div>
  <div v-else class='layout-container w-3/3 flex flex-col gap-4 px-2 relative h-screen'>
    
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

    <footer class="fixed mx-auto inset-x-0 bottom-0 flex justify-center gap-6 items-center py-2 text-[0.9rem]">
      <AppText variant="bold">by timonit</AppText>
      <a href="https://github.com/timonit/watchkino" target="_blank">
        <img src="@/shared/assets/github-logo.svg" class="h-7 w-auto" />
      </a>
    </footer>
  </div>
</template>

<style lang="scss">
aside {
  background-color: var(--bg-secondary);
  box-shadow: 0 5px 5px -3px rgba($color: #000000, $alpha: 0.5);
  border-color: var(--border-color-secondary);
}
</style>
