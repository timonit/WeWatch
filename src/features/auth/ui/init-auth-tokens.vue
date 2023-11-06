<script setup lang="ts">
import { AuthAPI } from '~/entities/auth/model/auth.api';
import { saveTokenToLS } from '~/shared/lib/save-token-to-ls';
import { TokenData } from '~/shared/lib/types';

const route = useRoute();
const tokenState = useState<TokenData | null>('state', () => null);

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

onBeforeMount(async () => {
  if (tokenState.value) {
    saveTokenToLS(tokenState.value);
    await AuthAPI.loadLib();
    AuthAPI.setToken(tokenState.value?.access_token as string);
    AuthAPI.instance();
  }
});
</script>

<template>
  <div>Authorizing...</div>
</template>
