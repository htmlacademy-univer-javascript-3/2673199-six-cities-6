export type UserInfoFull = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
  email: string;
  token: string;
}

export type UserInfo = {
  email: string;
  avatarUrl: string;
  isPro: boolean;
}

export type AuthData = {
  email: string;
  password: string;
};
