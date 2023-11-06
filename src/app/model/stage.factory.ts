import { BaseApp } from '~/shared/model/base-app';
import { StageApp } from '~/shared/model/stage.app';

export class StageFactory {
  constructor(private app: BaseApp) {}

  create<S extends StageApp>(Stage: {new (app: BaseApp): S} ) {
    return new Stage(this.app);
  }
}
