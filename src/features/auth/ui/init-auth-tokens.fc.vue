<script setup lang="ts">
// import { AuthAPI } from '~/entities/auth';
// import { saveTokenToLS, TokenData } from '~/shared/utils';

// const route = useRoute();
// const tokenState = useState<TokenData | null>('state', () => null);

// onServerPrefetch(async () => {
//   console.log('server comp')
//   const tokens = await useFetch(
//     '/api/auth/google-login',
//     {
//       query: route.query,
//       server: true,
//     }
//   );

//   tokenState.value = tokens.data as unknown as TokenData;
// });

// onBeforeMount(async () => {
//   if (tokenState.value) {
//     console.log('asdasdadasd')
//     saveTokenToLS(tokenState.value);
//     await AuthAPI.loadLib();
//     AuthAPI.setToken(tokenState.value?.access_token as string);
//     AuthAPI.instance();
//   }
// });
</script>

<template>
  <div>Authorizing...</div>
</template>
