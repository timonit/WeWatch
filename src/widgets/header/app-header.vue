<script setup lang="ts">
import AppLogo from '~/shared/ui/logo/app-logo.vue';

</script>

<template>
  <div class="header-container flex py-2 px-4 rounded-b-lg w-full">
    <div class="w-1/2">
      <AppLogo />
    </div>
    <div class="w-1/2 text-right">
      login
    </div>
  </div>
</template>

<style scoped lang="scss">
.header-container {
  background-color: var(--bg-secondary);
  box-shadow: 0 5px 5px -3px rgba($color: #000000, $alpha: 0.5);
}
</style>
