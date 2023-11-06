<script setup lang="ts">
import AppLogo from '~/shared/ui/logo/app-logo.vue';
import GoogleLogin from '@/features/auth/ui/google-login.vue';
import { useAuthState } from '~/entities/auth/model/auth.state';
import LogoutFc from '~/features/auth/ui/logout.fc.vue';

const authState = useAuthState();
</script>

<template>
  <div class="header-container flex py-2 px-4 rounded-b-lg w-full">
    <div class="w-1/2">
      <AppLogo />
    </div>
    <div class="w-1/2 text-right">
      <GoogleLogin v-if="!authState.authorazed" />
      <div v-if="authState.authorazed" class="flex justify-end items-center gap-2" >
        <span>{{ authState.userInfo.given_name }}</span>
        <img class="h-6" :src="authState.userInfo.picture" />
        <LogoutFc />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.header-container {
  background-color: var(--bg-secondary);
  box-shadow: 0 5px 5px -3px rgba($color: #000000, $alpha: 0.5);
}
</style>
