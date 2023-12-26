<script setup lang="ts">
import { WatchStopHandle } from 'nuxt/dist/app/compat/capi';
import { DBAPI } from '~/entities/film';
import { AppLoader, AppText, AppSelectList } from '~/shared/ui';

const emit = defineEmits<{(e: 'selectFilm', film: any): void}>();
const isFetching = ref<boolean>(true);
const list = ref<any[]>([]);
const elms = ref([]);
let unWatch: WatchStopHandle;

onBeforeMount(async () => {
  const db = await DBAPI.instance();
  isFetching.value = db.isFetching.value;

  unWatch = watch(() => db.data.list, (listData) => {
    list.value = listData;
  }, {immediate: true});
});

onUnmounted(() => unWatch());

let dragingEl: HTMLElement | null = null;
let dragData: any;
let dragInd: undefined | number;

const dragStart = (e: DragEvent, item: any, index: number) => {
  const target = e.target as HTMLElement;
  if (target.tagName === 'A') {
    dragingEl = e.target as HTMLElement;
    dragInd = index;
    dragData = item;
    dragingEl.classList.add('draging')
  }
}

const dragEnd = async (e: DragEvent)=> {
  if (dragingEl) dragingEl.classList.remove('draging')
  dragData = undefined;
  dragingEl = null;

  isFetching.value = true;
  const db = await DBAPI.instance();
  db.data.list = list.value;
  await db.save();
  isFetching.value = false;
}

const dragEnter = (e: DragEvent, item: any, index: number) => {
  const target = e.target as HTMLElement;
  if ((target.tagName === 'A' && dragingEl) && !dragingEl.isEqualNode(target)) {
    let newList = [...list.value];

    if (typeof dragInd === 'number' && dragInd > index) {
      newList.splice(index, 0, dragData);
      newList.splice(dragInd+1, 1);
    }
    if (typeof dragInd === 'number' && dragInd < index) {
      newList.splice(index+1, 0, dragData);
      newList.splice(dragInd, 1);
    }
    
    dragInd = index;
    list.value = newList;
  }
}
</script>

<template>
  <AppSelectList class="h-[65vh]">
    <div v-if="isFetching" class="flex justify-center">
      <AppLoader size="md" />
    </div>
    <NuxtLink
      v-for="(item, index) in list"
      :key="item.id"
      ref="elms"
      :to="{ path: '/my-films', query: {id: item.id, type: item.type} }"
      class="item text-[0.8rem] px-3 py-2 mr-2 rounded-lg flex"
      :class="{active: Number($route.query.id) === Number(item.id)}"
      @click="$emit('selectFilm', item)"
      draggable="true"
      :data-index="index"
      @dragstart="dragStart($event, item, index)"
      @dragend="dragEnd"
      @dragenter.capture="dragEnter($event, item, index)"
    >
      {{ item.title }}
    </NuxtLink>
  </AppSelectList>
</template>

<style scoped lang="scss">
.item {
  cursor: pointer;
  font-size: .8em;

  &.draging {
    background-color: rgba($color: #eee, $alpha: 0.2);
  }
  
  &.active {
    background-color: rgba($color: #000, $alpha: 0.2);
  }
  
  &:hover {
    background-color: rgba($color: #000, $alpha: 0.3);
  }
}
</style>
