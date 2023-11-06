import { RestoreAuthFromLSFeature } from '~/features/auth/model/restore-auth-from-ls';
import { StageApp } from '~/shared/model/stage.app';

export class AuthStage extends StageApp {
  status = 'authorization';

  async execute() {
    const restoreFeature = new RestoreAuthFromLSFeature();
    await restoreFeature.execute();
  }
}
