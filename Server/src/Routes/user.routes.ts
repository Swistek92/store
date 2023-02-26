import express from "express";
import userCtrl from "../controller/user.controlller";
import validateUserAccountNoDuplicate from "../middleware/User/validateUserAccountNoDuplicate";

const router = express.Router();

router.post("/user", validateUserAccountNoDuplicate, userCtrl.register);

export default router;
