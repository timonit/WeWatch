import { BaseApp } from '~/shared/model';
import {
  LoadStage,
  AuthStage,
} from './stages';
import { DBAPI } from '~/entities/film';
import { AuthAPI } from '~/entities/auth';

export class App extends BaseApp {
  override stages = [
    LoadStage,
    AuthStage,
  ]

  override async onInited(): Promise<void> {
    await AuthAPI.init();
    await DBAPI.init();
  }
}

export const app = new App();
