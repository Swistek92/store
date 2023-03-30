import express from "express";
import validateResource from "../middleware/validateResource";
import { createMemSchema } from "../schema/mem.schema";
import memCtrl from "../controller/mem.controller";
import saveImageToCloudinary from "../middleware/saveImageToCloudinary";

export const MemRouter = express.Router();

MemRouter.post(
  "/mem",
  [validateResource(createMemSchema), saveImageToCloudinary],
  memCtrl.addMem
);

export default MemRouter;
