import { AuthAPI } from '~/entities/auth/model/auth.api';
import { getTokenFromLS } from '~/shared/lib/get-token-from-ls';
import { saveTokenToLS } from '~/shared/lib/save-token-to-ls';
import { TokenData } from '~/shared/lib/types';
import { Feature } from '~/shared/model/feature';

export class RestoreAuthFromLSFeature extends Feature<Promise<TokenData | undefined>> {
  async execute(): Promise<TokenData | undefined> {
    let tokens = getTokenFromLS();

    if (tokens) {
      const expiryDate = new Date(tokens.expiry_date);
      const nowDate = new Date();

      if (expiryDate <= nowDate) {
        const res = await useFetch(
          '/api/auth/google-refresh-token', 
          { method: 'POST', body: tokens }
        );
        tokens = res.data.value as TokenData;
        saveTokenToLS(tokens);
      }

      AuthAPI.setToken(tokens);
      AuthAPI.instance();

      return tokens;
    }

    return undefined;
  }
}
