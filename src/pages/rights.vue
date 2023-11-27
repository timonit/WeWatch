<script setup lang="ts">
import { AppText } from '~/shared/ui'; 
</script>

<template>
  <NuxtLayout>
    <AppText variant="h5">
      Жалобы и предложения
    </AppText>
     
    <p>
      Наш email для обработки жалоб и предложений:
      timondevts@gmail.com
    </p>
    
    <p>
      Весь размещенный на сайте материал представляет собой контент, находящийся в свободном доступе для скачивания и просмотра в сети Интернет.
    </p>
  </NuxtLayout>
</template>

<style scoped>
* {
  text-indent: 1.5em;
}

p {
  font-size: medium;
  margin-top: 1.5em;
}
</style>
