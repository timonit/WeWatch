import { Feature } from '~/shared/model';
import { DBAPI } from '~/entities/film';

export class RemoveFilmFeature extends Feature<Promise<void>> {
  async execute(id: number): Promise<void> {
    const db = await DBAPI.instance();
    db.data.list = db.data.list.filter(film => film.id !== id);
    await db.save();
  }
}
