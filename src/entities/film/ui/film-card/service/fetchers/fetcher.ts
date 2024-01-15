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
    // @ts-ignore
    this.asyncData = useFetch<Ref<string>, any>(this.getURL(), {server: false, immediate: false});
  }

  async fetch() {
    await this.asyncData.execute();
  }
}
