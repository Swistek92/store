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
export interface LoginUser {
  password: string;
  _id: string;
  name: string;
  account: string;
  role: string;
  avatar: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  __v: string | number;
  _doc?: any;
}
