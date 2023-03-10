import bcrypt from "bcrypt";
import { userSchemas } from "./../schema/user.schema";
import express, { Request, Response } from "express";
import userCtrl from "../controller/user.controlller";
import validateUserAccountNoDuplicate from "../middleware/User/validateUserAccountNoDuplicate";
import validateResource from "../middleware/validateResource";
import validateUserAccountIsExist from "../middleware/User/validateUserAccountIsExist";
import { SendRegistrationEmail } from "../utils/sendEmail";
import { SendRegistrationSms } from "../utils/sendSMS";
import { SerializeResponse, unhandleError } from "../utils/http";
import AuthTokenGenerator from "../utils/authTokenGenerator";
import logger from "../utils/logger";

const router = express.Router();

router.post(
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

      if (response[0] === "ok") {
        return res
          .status(200)
          .json(new SerializeResponse(200, "Ok", response[1]));
      } else {
        return res
          .status(400)
          .json(new SerializeResponse(400, "Error", response[1]));
      }
    } catch (error) {
      unhandleError(error, res);
    }
  }
);

router.post("/user/active", userCtrl.activeAccount);

router.post("/user/login", [validateUserAccountIsExist], userCtrl.login);

router.get("/user/logout", userCtrl.logout);

router.get("/user/refreshToken", userCtrl.refreshToken);

router.get("/user/getAll", userCtrl.getAll);
export default router;
