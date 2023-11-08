<script setup lang="ts">
import { app } from '~/app/model/app';
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
});

app.addEventListener('stageFinished', async (event) => {
  if (tokenState.value && event.stageName === 'loading') {
    saveTokenToLS(tokenState.value);
    AuthAPI.setToken(tokenState.value?.access_token as string);
    AuthAPI.instance();
    appInited.value = true;
  }

  // переходим и запрещаем переходить назад на авторизационную страницу
  history.replaceState({current: '/'}, '', 'http://localhost:5173');
  navigateTo('/');
})
</script>

<template>
  <NuxtLayout name="empty">
    Authorizing...
  </NuxtLayout>
</template>
