import { googleOptionsStorage } from './constants';
import type { GoogleOptions } from './types';

export function googleOptions(options: GoogleOptions) {
  return (constructor: any) => {
    Object.entries(options).forEach(([key, val]) => {
      const optionsKey = key as keyof GoogleOptions;
      googleOptionsStorage[optionsKey] = Array.from(new Set([...googleOptionsStorage[optionsKey], ...(val || [])]));
    });
  }
}
