<script setup lang="ts">
import { AppTool, AppIcon, AppLoader } from '~/shared/ui';
import { DBAPI, Film } from '~/entities/film';
import { useAuthState } from '~/entities/auth';
import { WatchedFilmFeature } from '../model/watched-film.feature';
import { UnwatchedFilmFeature } from '../model/unwatched-film.feature';

const props = defineProps<{film: Film}>();
const isLoading = ref(false);
const auth = useAuthState();
const emit = defineEmits(['executed']);

const featureWatched = new WatchedFilmFeature();
const featureUnwatched = new UnwatchedFilmFeature();
const db = await DBAPI.instance();

const filmIsWatched = computed(() => {
  if (!Array.isArray(db.data.watched)) return false;
  return db.data.watched.indexOf(props.film.id) > -1;
});

const handler = async () => {
  isLoading.value = true;

  if (filmIsWatched.value) await featureUnwatched.execute(props.film.id);
  else await featureWatched.execute(props.film.id);
  
  isLoading.value = false;
  emit('executed');
}

const title = computed(() => filmIsWatched.value ? 'unwatched' : 'watched');
</script>

<template>
  <AppTool v-if="auth.authorized" :tool="{ handler, name: title }" >
    <template #icon>
      <AppLoader v-if="isLoading" />
      <AppIcon v-if="filmIsWatched" icon-name="eye-off" />
      <AppIcon v-else icon-name="eye" />
    </template>
  </AppTool>
</template>
