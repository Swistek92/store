import { userSchemas } from "./../schema/user.schema";
import express from "express";
import userCtrl from "../controller/user.controlller";
import validateUserAccountNoDuplicate from "../middleware/User/validateUserAccountNoDuplicate";
import validateResource from "../middleware/validateResource";

const router = express.Router();

router.post(
  "/user/register",
  [validateResource(userSchemas.create), validateUserAccountNoDuplicate],
  userCtrl.register
);

router.post("/user/active", userCtrl.activeAccount);
export default router;
