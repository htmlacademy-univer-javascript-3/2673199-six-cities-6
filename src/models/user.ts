export type UserInfoFull = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
  email: string;
  token: string;
}

export type UserInfo = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
}

export type UserCredentials = {
  email: string;
  password: string;
};
