import { RestoreAuthFromLSFeature } from '~/features/auth';
import { StageApp } from '~/shared/model';

export class AuthStage extends StageApp {
  status = 'authorization';

  async execute() {
    const restoreFeature = new RestoreAuthFromLSFeature();
    await restoreFeature.execute();
  }
}
