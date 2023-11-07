import { Feature } from '~/shared/model';
import { DBAPI } from '~/shared/utils';

export class AddFilmFeature extends Feature<Promise<void>> {
  async execute(id: number): Promise<void> {
    const db = await DBAPI.instance();
    if (db.data.list && Array.isArray(db.data.list)) {
      db.data.list.push(id);
    } else db.data.list = [id];
    await db.save();
    console.log('data', db.data);
  }
}
