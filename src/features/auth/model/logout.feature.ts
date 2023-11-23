import { Feature } from '~/shared/model';
import { STORAGE_KEY } from '~/shared/utils';
import { AuthAPI, useAuthState } from '~/entities/auth';

export class LogoutFeature extends Feature<void> {
  async execute(): Promise<void> {
    localStorage.removeItem(STORAGE_KEY);
    AuthAPI.clearToken();
    const authState = useAuthState();
    authState.value = {authorized: false};
  }
}
