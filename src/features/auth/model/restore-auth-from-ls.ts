import { AuthAPI } from '~/entities/auth';
import { getTokenFromLS, saveTokenToLS, TokenData } from '~/shared/utils';
import { Feature } from '~/shared/model';

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
        console.log('token refreshed');
        saveTokenToLS(tokens);
      }

      AuthAPI.setToken(tokens);
      AuthAPI.instance();
      return tokens;
    }
    console.debug('token not installed');

    return undefined;
  }
}
