import { Film } from '../../domain/film/film';

export class RestFilm {
  url = 'http://localhost:3000';

  /**
   * Сохраняет фильм
   */
  async save(film: Film): Promise<void> {
    try {
      console.log(film);
      const result = await fetch(
        `${this.url}/film`,
        {
          method: 'POST',
          body: JSON.stringify(film.attrs),
          headers: {
            'Content-Type': 'application/json',
          }
        },
      );
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Удаление фильма
   */
  async remove(film: Film): Promise<void> {
  }

  /**
   * Найти фильм
   */
  async find(id?: number): Promise<Film[]> {
    const result = await fetch(`${this.url}/film`);
    const films = await result.json();
    return films.map((dto) => {
      return new Film(dto);
    });
  }
}
