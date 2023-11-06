import { AuthAPI } from '~/entities/auth/model/auth.api';
import { StageApp } from '~/shared/model/stage.app';

export class LoadStage extends StageApp {
  status = 'loading';
  
  async execute() {
    await AuthAPI.loadLib();
  }
}
