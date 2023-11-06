export type Locale = 'ru' | 'en';

export type UserInfo = {
  email: string;
  family_name: string;
  given_name: string;
  id: string;
  locale: Locale;
  name: string;
  picture: string;
  verified_email: boolean;
}
