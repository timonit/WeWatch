import { BaseApp, StageApp } from '~/shared/model';

export class StageFactory {
  constructor(private app: BaseApp) {}

  create<S extends StageApp>(Stage: {new (app: BaseApp): S} ) {
    return new Stage(this.app);
  }
}
