<script setup lang="ts">
import { AuthAPI } from '~/entities/auth';
import { saveTokenToLS, TokenData } from '~/shared/utils';

const route = useRoute();
const tokenState = useState<TokenData | null>('state', () => null);
const appInited = ref(false);

onServerPrefetch(async () => {
  const tokens = await useFetch(
    '/api/auth/google-login',
    {
      query: route.query,
      server: true,
    }
  );
  
  tokenState.value = tokens.data as unknown as TokenData;
})

onBeforeMount(async () => {
  if (tokenState.value) {
    await AuthAPI.loadLib();
    saveTokenToLS(tokenState.value);
    AuthAPI.setToken(tokenState.value);
    appInited.value = true;
  
    await AuthAPI.instance();
  }
    
  // переходим и запрещаем переходить назад на авторизационную страницу
  navigateTo('/');
})
</script>

<template>
  <NuxtLayout name="empty">
    Authorizing...
  </NuxtLayout>
</template>
