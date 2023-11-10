<script setup lang="ts">
import { AppLogo, AppText } from '~/shared/ui';
import { GoogleLoginFC, LogoutFC } from '~/features/auth';
import { useAuthState } from '~/entities/auth';

const authState = useAuthState();
</script>

<template>
  <div class="header-container flex justify-between py-2 px-4 rounded-b-lg w-full">
    <div class="max-w-1/2">
      <AppLogo />
    </div>
    <div class="flex flex-row gap-6">
      <NuxtLink to="/" activeClass="active-link">
        <AppText variant="simple">Search</AppText>
      </NuxtLink>
      <NuxtLink to="/my-films" activeClass="active-link">
        <AppText variant="simple">My films</AppText>
      </NuxtLink>
    </div>
    <div class="max-w-1/2 text-right">
      <GoogleLoginFC v-if="!authState.authorazed" />
      <div v-if="authState.authorazed" class="flex justify-end items-center gap-2" >
        <span>{{ authState.userInfo.given_name }}</span>
        <img class="h-6" :src="authState.userInfo.picture" />
        <LogoutFC />
      </div>
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
