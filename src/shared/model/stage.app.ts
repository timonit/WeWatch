import { BaseApp } from './base-app';

export abstract class StageApp {
  abstract status: string;

  app: BaseApp;

  constructor(app: BaseApp) {
    this.app = app;
  }

  abstract execute(): void | Promise<void>;
}
