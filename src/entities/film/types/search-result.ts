export type MovieSearchResultItem = {
  adult: boolean;
  backdrop_path?: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path?: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type TVSearchResultItem = {
  adult: boolean;
  backdrop_path?: string;
  genre_ids: number[];
  id: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path?: string;
  first_air_date: string;
  name: string;
  vote_average: number;
  vote_count: number;
  total_pages: number;
  total_results: number;
};

export type PeopleSearchResultItem = {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path?: string;
  known_for: Array<{
    adult: boolean;
    backdrop_path?: string;
    id: number;
    title?: string;
    original_language: string;
    original_title?: string;
    overview: string;
    poster_path?: string;
    media_type: string;
    genre_ids: number[];
    popularity: number;
    release_date?: string;
    video?: boolean;
    vote_average: number;
    vote_count: number;
  }>;
}

export type SearchResultItem = MovieSearchResultItem | TVSearchResultItem | PeopleSearchResultItem;
