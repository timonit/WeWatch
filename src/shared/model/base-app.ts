import { StageApp } from '.';
import { StageFinishedEvent } from './stage-finished-event';
import { StageFactory } from './stage.factory';

export abstract class BaseApp extends EventTarget {
  isInited = ref(false);

  status = ref('loading');

  stages: {new (app: BaseApp): StageApp}[] = [];

  stageFactory = new StageFactory(this);

  // жизненый хук, запускается после иниализации 
  onInited?(): void | Promise<void>;
  
  setAppStatus(status: string) {
    this.status.value = status;
  }

  async init() {
    for (let Stage of this.stages) await this.executeStage(Stage);

    this.status.value = 'inited';
    console.debug('app', this.status.value);

    if (this.onInited) await this.onInited();
    
    this.isInited.value = true;
  }

  async executeStage(Stage: {new (app: BaseApp): StageApp}) {
    const stage = this.stageFactory.create(Stage);
    console.debug(stage.name);
    
    this.status.value = stage.name;
    await stage.execute();

    const event = new StageFinishedEvent(stage.name);
    this.dispatchEvent(event);
  }
}
