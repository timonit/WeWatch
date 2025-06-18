import type { Film } from '~/entities/film/types';
import type { MediaTypes } from '~/shared';
import { Fetcher } from '~/shared/model/fetcher';

export abstract class FilmFetcher<T> extends Fetcher<T> {
  isFetching = ref(true);

  film: Film;

  mediaType: MediaTypes;

  constructor(film: Film, mediaType: MediaTypes) {
    super();
    this.film = film;
    this.mediaType = mediaType;
  }
}
