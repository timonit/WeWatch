import { BaseApp } from '~/shared/model';
import {
  LoadStage,
  AuthStage,
} from './stages';

export class App extends BaseApp {
  stages = [
    LoadStage,
    AuthStage,
  ]
}

export const app = new App();
