import type { MovieSearchResultItem, TVSearchResultItem } from '~/entities/film/types/search-result';
import type { Person } from '~/entities/person';

export type PersonWithFilms = Person & {
  tv_credits: {
    cast: TVSearchResultItem[];
  },
  movie_credits: {
    cast: MovieSearchResultItem[];
  };
}
