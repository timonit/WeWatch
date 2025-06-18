import type { Genre } from './genre';
import type { Company } from './company';
import type { Country } from './country';
import type { SpokenLanguage } from './spoken-language';
import type { Status } from './status';
import type { Video } from './video';
import type { Credits } from './credits';

export type Film = {
  adult: boolean;
  backdrop_path?: string;
  belongs_to_collection?: any;
  credits: Credits;
  budget: number;
  genres: Genre[];
  genre_ids: number[];
  homepage?: string;
  id: number;
  imdb_id?: string;
  name?: string,
  original_language: string;
  original_title: string;
  overview?: string;
  popularity: number;
  poster_path?: string;
  production_companies: Company[];
  production_countries: Country[];
  release_date: string;
  revenue: number;
  runtime?: number;
  spoken_languages: SpokenLanguage[];
  status: Status;
  tagline?: string;
  title: string;
  video: boolean;
  videos?: {
    results: Video[]
  };
  vote_average: number;
  vote_count: number;
  watched?: boolean;
};
