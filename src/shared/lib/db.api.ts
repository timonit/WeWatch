import { GoogleAPI } from './google.api';

type DBData = {
  appName: string,
  [p: string]: any,
}

export class DBAPI extends GoogleAPI {
  discoveryDocs = ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'];
  scope = 'email profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/drive openid https://www.googleapis.com/auth/userinfo.profile';

  folderName = 'WeWatch';
  dbFileName = 'DBWeWatch11551122.json';
  descriptionFile = 'Data base file by WeWatch';

  data: DBData = {appName: "WeWatch"};

  async onInited() {
    try {
      console.group('initing');
      console.log('check db file...');
      let dbFile = await this.getDBFile();
      if (!dbFile) dbFile = await this.initDBFile();

      console.log('loading db data');
      const data =  await gapi.client.drive.files.get(
        { fileId: dbFile.id, alt: 'media' }
      );

      this.data = data;
      console.groupEnd();
    } catch(e) {
      console.log('My error', e);
    }
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
    console.log('loading db folder');
    const res = await gapi.client.drive.files.list({
      q: `name='${this.folderName}' and mimeType='application/vnd.google-apps.folder' and trashed=false`,
      fields: 'files(id, name, mimeType)'
    })

    if (res.result.files.length) return res.result.files[0];

    console.log('creating db folder');
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
    console.group('initing db file');
    console.log('initing db folder');
    const folderWW = await this.getOrCreateFolder();

    console.log('creating db file');
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

    console.log('uploading init data to db file');
    const updatedDBFile = await gapi.client.request({
      path: `https://www.googleapis.com/upload/drive/v3/files/${DBFile.result.id}`,
      method: 'PATCH',
      body: '{"appName": "WeWatch"}'
    });

    console.groupEnd();
    return updatedDBFile.result;
  }
}