<script setup lang="ts">
import { AppText, FormInput, AppLoader } from '~/shared/ui';
import ResultList from './result-list.vue';
import { Film } from '~/entities/film';
import lo from 'lodash';
import { DBAPI } from '~/entities/film';
import { Disclosure, DisclosureButton,DisclosurePanel } from '@headlessui/vue'; 

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
});
</script>

<template>
  <div>
    <FormInput v-model="searchText" @input="autoSearch" placeholder="search" />

    <Disclosure v-slot="{ open }" :default-open="true">
      <DisclosurePanel class="max-h-[60vh] overflow-auto" static v-show="open">
        <div class="result mt-4">
          <div v-if="!isLoading && !searchText" class="w-full flex justify-center">
            <AppText variant="simple" class="text-gray-500">Введите название фильма</AppText>
          </div>
          <div v-if="isLoading" class="w-full flex justify-center">
            <AppLoader size="md" />
          </div>
          <ResultList v-else :list="results" @selected="handler" />
        </div>
      </DisclosurePanel>
      <DisclosureButton class="dis-trigger text-center w-full my-4 border" v-if="open">свернуть</DisclosureButton>
      <DisclosureButton class="dis-trigger text-center w-full my-4 border" v-if="!open">развернуть</DisclosureButton>
    </Disclosure>

  </div>
</template>

<style lang="scss" scoped>
.result {
  height: calc(100% - 1rem - 1em - 2rem);
}
.dis-trigger {
  background-color: var(--bg-secondary);
  border-color: var(--border-color-secondary);
}
</style>
