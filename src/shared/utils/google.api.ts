import { googleOptionsStorage } from './constants';

export abstract class GoogleAPI {
  static loaded = false;
  private static token?: string;
  private static instances: {[p: string]: GoogleAPI} = {};

  static loading?: Promise<void>;

  static get hasToken(): boolean {
    return !!this.token;
  }

  static inited = false;

  // жизненый хук, запускается после иниализации 
  static onInited?(): void | Promise<void>;
  
  onInited?(): void | Promise<void>;

  static loadLib(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.loaded) return resolve();
      
      gapi.load('client', async () => {
        try {
          this.loaded = true;
          await gapi.client.load('https://www.googleapis.com/discovery/v1/apis/oauth2/v2/rest');

          resolve();
        } catch(e) {
          console.error('Error in loadLib: ', e);
          reject(e);
        }
      });
    })
  }

  static async initClientLib() {
    GoogleAPI.loading = new Promise(async (res, rej) => {
      try {
        if (!GoogleAPI.token) throw 'Token is not installed';
  
        const { scope, discoveryDocs } = googleOptionsStorage;
        await gapi.client.init({ scope: scope.join(' '), discoveryDocs });
        res();
      } catch(e) {
        console.error('Error in initClientLib: ', e);
        rej(e);
      }
    });

    return GoogleAPI.loading;
  }

  static setToken(token: any) {
    gapi.client.setToken(token);
    GoogleAPI.token = token;
    console.debug('token installed');
  }

  static clearToken() {
    GoogleAPI.token = undefined;
    gapi.client.setToken(null);
    console.debug('token cleared');
  }

  static instance<T extends GoogleAPI>(this: {new (): T}): T {
    const className = this.prototype.constructor.name;
    let instance: T;

    instance = GoogleAPI.instances[className] as T;
    if (!instance) {
      instance = new this();
      GoogleAPI.instances[className] = instance;
    }

    return instance;
  }

  async init() {
    if (this.onInited) {
      const res = this.onInited();
      if (res instanceof Promise) await res;
    }
  }

  static async init<T extends GoogleAPI>(this: {new (): T} & { onInited?: () => void | Promise<void>, instance:() => T, inited: boolean}): Promise<void> {
    if (this.onInited) {
      const res = this.onInited();
      if (res instanceof Promise) await res;
    }
    const instance = this.instance();
    await instance.init();
    this.inited = true;
  }  
}
