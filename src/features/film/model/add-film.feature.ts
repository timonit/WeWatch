import { Feature } from '~/shared/model';
import { DBAPI } from '~/entities/film';

type InputDTO = {
  id: number;
  title: string;
  type: 'movie' | 'tv',
}

export class AddFilmFeature extends Feature<Promise<void>> {
  async execute(inputDTO: InputDTO): Promise<void> {
    const db = await DBAPI.instance();
    // const mainData = {id, title};

    if (db.data.list && Array.isArray(db.data.list)) {
      const IDAlreadyExist = db.data.list.find(film => film.id === inputDTO.id);
      if (IDAlreadyExist) return;

      db.data.list.push(inputDTO);
    } else db.data.list = [inputDTO];

    await db.save();
    console.log('data', db.data);
  }
}
