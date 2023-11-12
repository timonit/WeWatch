import { Genre } from './genre';
import { Company } from './company';
import { Country } from './country';
import { SpokenLanguage } from './spoken-language';
import { Status } from './status';
import { Video } from './video';

export type Film = {
  adult: boolean;
  backdrop_path?: string;
  belongs_to_collection?: any;
  budget: number;
  genres: Genre[];
  genre_ids: number[];
  homepage?: string;
  id: number;
  imdb_id?: string;
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
