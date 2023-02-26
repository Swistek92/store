import express from "express";
import validateResource from "../middleware/validateResource";
import { createMemSchema } from "../schema/mem.schema";
import memCtrl from "../controller/mem.controller";
import saveImageToCloudinary from "../middleware/saveImageToCloudinary";

const router = express.Router();

router.post(
  "/mem",
  [validateResource(createMemSchema), saveImageToCloudinary],
  memCtrl.addMem
);

export default router;
