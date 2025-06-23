import { FilmFetcher } from './film-fetcher';

type Film = {
  adult: boolean;
  backdrop_path: string;
  id: number;
  title: string;
  original_language: string;
  original_title: string;
  overview: string;
  poster_path: string;
  media_type: string;
  genre_ids: number[];
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

type CollectResult = {
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  parts: Film[];
}

export class FilmCollectsFetcher extends FilmFetcher<CollectResult> {
  getURL(): string {
    if (!this.film.belongs_to_collection) throw new Error('Property belongs_to_collection not found');
    return `/api/${this.mediaType}/collects/${this.film.belongs_to_collection.id}`;
  }
}
