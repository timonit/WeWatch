import { STORAGE_KEY } from './constants';
import { TokenData } from './types';

export const saveTokenToLS = (token: TokenData): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(token));
}
