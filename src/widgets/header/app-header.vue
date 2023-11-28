<script setup lang="ts">
import { AppLogo, AppText } from '~/shared/ui';
import { GoogleLoginFC, LogoutFC } from '~/features/auth';
import { useAuthState } from '~/entities/auth';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';

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
        <AppText variant="simple">Мои фильмы</AppText>
      </NuxtLink>
    </div>
    <div class="max-w-1/2 flex justify-end text-right">
      <GoogleLoginFC v-if="!authState.authorized" />
      <Menu as="div" v-if="authState.authorized" class="flex justify-end items-center gap-2" >
        <MenuButton>
          <img class="h-6" :src="authState.userInfo.picture" />
        </MenuButton>
        <Transition>
          <MenuItems class="flex flex-col absolute p-3 origin-top-right translate-y-full divide-y rounded-md bg-white shadow-lg text-stone-950">
            <MenuItem>
              <span>{{ authState.userInfo.given_name }}</span>
            </MenuItem>
            <MenuItem>
              <LogoutFC />
            </MenuItem>
          </MenuItems>
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
