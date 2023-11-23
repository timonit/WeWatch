<script setup lang="ts">
import { AppHeader } from '~/widgets';
import { AppSlideOver, AppText } from '~/shared/ui';
import { AppLoader } from '~/shared/ui';
import { app } from '~/app/model/app';
import { Bars3Icon } from '@heroicons/vue/24/solid';
import { useControlSide } from './useControlSide';

const controlerSide = useControlSide();
const isOpened = toRef(controlerSide.isOpened);

const isInited = toRef(app.isInited);
const isOpen = ref(false);
onBeforeMount(async () => {
  if (app.status.value !== 'inited') await app.init();
  if (innerWidth && innerWidth < 768) isOpen.value = true;
});
</script>

<template>
   <div v-if="!isInited" class="fixed top-0 left-0 w-screen h-screen flex justify-center items-center">
    <AppLoader size="lg" />
  </div>
  <div v-else class='layout-container w-3/3 flex flex-col gap-4 px-2 relative h-screen'>
    
    <header>
      <AppHeader>
        <template #rightSide>
          <button
            type="button"
            class="md:hidden relative ml-4 rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
            @click="controlerSide.open"
          >
            <Bars3Icon class="h-5 w-5" aria-hidden="true" />
          </button>
        </template>
      </AppHeader>
    </header>
    
    <div class="flex flex-row w-full max-md:flex-col">
      <aside class="md:hidden">
        <AppSlideOver :open="isOpened" @update:open="(isOpen: boolean) => {isOpen ? controlerSide.open() : controlerSide.close()}">
          <slot name="side"></slot>
        </AppSlideOver>
      </aside>
      <aside class="max-md:hidden md:w-[280px] max-h-[80vh] p-4 rounded-md overflow-hidden box-border border flex-shrink-0">
        <slot name="side"></slot>
      </aside>
      <main class="w-full px-4 rounded-md">
        <slot></slot>
      </main>
    </div>

    <footer class="sm:relative md:fixed mx-auto inset-x-0 bottom-0 flex justify-center gap-6 items-center py-2 text-[0.9rem]">
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
