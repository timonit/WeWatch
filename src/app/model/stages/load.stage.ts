import { AuthAPI } from '~/entities/auth';
import { StageApp } from '~/shared/model';

export class LoadStage extends StageApp {
  status = 'loading';
  
  async execute() {
    await AuthAPI.loadLib();
  }
}
