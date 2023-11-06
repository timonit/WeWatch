<script setup lang="ts">
import { InitAuthTokensFC } from '~/features/auth';

onBeforeMount(async () => {
  // переходим и запрещаем переходить назад на авторизационную страницу
  history.replaceState({current: '/'}, '', 'http://localhost:5173');
  navigateTo('/');
});
</script>

<template>
  <NuxtLayout name="empty">
    <InitAuthTokensFC />
  </NuxtLayout>
</template>
