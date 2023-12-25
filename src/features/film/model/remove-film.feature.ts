import { Feature } from '~/shared/model';
import { DBAPI } from '~/entities/film';

export class RemoveFilmFeature extends Feature<Promise<void>> {
  async execute(id: number, type: 'tv' | 'movie'): Promise<void> {
    const db = await DBAPI.instance();
    db.data.list = db.data.list.filter(film => (film.id !== id) && (film.type !== type));
    console.log("LIST", db.data.list);
    await db.save();
  }
}
