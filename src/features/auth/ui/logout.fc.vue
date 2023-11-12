<script setup lang="ts">
import { LogoutFeature } from '../model/logout.feature';

const logoutHandler = () => {
  const logoutFeature = new LogoutFeature();
  logoutFeature.execute();
  const router = useRouter();
  router.push('/');
}
</script>

<template>
  <button @click="logoutHandler">logout</button>
</template>
