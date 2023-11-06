import { BaseApp } from '~/shared/model/base-app';
import { StageApp } from '~/shared/model/stage.app';
import {
  LoadStage,
  AuthStage,
} from './stages';
import { StageFactory } from './stage.factory';

export class App extends BaseApp {
  isInited = ref(false);

  status = ref('no init');

  stages: {new (app: BaseApp): StageApp}[] = [
    LoadStage,
    AuthStage,
  ]

  stageFactory = new StageFactory(this);

  async init() {
    const { stageFactory } = this;
    for (let Stage of this.stages) {
      const stage = stageFactory.create(Stage);
      console.debug(stage.status);
      
      this.status.value = stage.status;
      await stage.execute();
    }

    this.status.value = 'inited';

    this.isInited.value = true;
  }
}

export const app = new App();
