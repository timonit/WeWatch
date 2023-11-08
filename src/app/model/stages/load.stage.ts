import { AuthAPI } from '~/entities/auth';
import { StageApp } from '~/shared/model';

export class LoadStage extends StageApp {
  name = 'loading';
  
  async execute() {
    await AuthAPI.loadLib();
  }
}
