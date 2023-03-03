export interface NewUser {
  name: string;
  account: string;
  password: string;
}

export interface AuthToken {
  newUser?: NewUser;
  iat: number;
  exp: number;
}
