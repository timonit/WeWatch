import { AsyncData, useFetch } from 'nuxt/app';
import { Film } from '~/entities/film/types';
import { MediaTypes } from '~/shared';

export abstract class Fetcher<T> {
  isFetching = ref(true);

  film: Film;

  mediaType: MediaTypes;

  asyncData: AsyncData<T, any>;

  abstract getURL(): string;

  constructor(film: Film, mediaType: MediaTypes) {
    this.film = film;
    this.mediaType = mediaType;

    const url = this.getURL();
    // @ts-ignore
    this.asyncData = useFetch<Ref<string>, any>(url, {server: false, immediate: false});
  }

  async fetch() {
    return this.asyncData.execute();
  }
}
