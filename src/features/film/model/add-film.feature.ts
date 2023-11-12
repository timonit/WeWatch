import { Feature } from '~/shared/model';
import { DBAPI } from '~/entities/film';

export class AddFilmFeature extends Feature<Promise<void>> {
  async execute(id: number, title: string): Promise<void> {
    const db = await DBAPI.instance();
    const mainData = {id, title};

    if (db.data.list && Array.isArray(db.data.list)) {
      const IDAlreadyExist = db.data.list.find(film => film.id === id);
      if (IDAlreadyExist) return;

      db.data.list.push(mainData);
    } else db.data.list = [mainData];

    await db.save();
    console.log('data', db.data);
  }
}
