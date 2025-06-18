<script setup lang="ts">
import { AppHeader } from '~/widgets';
import { AppSlideOver, AppText } from '~/shared/ui';
import { AppLoader } from '~/shared/ui';
import { app } from '~/app/model/app';
import { Bars3Icon } from '@heroicons/vue/24/solid';
import { useControlSide } from './useControlSide';
import { useNotify } from '../notify';

const props = defineProps<{headerSideTriggerShow?: boolean}>()
const controlerSide = useControlSide();
const { notify } = useNotify();

const isOpened = toRef(controlerSide.isOpened);
const isInited = toRef(app.isInited);
const isOpen = ref(false);

onBeforeMount(async () => {
  if (app.status.value !== 'inited') await app.init();
  if (innerWidth && innerWidth < 768) isOpen.value = true;
  
  if (!localStorage.getItem('warn')) {
    notify(`На сайте не нужно регистрироваться, вход на сайт происходит с помощью google аккаунта.
      При входе приложение просит доступ в google диск, там приложение будет хранить ваши фильмы.
      Если вы хотите очистить все данные, вы можете зайти на свой диск, найти папку WeWatch и удалить все содержимое`);
    localStorage.setItem('warn', 'true');
  }
});
</script>

<template>
   <div v-if="!isInited" class="fixed top-0 left-0 w-screen h-screen flex flex-col justify-center items-center">
     <AppLoader size="lg" />
     <AppText class="mt-4" variant="bold" v-if="app.status.value !== 'inited'">{{ app.status.value }}</AppText>
     <AppText class="mt-2" variant="bold" v-else>Приложение успешно инициализировано</AppText>
  </div>
  <div v-else class='layout-container w-3/3 flex flex-col gap-4 px-2 min-h-screen'>
    
    <header>
      <AppHeader>
        <template #rightSide v-if="props.headerSideTriggerShow && $slots.side">
          <button
            type="button"
            class="md:hidden relative ml-4 rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
            @click="controlerSide.open"
          >
            <slot name="sideTriggerTitle">
              <Bars3Icon class="h-5 w-5" aria-hidden="true" />
            </slot>
          </button>
        </template>
      </AppHeader>
    </header>
    
    <div class="flex flex-row w-full max-md:flex-col min-h-[80vh] h-full">
      <template v-if="$slots.side">
        <aside class="md:hidden">
          <AppSlideOver :open="isOpened" @update:open="(isOpen: boolean) => {isOpen ? controlerSide.open() : controlerSide.close()}">
            <slot name="side"></slot>
          </AppSlideOver>
        </aside>
        <aside class="max-md:hidden md:w-[280px] h-fit max-h-[80vh] p-4 rounded-md overflow-hidden box-border flex-shrink-0">
          <slot name="side"></slot>
        </aside>
      </template>
      
      <main class="md:w-[calc(100%-280px)] px-4 rounded-md">
        <slot></slot>
      </main>
      
    </div>

    <footer class="flex flex-col flex-wrap justify-center gap-2 items-center py-2 text-[0.9rem]">
        <a href="https://github.com/timonit/watchkino" target="_blank">
          <img src="@/shared/assets/github-logo.svg" class="h-7 w-auto" />
        </a>
      <NuxtLink to="/rights" class="text-blue-200">
        <AppText variant="bold">жалобы/предложения</AppText>
      </NuxtLink>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
aside {
  background-color: var(--bg-secondary);
  box-shadow: 0 5px 5px -3px rgba($color: #000000, $alpha: 0.5);
}
</style>
