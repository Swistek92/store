import { sign, SignOptions } from "jsonwebtoken";
import * as fs from "fs";
import * as path from "path";

const { ACTIVE_TOKEN_PRIVATE } = process.env;

const AuthTokenGenerator = {
  Active: (payload: object) => {
    const sginOptions: SignOptions = {
      algorithm: "RS256",
      expiresIn: "15m",
    };

    return sign(payload, process.env.ACTIVE_TOKEN_PRIVATE!, sginOptions);
  },
  Access: (payload: object) => {
    return sign(payload, process.env.ACESS_TOKEN_PRIVATE!, {
      algorithm: "RS256",
      expiresIn: "15m",
    });
  },
  Refresh: (payload: object) => {
    return sign(payload, process.env.REFRESH_TOKEN_PRIVATE!, {
      algorithm: "RS256",
      expiresIn: "30d",
    });
  },
};

export default AuthTokenGenerator;
