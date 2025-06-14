import { GoogleAPI, googleOptions } from '~/shared/utils';
import type { UserInfo } from '../user-info';
import { useAuthState } from './auth.state';

@googleOptions({
  discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/oauth2/v2/rest'],
  scope: [
    'email',
    'profile',
    'https://www.googleapis.com/auth/userinfo.email',
    'openid',
    'https://www.googleapis.com/auth/userinfo.profile',
  ],
})
export class AuthAPI extends GoogleAPI {
  authState = useAuthState();

  override async onInited(): Promise<void> {
    if (AuthAPI.hasToken) {
      const userInfo = await this.getUserInfo();
      this.authState.value = {
        userInfo,
        authorized: true,
      };
    }
  }

  async getUserInfo(): Promise<UserInfo> {
    const userInfo = (await gapi.client.oauth2.userinfo.get()).result;
    return userInfo;
  }
}
