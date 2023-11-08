export class StageFinishedEvent extends Event {
  stageName: string;

  constructor(stageName: string, eventInit?: EventInit) {
    super('stageFinished', eventInit);
    this.stageName = stageName;
  }
}
