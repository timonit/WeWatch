import { googleOptionsStorage } from './constants';

export abstract class GoogleAPI {
  static loaded = false;
  private static token?: string;
  private static instances: {[p: string]: GoogleAPI} = {};

  static loading?: Promise<void>;

  static get hasToken(): boolean {
    return !!this.token;
  }

  // жизненый хук, запускается после иниализации 
  onInited?(): void | Promise<void>;

  static loadLib(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.loaded) return resolve();

      gapi.load('client', async () => {
        try {
          this.loaded = true;
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
        await gapi.client.init({ scope, discoveryDocs });
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

  static async instance<T extends GoogleAPI>(this: {new (): T}): Promise<T> {
    const className = this.prototype.constructor.name;
    let instance: T;
    
    if (GoogleAPI.loading) await GoogleAPI.loading;
    else {
      if (!GoogleAPI.loaded) await GoogleAPI.loadLib();
      await GoogleAPI.initClientLib();
      // @ts-ignore
      instance = new this();
      await instance.init();
      GoogleAPI.instances[className] = instance;
      return instance;
    }

    instance = GoogleAPI.instances[className] as T;
    if (instance) return instance;

    // @ts-ignore
    instance = new this();
    await instance.init();
    GoogleAPI.instances[className] = instance;
    return instance;
  }

  async init(): Promise<void> {
    if (this.onInited) {
      const res = this.onInited();
      if (res instanceof Promise) await res;
    }
  }
}
