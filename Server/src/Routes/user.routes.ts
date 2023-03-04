import { userSchemas } from "./../schema/user.schema";
import express from "express";
import userCtrl from "../controller/user.controlller";
import validateUserAccountNoDuplicate from "../middleware/User/validateUserAccountNoDuplicate";
import validateResource from "../middleware/validateResource";
import validateUserAccountIsExist from "../middleware/User/validateUserAccountIsExist";

const router = express.Router();

router.post(
  "/user/register",
  [validateResource(userSchemas.create), validateUserAccountNoDuplicate],
  userCtrl.register
);

router.post("/user/active", userCtrl.activeAccount);

router.post("/user/login", [validateUserAccountIsExist], userCtrl.login);

router.get("/user/logout", userCtrl.logout);

router.get("/user/refreshToken", userCtrl.refreshToken);

// Add middleware for restrict just for  a admin

router.get("/user/getAll", userCtrl.getAll);
export default router;
