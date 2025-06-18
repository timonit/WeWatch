import { STORAGE_KEY } from './constants';
import type { TokenData } from './types';

export const getTokenFromLS = (): TokenData | undefined => {
  const token = localStorage.getItem(STORAGE_KEY);
    
  if (token) return JSON.parse(token);
  return undefined;
}
