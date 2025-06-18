import type { Film } from '../types';

export type MainDataFilm = {
  title: Film['title'];
  id: Film['id'];
  type: 'tv' | 'movie';
}

export type DBData = {
  appName: string;
  list: MainDataFilm[];
  watched?: Film['id'][];
}
