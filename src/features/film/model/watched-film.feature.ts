import { Feature } from '~/shared/model';
import { DBAPI, type Film } from '~/entities/film';

export class WatchedFilmFeature extends Feature<Promise<void>> {
  async execute(id: Film['id']): Promise<void> {
    const db = await DBAPI.instance();

    await db.fetchList();

    if (Array.isArray(db.data.watched) && db.data.watched.length) {
      const IDAlreadyExist = db.data.watched.indexOf(id) > -1;
      if (IDAlreadyExist) return;

      db.data.watched.push(id);
    } else db.data.watched = [id];

    await db.save();
    console.log('data', db.data);
  }
}
