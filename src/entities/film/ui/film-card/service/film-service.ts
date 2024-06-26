import { DBAPI } from '~/entities/film/model';
import { Film } from '~/entities/film/types';
import { MediaTypes } from '~/shared';
import { PlayerDTO, VideoDTO } from './types';
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
    this.db = await DBAPI.instance();
    this.setFilm(this.filmID, this.mediaType.value);
  }
  
  async fetchFilm () {
    this.isFetching.value = true;
    const res = await useFetch<Film>(`/api/${this.mediaType.value}/${this.filmID}`);

    if (res.data.value) this.film.value = res.data.value;
    this.updateExist();

    this.isFetching.value = false;

    this.fetchPlayers();
    this.fetchTrailers();
    try {
      this.collects = new FilmCollectsFetcher(this.film.value, this.mediaType.value);
    } catch(err) {
    }
    this.recommendations = new FilmRecommendationsFetcher(this.film.value, this.mediaType.value);
  };

  setFilm(filmID: Film['id'], mediaType: MediaTypes) {
    this.filmID = filmID;
    this.mediaType.value = mediaType;
    this.fetchFilm();
  }
  
  updateExist = () => {
    if (this.film.value){
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
      const result = await useFetch<{'imdb_id': string}>(`/api/${this.mediaType.value}/${this.film.value.id}/external-id`);
      return result.data.value?.imdb_id;
    }
    return undefined;
  }

  async fetchPlayers() {
    this.playersIsFetching.value = true;
    
    const videos = await useFetch<PlayerDTO[]>(`https://kinobox.tv/api/players?imdb=${await this.getIMDB_ID()}`);
    this.players.value = videos.data.value ?? [];

    this.playersIsFetching.value = false;
  }

  async fetchTrailers() {
    if (this.film.value) {
      this.trailersIsFetching.value = true;
      const resTrailers = await useFetch<{results: VideoDTO[]}>(`/api/${this.mediaType.value}/${this.film.value.id}/video`);
      
      if(resTrailers.data.value) this.trailers.value = resTrailers.data.value?.results;
      this.trailersIsFetching.value = false;
    }
  }
}
