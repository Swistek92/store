import mongoose from "mongoose";

export interface NewUser {
  name: string;
  account: string;
  password: string;
  role?: string;
}

export interface AuthToken {
  id?: string;
  newUser?: NewUser;
  iat: number;
  exp: number;
}
