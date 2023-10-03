<script setup lang="ts">
import AppHeader from '@/widgets';
import { Film, FilmCard } from '~/entities/film';
import { SearchPanel } from '~/features';
import { FormInput } from '~/shared';
import AppText from '~/shared/ui/typography/app-text.vue';

const film: Film = {
  adult: false,
  budget: 40000,
  genres: [
    {
      id: 1,
      name: 'Comedy',
    }
  ],
  id: 0,
  original_language: 'ru',
  original_title: 'film name',
  overview: `Two lost souls visiting Tokyo -- the young, neglected wife of a photographer and a washed-up movie star shooting a TV commercial -- find an odd solace and pensive freedom to be real in each other's company, away from their lives in America.`,
  popularity: 0,
  poster_path: 'https://picsum.photos/300/300',
  production_companies: [{
      "id": 17041,
      "name": "Full House",
      "origin_country": ""
    },],
  production_countries: [{
      "iso_3166_1": "BE",
      "name": "Belgium"
    },],
  release_date: '2022-02-16',
  revenue: 0,
  runtime: 102,
  spoken_languages: [{
      "english_name": "French",
      "iso_639_1": "fr",
      "name": "Français"
    }],
  status: 'Rumored',
  tagline: "Everyone wants to be found.",
  title: 'Король-львёнок',
  video: false,
  vote_average: 6.5,
  vote_count: 120
}
</script>

<template>
  <div class="comp-container flex flex-col">
    <div>
      <h1 class="row">app-header</h1>
      <AppHeader class="row" />
    </div>
    <div>
      <h1 class="row">app-text</h1>
      <div>
        <h1>paragraph</h1>
        <AppText variant="paragraph">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi vero nisi repellendus facere veritatis exercitationem, quidem amet maiores hic nesciunt repellat expedita ipsam numquam quis id! Minus veniam nesciunt hic?</AppText>
        <AppText variant="paragraph">Orem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi vero nisi repellendus facere veritatis exercitationem, quidem amet maiores hic nesciunt repellat expedita ipsam numquam quis id! Minus veniam nesciunt hic?</AppText>
      </div>
      <div>
        <h1>simple</h1>
        <AppText variant="simple">Lorem ipsum dolor sit, amet consectetur adipisicing elit.</AppText>
      </div>
      <div>
        <h1>bold</h1>
        <AppText variant="bold">Lorem ipsum dolor sit</AppText>
      </div>
      <div>
        <h1>h1</h1>
        <AppText variant="h1">Lorem ipsum dolor sit</AppText>
      </div>
      <div>
        <h1>h2</h1>
        <AppText variant="h2">Lorem ipsum dolor sit</AppText>
      </div>
      <div>
        <h1>h3</h1>
        <AppText variant="h3">Lorem ipsum dolor sit</AppText>
      </div>
      <div>
        <h1>h4</h1>
        <AppText variant="h4">Lorem ipsum dolor sit</AppText>
      </div>
      <div>
        <h1>h5</h1>
        <AppText variant="h5">Lorem ipsum dolor sit</AppText>
      </div>
      <div>
        <h1>h6</h1>
        <AppText variant="h6">Lorem ipsum dolor sit</AppText>
      </div>
    </div>
    <div>
      <h1 class="row">film-card</h1>
      <div class="row main">
        <FilmCard :film="film" />
      </div>
    </div>

    <div>
      <h1 class="row">form-input</h1>
      <div class="row">
        <FormInput />
      </div>
    </div>

    <div>
      <h1 class="row">search-panel</h1>
      <div class="row w-[250px]">
        <SearchPanel />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.comp-container {
  > div {
    width: 100%;
    padding: 2rem;
    border-bottom: solid 1px rgb(35, 50, 50);
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;

    .main {
      width: calc(100% - 350px);
    }

    > .row {
      grid-column: 1 / 4;
    }

    > h1 {
      font-size: 16pt;
    }
  }
}
</style>
