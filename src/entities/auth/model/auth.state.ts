import { UserInfo } from '../user-info';

type AuthState = {
  authorized: true,
  userInfo: UserInfo,
} | {authorized: false};

export const useAuthState = () => useState<AuthState>('authState', () => {
  return {authorized: false};
})
