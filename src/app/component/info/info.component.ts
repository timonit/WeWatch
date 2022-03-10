import { Component, Inject, Input, OnInit } from '@angular/core';
import { Film } from '../../../domain/film/film';
import { TMDBRepository } from '../../../infrastructure/repository/TMDBRepository';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent implements OnInit {
  @Input()
  info: Film;

  genres = [];

  casts = [];

  crew = [];

  img?: string;

  youtube = 'https://www.youtube.com/embed/';

  constructor(
    @Inject('TMDBRepository') public tmdbRepository: TMDBRepository,
    private sanitizer: DomSanitizer,
  ) {
  }

  ngOnInit(): void {
    this.genres = this.info.attrs.genres.map((genre) => (this.tmdbRepository.genres[genre.id]));
  }

  async ngOnChanges(): Promise<void> {
    const credits = await this.tmdbRepository.getCredit(this.info.attrs.id);
    this.casts = credits.cast;
    this.crew = credits.crew;
    console.log('FILM', this.info);
  }
}