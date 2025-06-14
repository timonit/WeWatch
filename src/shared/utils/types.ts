export type TokenData = {
  access_token: string,
  refresh_token: string,
  expiry_date: number,
};

export type GoogleOptions = {
  discoveryDocs: string[],
  scope: string[],
}
