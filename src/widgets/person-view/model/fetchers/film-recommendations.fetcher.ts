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

type RecommendationsResult = {
  page: number;
  total_pages: number;
  total_results: number;
  results: Film[];
}

export class FilmRecommendationsFetcher extends FilmFetcher<RecommendationsResult> {
  getURL(): string {
    return `/api/${this.mediaType}/${this.film.id}/recommendations`;
  }
}
