import { SerializeResponse, unhandleError } from "../utils/http";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
// import { sendRegistrationEmail } from "../utils/sendEmail";
// import { sendRegistrationSms } from "../utils/sendSMS";
import { z } from "zod";
import { AuthToken, LoginUser } from "../../config/interface";
import UserService from "../service/user.service";
import AuthTokenGenerator from "../utils/authTokenGenerator";
const CLIENT_URL = `${process.env.BASE_URL}`;

interface RegisterUserInterface {
  name: string;
  password: string;
  account: string | number;
  SendRegistrationEmail: (
    to: string,
    url: string,
    txt: string
  ) => Promise<void>;
  SendRegistrationSms: (to: string, body: string, txt: string) => Promise<void>;
  ActiveTokenGenerator: (payload: object) => string;
  HashPassword: (
    data: string | Buffer,
    saltOrRounds: string | number
  ) => Promise<string>;
}

interface ActiveAccountInterface {
  activeToken: string;
  decodeToken: (
    token: string,
    secretOrPublicKey: jwt.Secret,
    options?: (jwt.VerifyOptions & { complete?: false | undefined }) | undefined
  ) => string | jwt.JwtPayload;
}

interface LoginInterface {
  password: string;
  user: LoginUser;
  comparePassword: (
    data: string | Buffer,
    encrypted: string
  ) => Promise<boolean>;
}

interface RefreshTokenInteface {
  token: string;
  validateToken: (
    token: string,
    secretOrPublicKey: jwt.Secret,
    options?:
      | (jwt.VerifyOptions & {
          complete?: false | undefined;
        })
      | undefined
  ) => string | jwt.JwtPayload;
}

const userCtrl = {
  register: async ({
    name,
    password,
    account,
    SendRegistrationEmail,
    SendRegistrationSms,
    ActiveTokenGenerator,
    HashPassword,
  }: RegisterUserInterface) => {
    const passwordHash = await HashPassword(password, 12);
    const newUser = { name, account, password: passwordHash };
    const activeToken = ActiveTokenGenerator({ newUser });
    const url = `${CLIENT_URL}/active/${activeToken}`;
    const emailValiadtor = z.string().email();
    const parseEmail = emailValiadtor.safeParse(account);

    if (parseEmail.success && typeof account === "string") {
      try {
        const msg = "verify you email addres";
        if (process.env.test) {
          return new SerializeResponse(200, "Ok", msg, activeToken);
        } else {
          await SendRegistrationEmail(account, url, msg);

          return new SerializeResponse(200, "Ok", msg);
        }
      } catch (error: any) {
        return new SerializeResponse(
          400,
          "Error",
          error.message || "smonthing went wrong"
        );
      }
    } else {
      try {
        const msg = "verify you phone number";
        if (process.env.test) {
          return new SerializeResponse(200, "Ok", msg, activeToken);
        } else {
          await SendRegistrationSms(`${account}`, url, msg);
          return new SerializeResponse(200, "Ok", msg);
        }
      } catch (error: any) {
        return new SerializeResponse(
          400,
          "Error",
          error.message || "smonthing went wrong"
        );
      }
    }
  },

  activeAccount: async ({
    activeToken,
    decodeToken,
  }: ActiveAccountInterface) => {
    try {
      const decoded = decodeToken(
        activeToken,
        `${process.env.ACTIVE_TOKEN_PRIVATE}`,
        { algorithms: ["RS256"] }
      ) as AuthToken;

      const { newUser } = decoded;
      if (!newUser) {
        return new SerializeResponse(
          500,
          "Error",
          "invalid authentication, remember you have just 15min to active your account!"
        );
      }
      // catch a try register with diffrent role
      newUser.role = "User";
      const user = await UserService.addUser(newUser);
      return new SerializeResponse(
        201,
        "Ok",
        "sucess! acocunt activated and created, you can login",
        user
      );
    } catch (error: any) {
      return new SerializeResponse(
        500,
        "Error",
        error.message ||
          "invalid authentication, remember you have just 15min to active your account!"
      );
    }
  },

  getAll: async () => {
    try {
      const users = await UserService.getAllUsers();
      return new SerializeResponse(200, "Ok", "sucess! your users", users);
    } catch (error) {
      return new SerializeResponse(400, "Error", "smth went wrong");
    }
  },

  login: async ({ password, user, comparePassword }: LoginInterface) => {
    try {
      const isMatch = await comparePassword(password, user.password);
      if (!isMatch) {
        return new SerializeResponse(400, "Error", "Bad password");
      }

      let ReturnUser: any = user;

      ReturnUser.password = undefined;

      return new SerializeResponse(200, "Ok", "you are login", {
        ...ReturnUser._doc,
      });
    } catch (error: any) {
      return new SerializeResponse(
        400,
        "Error",
        error.message || "smth went wrong with login"
      );
    }
  },

  refreshToken: async ({ token, validateToken }: RefreshTokenInteface) => {
    try {
      const decoded = validateToken(
        token,
        `${process.env.REFRESH_TOKEN_PRIVATE!}`,
        { algorithms: ["RS256"] }
      ) as AuthToken;
      if (!decoded) {
        return new SerializeResponse(400, "Error", "invalid token");
      }

      const user = await UserService.findUser({ _id: decoded.id }, "-password");

      if (!user) {
        return new SerializeResponse(400, "Error", "can not find a user");
      }

      const accessToken = AuthTokenGenerator.Access({ id: user._id });

      return new SerializeResponse(200, "Ok", "new access token", {
        accessToken,
      });
    } catch (error: any) {
      return new SerializeResponse(
        400,
        "Error",
        error.message || "smth went wrong with login"
      );
    }
  },
};

export default userCtrl;
