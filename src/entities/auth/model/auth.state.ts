import { useState } from '#imports';
import { UserInfo } from '../user-info';

type AuthState = {
  authorazed: true,
  userInfo: UserInfo,
} | {authorazed: false};

export const useAuthState = () => useState<AuthState>('authState', () => {
  return {authorazed: false};
})
