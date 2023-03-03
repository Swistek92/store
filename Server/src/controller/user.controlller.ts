import { SerializeResponse, unhandleError } from "../utils/http";
import { NextFunction, Request, Response } from "express";
import UserModel from "../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { addUser } from "../service/user.service";
import { generateActiveToken } from "../utils/authTokens";
import sendEmail from "../utils/sendEmail";
import { sendSms } from "../utils/sendSMS";
import logger from "../utils/logger";
import { AuthToken } from "../../config/interface";

const CLIENT_URL = `${process.env.BASE_URL}`;

const userCtrl = {
  register: async (req: Request, res: Response) => {
    try {
      const { name, password, account } = req.body;
      const passwordHash = await bcrypt.hash(password, 12);

      // const newUser = await addUser(req.body);
      const newUser = { name, account, password: passwordHash };

      const activeToken = generateActiveToken({ newUser });
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
      const user = await addUser(newUser);
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
  getAll: async () => {
    try {
    } catch (error) {}
  },
};

export default userCtrl;
