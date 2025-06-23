<script setup lang="ts">
import type { Person } from '~/entities/person';
import { AppLoader } from '~/shared/ui';
import { useEnable } from '~/shared/utils/use-enable';
import { EXPORT_URL } from '../model/constants';
import AppText from '~/shared/ui/app-text.vue';
import InfoPair from '~/shared/ui/info-pair.vue';
import FilmList from './film-list.vue';
import TVList from './tv-list.vue';
import type { PersonWithFilms } from '../model';

const props = defineProps<{personID: Person['id']}>();

const { state: isFetching, enable: startFetching, disable: stopFetching } = useEnable();
const person = ref<PersonWithFilms | null>(null);

const fetchPerson = async (id: Person['id']) => {
  startFetching();
  try {
    const res = await $fetch<PersonWithFilms>(`/api/person/${id}`, {
      method: 'GET',
      query: {
        append_to_response: 'movie_credits,images,tv_credits',
      },
    });
    console.log('Fetched person data:', res);
    person.value = res;
  } catch (error) {
    console.error('Error fetching person data:', error);
  } finally {
    stopFetching();
  }
};

fetchPerson(props.personID);
watch(() => props.personID, fetchPerson);
const GENDER: Record<number, string> = {
  0: 'Неизвестно',
  1: 'Женский',
  2: 'Мужской',
  3: 'Небинарный',
};
</script>

<template>
  <div v-if="isFetching" class="flex justify-center items-center">
    <AppLoader size="md" />
  </div>
  <div v-else-if="person" class="flex flex-col gap-4">
    <div class="flex items-start gap-4  max-md:flex-wrap">
      <img
        :src="`${EXPORT_URL}/w500${person?.profile_path}`"
        width="300"
        class="object-cover rounded-lg max-md:w-full"
      />
      
      <div>
        <AppText variant="h1">{{ person.name }}</AppText>
        
        <InfoPair property="Дата рождения" :value="person.birthday" />
        <InfoPair v-if="person.deathday" property="Дата смерти" :value="person.deathday" />
        <InfoPair property="Пол" :value="GENDER[person.gender]" />
        <InfoPair property="Популярность" :value="person.popularity.toFixed(2)" />
        <InfoPair property="Сайт" :value="person.homepage" />        
      </div>
    </div>
    
    <div>
      <p>{{ person?.biography }}</p>
    </div>

    <hr />

    <div class="flex gap-12">
      <div class="flex-1">
        <AppText variant="h2">Фильмы: {{ person.movie_credits.cast.length }}</AppText>
        <FilmList :films="person?.movie_credits.cast" />
      </div>
      <div class="flex-1">
        <AppText variant="h2">Сериалы и шоу: {{ person.tv_credits.cast.length }}</AppText>
        <TVList :films="person?.tv_credits.cast" />
      </div>
    </div>

    <hr />

    <div class="flex flex-wrap gap-4 mt-4">
      <img
        v-for="img in person?.images.profiles || []"
        :src="`${EXPORT_URL}/w500${img.file_path}`"
        width="300"
        class="object-cover rounded-lg max-md:w-full"
      />
    </div>
  </div>
</template>
