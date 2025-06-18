import { STORAGE_KEY } from './constants';
import type { TokenData } from './types';

export const saveTokenToLS = (token: TokenData): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(token));
}
