import type { AsyncData, useFetch } from 'nuxt/app';
import type { Film } from '~/entities/film/types';
import type { MediaTypes } from '~/shared';

export abstract class Fetcher<T> {
  isFetching = ref(true);

  film: Film;

  mediaType: MediaTypes;

  asyncData?: T;

  abstract getURL(): string;

  constructor(film: Film, mediaType: MediaTypes) {
    this.film = film;
    this.mediaType = mediaType;
  }

  async fetch() {
    const url = this.getURL();
    this.asyncData = await $fetch<T>(url);
    return this.asyncData;
  }
}
