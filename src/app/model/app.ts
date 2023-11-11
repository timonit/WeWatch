import { BaseApp } from '~/shared/model';
import {
  LoadStage,
  AuthStage,
} from './stages';
import { DBAPI } from '~/entities/film';
import { AuthAPI } from '~/entities/auth';

export class App extends BaseApp {
  stages = [
    LoadStage,
    AuthStage,
  ]

  async onInited(): Promise<void> {
    await AuthAPI.instance();
    await DBAPI.instance();
  }
}

export const app = new App();
