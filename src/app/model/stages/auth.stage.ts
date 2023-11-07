import { RestoreAuthFromLSFeature } from '~/features/auth';
import { StageApp } from '~/shared/model';

export class AuthStage extends StageApp {
  status = 'authorization';

  async execute(): Promise<void> {
    const restoreFeature = new RestoreAuthFromLSFeature();
    return new Promise(async (res) => {
      await restoreFeature.execute();
      setTimeout(() => {
        res();
      }, 3000)
    })
  }
}
