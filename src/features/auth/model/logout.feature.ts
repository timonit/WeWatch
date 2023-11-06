import { Feature } from '~/shared/model/feature';
import { STORAGE_KEY } from '@/shared/lib/constants';
import { AuthAPI } from '~/entities/auth/model/auth.api';
import { useAuthState } from '~/entities/auth/model/auth.state';

export class LogoutFeature extends Feature<void> {
  async execute(): Promise<void> {
    localStorage.removeItem(STORAGE_KEY);
    AuthAPI.clearToken();
    const authState = useAuthState();
    authState.value = {authorazed: false};
  }
}
