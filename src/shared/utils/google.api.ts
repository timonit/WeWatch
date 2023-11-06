export abstract class GoogleAPI {
  abstract discoveryDocs: string[];
  abstract scope: string;

  static loaded = false;
  private static token?: string;
  private static instances: {[p: string]: GoogleAPI} = {};

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

  static async initClientLib(scope: string, discoveryDocs: string[]) {
    try {
      if (!GoogleAPI.token) throw 'Token is not installed';

      await gapi.client.init({ scope, discoveryDocs });
    } catch(e) {
      console.error('Error in initClientLib: ', e);
    }
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
    const className = this.name;
    let instance = GoogleAPI.instances[className] as T;
    if (instance) return instance;

    // @ts-ignore
    instance = new this();
    await instance.init();
    GoogleAPI.instances[className] = instance;
    return instance;
  }

  async init(): Promise<void> {
    if (!GoogleAPI.loaded) await GoogleAPI.loadLib();
    
    const { discoveryDocs, scope } = this;
    await GoogleAPI.initClientLib(scope, discoveryDocs);

    if (this.onInited) {
      const res = this.onInited();
      if (res instanceof Promise) await res;
    }
  }
}
