import { DBAPI } from '~/entities/film/model';
import type { Film } from '~/entities/film/types';
import type { MediaTypes } from '~/shared';
import type { PlayerDTO, VideoDTO } from './types';
import { FilmCollectsFetcher } from './fetchers/film-collects.fetcher';
import { FilmRecommendationsFetcher } from './fetchers/film-recommendations.fetcher';
import { EXPORT_URL } from './constants';

export class FilmService {
  isFetching = ref(true);

  film = ref<Film | undefined>();

  mediaType = ref<MediaTypes>('movie');

  filmIsExist = ref(false);

  playersIsFetching = ref(false);

  players = ref<PlayerDTO[]>([]);

  trailersIsFetching = ref(false);

  trailers = ref<VideoDTO[]>([]);

  EXPORT_URL = EXPORT_URL;

  db!: DBAPI;

  collects?: FilmCollectsFetcher;

  recommendations?: FilmRecommendationsFetcher;

  constructor(public filmID: Film['id'], type: MediaTypes) {
    this.mediaType.value = type;
  }

  async init() {
    try {
      this.setFilm(this.filmID, this.mediaType.value);
      this.db = DBAPI.instance();
    } catch(err) {
      if (err !== 'Token is not installed') return ;
    }
  }
  
  async fetchFilm () {
    try {
      this.isFetching.value = true;
      const res = await $fetch<Film>(`/api/${this.mediaType.value}/${this.filmID}`);
      if (res) this.film.value = res;
      this.updateExist();
  
      this.isFetching.value = false;
  
      this.fetchPlayers();
      this.fetchTrailers();
      
      this.collects = new FilmCollectsFetcher(this.film.value, this.mediaType.value);
      this.recommendations = new FilmRecommendationsFetcher(this.film.value, this.mediaType.value);
    } catch(err) {
      console.error('Error fetching film:', err);
      this.isFetching.value = false;
      this.film.value = undefined;
    }
  };

  setFilm(filmID: Film['id'], mediaType: MediaTypes) {
    this.filmID = filmID;
    this.mediaType.value = mediaType;
    this.fetchFilm();
  }
  
  updateExist = () => {
    if (this.film.value && this.db) {
      const filmExist = this.db.data.list.find((itemFilm) => {
        return itemFilm.id === this.film.value.id
      });
      this.filmIsExist.value = !!filmExist;
    }
  }

  async getIMDB_ID(): Promise<string | undefined> {
    if (!this.film.value) return undefined;
    
    if (this.mediaType.value === 'movie') return this.film.value.imdb_id;
    if (this.mediaType.value === 'tv') {
      const result = await $fetch<{'imdb_id': string}>(`/api/${this.mediaType.value}/${this.film.value.id}/external-id`);
      return result?.imdb_id;
    }
    return undefined;
  }

  async fetchPlayers() {
    this.playersIsFetching.value = true;
    
    const videos = await $fetch<PlayerDTO[]>(`https://kinobox.tv/api/players?imdb=${await this.getIMDB_ID()}`);
    this.players.value = videos ?? [];

    this.playersIsFetching.value = false;
  }

  async fetchTrailers() {
    if (this.film.value) {
      this.trailersIsFetching.value = true;
      const resTrailers = await $fetch<{results: VideoDTO[]}>(`/api/${this.mediaType.value}/${this.film.value.id}/video`);
      if(resTrailers) this.trailers.value = resTrailers?.results;
      this.trailersIsFetching.value = false;
    }
  }
}
