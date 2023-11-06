<script setup lang="ts">
import InitAuthTokens from '~/features/auth/ui/init-auth-tokens.vue';

onBeforeMount(async () => {
  // переходим и запрещаем переходить назад на авторизационную страницу
  history.replaceState({current: '/'}, '', 'http://localhost:5173');
  navigateTo('/');
});
</script>

<template>
  <NuxtLayout name="empty">
    <InitAuthTokens />
  </NuxtLayout>
</template>
