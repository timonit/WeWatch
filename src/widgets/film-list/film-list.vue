<script setup lang="ts">
import { WatchStopHandle } from 'nuxt/dist/app/compat/capi';
import { DBAPI } from '~/entities/film';
import { AppLoader, AppText, AppSelectList } from '~/shared/ui';

const emit = defineEmits<{(e: 'selectFilm', film: any): void}>();
const isFetching = ref<boolean>(true);
const list = ref<any[]>([]);
let unWatch: WatchStopHandle;

onBeforeMount(async () => {
  const db = await DBAPI.instance();
  isFetching.value = db.isFetching.value;

  unWatch = watch(() => db.data.list, (listData) => {
    list.value = listData;
  }, {immediate: true});
});

onUnmounted(() => unWatch());
</script>

<template>
  <div v-if="isFetching" class="flex justify-center">
    <AppLoader size="md" />
  </div>
  <AppSelectList class="h-[65vh]" :list="list" v-else>
    <template #item="item">
      <NuxtLink
        :to="{ path: '/my-films', query: {id: item.id, type: item.type} }"
        class="item text-[0.8rem] px-3 py-2 mr-2 rounded-lg flex"
        :class="{active: Number($route.query.id) === Number(item.id)}"
        @click="$emit('selectFilm', item)"
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
