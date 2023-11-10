<script setup lang="ts">
import { DBAPI } from '~/entities/film';
import { AppLoader, AppText, AppSelectList } from '~/shared/ui';
import { app } from '~/app/model/app';

const emit = defineEmits<{(e: 'selectFilm', film: any): void}>();

const list = ref<{title: string; id: number;}[]>([]);
const isFetching = ref(true);

const initList = () => {
  DBAPI.instance()
    .then((db) => {
      list.value = db.data.list;
    })
    .finally(() => {
      isFetching.value = false;
    }); 
}

if (app.status.value !== 'inited') {
  app.addEventListener('stageFinished', (event) => {
    if (event.stageName === 'authorization') initList();
  })
} else initList();

</script>

<template>
  <div v-if="isFetching" class="flex justify-center">
    <AppLoader />
  </div>
  <AppSelectList :list="list" v-else>
    <template #item="item">
      <NuxtLink
        :to="{ path: '/my-films', query: {id: item.id} }"
        class="item text-[0.8rem] px-3 py-2 mr-2 rounded-lg flex"
        :class="{active: Number($route.query.id) === Number(item.id)}"
      >
        <AppText variant="simple">{{ item.title }}</AppText>
      </NuxtLink>
    </template>
  </AppSelectList>
</template>

<style scoped lang="scss">
.item {
  cursor: pointer;
  font-size: .8em;
  
  &.active {
    background-color: rgba($color: #000, $alpha: 0.2);
  }
  
  &:hover {
    background-color: rgba($color: #000, $alpha: 0.3);
  }
}

</style>
