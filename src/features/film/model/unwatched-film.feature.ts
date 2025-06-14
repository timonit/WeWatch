import { Feature } from '~/shared/model';
import { DBAPI, type Film } from '~/entities/film';

export class UnwatchedFilmFeature extends Feature<Promise<void>> {
  async execute(id: Film['id']): Promise<void> {
    const db = await DBAPI.instance();

    await db.fetchList();

    if (Array.isArray(db.data.watched) && db.data.watched.length) {
      const newWatchedList = db.data.watched.filter(filmID => filmID !== id);

      db.data.watched = newWatchedList;
      await db.save();
      console.log('data', db.data);
    }
  }
}
