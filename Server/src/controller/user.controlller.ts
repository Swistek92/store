import { SerializeResponse, unhandleError } from "../utils/http";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendEmail from "../utils/sendEmail";
import sendSms from "../utils/sendSMS";
import logger from "../utils/logger";
import { AuthToken } from "../../config/interface";
import UserService from "../service/user.service";
import AuthTokenGenerator from "../utils/authTokenGenerator";
const CLIENT_URL = `${process.env.BASE_URL}`;

const userCtrl = {
  register: async (req: Request, res: Response) => {
    try {
      const { name, password, account } = req.body;
      const passwordHash = await bcrypt.hash(password, 12);

      const newUser = { name, account, password: passwordHash };

      const activeToken = AuthTokenGenerator.Active({ newUser });
      const url = `${CLIENT_URL}/active/${activeToken}`;

      if (typeof account === "string") {
        sendEmail(account, url, "veryfy your email adress");
        return res.status(200).json(
          new SerializeResponse(200, "Ok", "sucess! check your email", {
            msg: "sucess! check your email",
          })
        );
      } else {
        sendSms(`${account}`, url, "verify, your phone number");
        return res.status(200).json(
          new SerializeResponse(200, "Ok", "sucess! check your email", {
            msg: "sucess! check your phone",
          })
        );
      }
    } catch (error) {
      unhandleError(error, res);
    }
  },

  activeAccount: async (req: Request, res: Response) => {
    try {
      const { activeToken } = req.body;
      const decoded = jwt.verify(
        activeToken,
        `${process.env.ACTIVE_TOKEN_SECRET}`
      ) as AuthToken;
      const { newUser } = decoded;
      if (!newUser) {
        return res
          .status(500)
          .json(
            new SerializeResponse(
              500,
              "Error",
              "invalid authentication, remember you have just 15min to active your account!"
            )
          );
      }
      // catch a try register with diffrent role
      newUser.role = "User";
      const user = await UserService.addUser(newUser);
      logger.info(decoded);
      return res
        .status(201)
        .json(
          new SerializeResponse(
            201,
            "Ok",
            "sucess! acocunt activated and created, you can login",
            user
          )
        );
    } catch (error) {
      unhandleError(error, res);
    }
  },

  getAll: async (req: Request, res: Response) => {
    try {
      logger.info("Add middleware for restrict just for  a admin !!");
      const users = await UserService.getAllUsers();
      return res
        .status(200)
        .json(new SerializeResponse(200, "Ok", "sucess! your users", users));
    } catch (error) {
      unhandleError(error, res);
    }
  },

  login: async (req: Request, res: Response) => {
    try {
      const { password, user } = req.body;
      // req.body.user is added in validation middleware.
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json(new SerializeResponse(400, "Error", "Bad password"));
      }

      const accessToken = AuthTokenGenerator.Access({ id: user._id });
      const refreshToken = AuthTokenGenerator.Refresh({ id: user._id });

      res.cookie("refreshtoken", refreshToken, {
        httpOnly: true,
        path: "/api/user/refreshToken",
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      });

      delete user._doc.password;

      return res.status(200).json(
        new SerializeResponse(200, "Ok", "you are login", {
          ...user._doc,
          accessToken,
        })
      );
    } catch (error) {
      unhandleError(error, res);
    }
  },

  logout: async (req: Request, res: Response) => {
    try {
      res.clearCookie("refreshtoken", {
        path: "/api/user/refreshToken",
      });
      return res.status(200).json(new SerializeResponse(200, "Ok", "logout"));
    } catch (error) {
      unhandleError(error, res);
    }
  },

  refreshToken: async (req: Request, res: Response) => {
    try {
      const validateExist = (obj: any) => {
        if (!obj) {
          return res
            .status(400)
            .json(new SerializeResponse(400, "Error", " please log in"));
        }
      };

      const token = req.cookies.refreshtoken;

      validateExist(token);

      const decoded = jwt.verify(
        token,
        `${process.env.REFRESH_TOKEN_SECRET}`
      ) as AuthToken;

      validateExist(decoded);

      const user = await UserService.findUser({ _id: decoded.id }, "-password");

      validateExist(user);

      const accessToken = AuthTokenGenerator.Access({ id: user!._id });

      res.json({ accessToken });
    } catch (error) {}
  },
};

export default userCtrl;
