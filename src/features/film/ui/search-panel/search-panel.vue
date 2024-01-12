<script setup lang="ts">
import { AppText, FormInput, AppLoader, ButtonApp } from '~/shared/ui';
import ResultList from './result-list.vue';
import { Film } from '~/entities/film';
import lo from 'lodash';
import { DBAPI } from '~/entities/film';
import { Disclosure, DisclosureButton,DisclosurePanel } from '@headlessui/vue';
import { ResultItem, SearchResult } from './types';
import { addQuerySearch, getQuerySearch } from './last-query-list';
// commonJs import
const { throttle } = lo;

const results = ref<ResultItem[]>([]);
const isLoading = ref<boolean>(false);
const searchText = ref<string>('');
const lastQueries = ref<string[]>([]);

const emit = defineEmits<{(e: 'selectFilm', film: Film): void}>();

const handler = async (film: Film) => {
  emit('selectFilm', film);
}

const search = throttle(async (e: Event) => {
  const val = searchText.value;

  if (val.trim()) {
    isLoading.value = true;
    
    if (val.trim()) {
      const result = await useFetch<SearchResult>(
        '/api/movie/search',
        {
          query: { query: val },
        }
      );

      if (result.data.value) {
        results.value = result.data.value?.results;
        isLoading.value = false;
      }
    }
  } else {
    results.value = [];
    isLoading.value = false;
  }

  addQuerySearch(val);
  lastQueries.value = getQuerySearch();
}, 700);

onMounted(async () => {
  await DBAPI.instance();
  lastQueries.value = getQuerySearch();
});

const formEl = ref<HTMLElement>();
const btnEl = ref<HTMLElement>();
const height = computed(() => {
  return `calc(100% - ${formEl.value?.offsetHeight}px - ${formEl.value?.offsetHeight}px)`;
})
</script>

<template>
  <div class="h-full">
    <form ref="formEl" class="form-group" @submit.prevent="search">
      <FormInput list="last-searсh-queries" v-model="searchText" placeholder="search" type="search" />
      <datalist id="last-searсh-queries">
        <option
          v-for="query of lastQueries"
          :value="query"
        ></option>
      </datalist>
      <ButtonApp type='submit' class="text-orange-600">Поиск</ButtonApp>
    </form>

    <Disclosure v-slot="{ open }" :default-open="true">
      <DisclosurePanel class="max-h-[60vh] overflow-auto" static v-show="open">
        <div class="result mt-4">
          <div v-if="!isLoading && !results.length" class="w-full flex justify-center">
            <AppText variant="simple" class="text-gray-500 text-center">Введите название фильма и нажмите "поиск"</AppText>
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

<style src="@/shared/ui/form/form.scss"></style>
<style lang="scss" scoped>
.result {
  height: calc(100% - 1rem - 1em - 2rem);
}
.dis-trigger {
  background-color: var(--bg-secondary);
  border-color: var(--border-color-secondary);
}
</style>
