import { LoginUser } from "./../../config/interface";
import bcrypt from "bcrypt";
import { userSchemas } from "./../schema/user.schema";
import express, { Request, response, Response } from "express";
import validateResource from "../middleware/validateResource";
import {
  validateRouteJustForAdmin,
  validateRouteJustForUser,
  validateUserAccountIsExist,
  validateUserAccountNoDuplicate,
  validateUserIsAdmin,
} from "../middleware/User";
import { SendRegistrationEmail } from "../utils/sendEmail";
import { SendRegistrationSms } from "../utils/sendSMS";
import { SerializeResponse, unhandleError } from "../utils/http";
import AuthTokenGenerator from "../utils/authTokenGenerator";
import logger from "../utils/logger";
import jwt from "jsonwebtoken";
import userCtrl from "../controller/user.controlller";

export const UserRouter = express.Router();

UserRouter.post(
  "/user/register",
  [validateResource(userSchemas.create), validateUserAccountNoDuplicate],
  async (req: Request, res: Response) => {
    const { name, password, account } = req.body;
    try {
      const response = await userCtrl.register({
        name,
        password,
        account,
        SendRegistrationEmail,
        SendRegistrationSms,
        ActiveTokenGenerator: AuthTokenGenerator.Active,
        HashPassword: bcrypt.hash,
      });
      return res.status(response.statusCode).json(response);
    } catch (error) {
      unhandleError(error, res);
    }
  }
);

UserRouter.post("/user/active", async (req: Request, res: Response) => {
  const { activeToken } = req.body;
  if (!activeToken) {
    return res
      .status(400)
      .json(new SerializeResponse(400, "Error", "no activeToken!"));
  }
  try {
    const response = await userCtrl.activeAccount({
      activeToken,
      decodeToken: jwt.verify,
    });
    return res.status(response.statusCode).json(response);
  } catch (error) {
    unhandleError(error, res);
  }
});

// router.post("/user/login", [validateUserAccountIsExist], userCtrl.login);
UserRouter.post(
  "/user/login",
  [validateUserAccountIsExist],
  async (req: Request, res: Response) => {
    const { password, user } = req.body;
    const comparePassword = bcrypt.compare;
    const accessToken = AuthTokenGenerator.Access({ id: user._id });
    const refreshToken = AuthTokenGenerator.Refresh({ id: user._id });

    try {
      const response = await userCtrl.login({
        password,
        user,
        comparePassword,
      });

      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000, // 15min
      });

      res.cookie("refreshtoken", refreshToken, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      });

      return res.status(response.statusCode).json(response);
    } catch (error) {
      unhandleError(error, res);
    }
  }
);

//validate exist user for test during development
UserRouter.get("/user/logout", (req: Request, res: Response) => {
  try {
    res.clearCookie("refreshtoken");
    res.clearCookie("accessToken");

    return res.status(200).json(new SerializeResponse(200, "Ok", "logout"));
  } catch (error) {
    unhandleError(error, res);
  }
});

UserRouter.get("/user/refreshToken", async (req: Request, res: Response) => {
  const token = req.cookies.refreshtoken;
  if (!token) {
    return res
      .status(404)
      .json(new SerializeResponse(400, "Error", "no token"));
  }
  try {
    const response = await userCtrl.refreshToken({
      token,
      validateToken: jwt.verify,
    });
    return res.status(response.statusCode).json(response);
  } catch (error) {
    unhandleError(error, res);
  }
});

UserRouter.get(
  "/user/getAll",
  [validateRouteJustForAdmin],
  async (req: Request, res: Response) => {
    try {
      const response = await userCtrl.getAll();
      return res.status(response.statusCode).json(response);
    } catch (error) {
      unhandleError(error, res);
    }
  }
);

UserRouter.get(
  "/user/justForUserTest",
  [validateRouteJustForUser],
  async (req: Request, res: Response) => {
    res.status(200).json("ok");
  }
);
