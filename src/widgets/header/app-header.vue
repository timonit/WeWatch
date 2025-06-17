<script setup lang="ts">
import { AppLogo, AppText } from '~/shared/ui';
import { GoogleLoginFC, LogoutFC } from '~/features/auth';
import { useAuthState } from '~/entities/auth';
import { Menu } from '~/shared/ui';

const authState = useAuthState();
</script>

<template>
  <div class="header-container flex justify-between py-2 px-4 rounded-b-lg w-full">
    <div class="max-w-1/2">
      <AppLogo />
    </div>
    <div class="flex flex-row gap-6">
      <NuxtLink to="/" activeClass="active-link">
        <AppText variant="simple">Поиск</AppText>
      </NuxtLink>
      <NuxtLink v-if="authState.authorized" to="/my-films" activeClass="active-link">
        <AppText variant="simple">Список</AppText>
      </NuxtLink>
    </div>
    <div class="max-w-1/2 flex justify-end text-right">
      <GoogleLoginFC v-if="!authState.authorized" />
      <Menu v-if="authState.authorized" class="flex justify-end items-center gap-2" >
        <template #trigger="{ open, toggle }">
          <button class="cursor-pointer" slot="trigger" @click="toggle">
            <img class="h-6" :src="authState.userInfo.picture" />
          </button>
        </template>
        <Transition>
          <div class="flex flex-col overflow-hidden absolute origin-top-right right-0 translate-y-1 rounded-md bg-white text-stone-950">
            <div class="py-1 px-3 bg-gray-100 flex items-center">
              <span>{{ authState.userInfo.given_name }}</span>
            </div>
            <hr class="border-gray-200" />
            <div class="py-2 px-3 flex items-center">
              <LogoutFC class="cursor-pointer"/>
            </div>
          </div>
        </Transition>
      </Menu>
      <slot name="rightSide"></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.header-container {
  background-color: var(--bg-secondary);
  box-shadow: 0 5px 5px -3px rgba($color: #000000, $alpha: 0.5);
}

.active-link {
  color: var(--brand-first);
  border-bottom: solid 2px var(--brand-first);
}
</style>
