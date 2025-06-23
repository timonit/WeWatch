// export type ResultItem = {
//   adult: boolean;
//   backdrop_path: string;
//   id: number;
//   title: string;
//   original_language: string;
//   original_title: string;
//   overview: string;
//   poster_path: string;
//   media_type: "tv" | "movie";
//   genre_ids: number[];
//   popularity: number;
//   release_date: string;
//   video: boolean;
//   vote_average: number;
//   vote_count: number;
// }

import type { SearchResultItem } from '~/entities/film/types/search-result';

export type SearchResult = {
  page: number;
  results: SearchResultItem[];
  total_pages: number;
  total_results: number;
}
