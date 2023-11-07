<script setup lang="ts">
import { AppText, FormInput, AppLoader } from '~/shared/ui';
import ResultList from './result-list.vue';
import { Film } from '~/entities/film';
import lo from 'lodash';
import { DBAPI } from '~/shared/utils';

const results = ref<Film[]>([]);
const isLoading = ref<boolean>(false);
const searchText = ref<string>('');

const emit = defineEmits<{(e: 'selectFilm', film: Film): void}>();

const handler = async (film: Film) => {
  emit('selectFilm', film);
}

const autoSearch = lo.debounce(async (e: Event) => {
  if (searchText.value.trim()) {
    isLoading.value = true;
    
    if (searchText.value.trim()) {
      const result = await useFetch(
        '/api/film/search',
        {
          query: { query: searchText },
        }
      );

      results.value = result.data.value?.results;
      isLoading.value = false;
    }
  } else {
    results.value = [];
    isLoading.value = false;
  }
}, 500);

onMounted(async () => {
  const db = await DBAPI.instance();
  console.log('list', db.data)
});
</script>

<template>
  <div class="h-full">
    <FormInput v-model="searchText" @input="autoSearch" placeholder="search" />
    <div class="result mt-4">
      <div v-if="!isLoading && !searchText" class="w-full flex justify-center">
        <AppText variant="simple" class="text-gray-500">Введите название фильма</AppText>
      </div>
      <div v-if="isLoading" class="w-full flex justify-center">
        <AppLoader />
      </div>
      <ResultList v-else :list="results" @selected="handler" />
    </div>
  </div>
</template>

<style lang="scss">
.result {
  height: calc(100% - 1rem - 1em - 2rem);
}
</style>
