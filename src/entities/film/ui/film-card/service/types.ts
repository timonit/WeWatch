export type VideoDTO = {
  iso_639_1: string,
  iso_3166_1: string,
  name: string,
  key: string,
  site: 'YouTube',
  size: number,
  type: 'Trailer',
  official: boolean,
  published_at: string,
  id: string
}

export type PlayerDTO = {
  source:	[ 'Alloha', 'Ashdi', 'Bazon', 'Cdnmovies', 'Collaps', 'Hdvb', 'Iframe', 'Kodik', 'Videocdn', 'Voidboost' ];
  translation: string | null;
  quality:	string | null;
  iframeUrl: string;
  updatedAt:	string;
}
