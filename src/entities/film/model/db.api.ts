import { GoogleAPI, googleOptions } from '~/shared/utils';
import { initDBData } from './constants';
import type { DBData } from './types';

@googleOptions({
  discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
  scope: [
    'email',
    'profile',
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/drive.file',
    'openid',
    'https://www.googleapis.com/auth/userinfo.profile',
  ],
})
export class DBAPI extends GoogleAPI {
  folderName = 'WeWatch';
  dbFileName = 'DBWeWatch11551122.json';
  descriptionFile = 'Data base file by WeWatch';
  idFile?: string;
  isFetching: Ref<boolean> = ref(true);

  data: DBData = reactive(initDBData);

  override async onInited() {
    await this.fetchList();
  }

  async fetchList() {
    try {
      this.isFetching.value = true;
      let dbFile = await this.getDBFile();
      if (!dbFile) dbFile = await this.initDBFile();

      const data = await gapi.client.drive.files.get(
        { fileId: dbFile.id, alt: 'media' }
      );

      this.idFile = dbFile.id;
      this.data.list = data.result.list;
      this.data.watched = data.result.watched;
    } catch(e) {
      console.error('My error', e);
    } finally {
      this.isFetching.value = false;
    }
  }

  async save() {
    const dbfile = await gapi.client.request({
      path: `https://www.googleapis.com/upload/drive/v3/files/${this.idFile}`,
      method: 'PATCH',
      body: this.data
    });
    console.log('saved', dbfile);
  }

  async getDBFile() {
    const res = await gapi.client.drive.files.list({
      q: `name='${this.dbFileName}' and mimeType='application/json' and trashed=false`,
      fields: 'files(id, name, mimeType, parents, description)'
    })

    if (res.result.files.length) {
      const filtred = res.result.files.filter((file) => file.description === this.descriptionFile);
      return filtred[0];
    }
    return undefined;
  }

  async getOrCreateFolder() {
    const res = await gapi.client.drive.files.list({
      q: `name='${this.folderName}' and mimeType='application/vnd.google-apps.folder' and trashed=false`,
      fields: 'files(id, name, mimeType)'
    })

    if (res.result.files.length) return res.result.files[0];

    const folderWW = await gapi.client.request({
      path: 'https://www.googleapis.com/drive/v3/files',
      method: 'POST',
      body: {
        name: this.folderName,
        mimeType: 'application/vnd.google-apps.folder',
      }
    });

    return folderWW.result;
  }

  async initDBFile() {
    const folderWW = await this.getOrCreateFolder();

    // create file
    const DBFile = await gapi.client.request({
      path: 'https://www.googleapis.com/drive/v3/files',
      method: 'POST',
      body: {
        name: this.dbFileName,
        mimeType: 'application/json',
        parents: [folderWW.id],
        description: this.descriptionFile,
      }
    });

    // upload init state
    const updatedDBFile = await gapi.client.request({
      path: `https://www.googleapis.com/upload/drive/v3/files/${DBFile.result.id}`,
      method: 'PATCH',
      body: JSON.stringify(initDBData)
    });

    return updatedDBFile.result;
  }
}
