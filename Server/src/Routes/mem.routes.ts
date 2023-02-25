import { Express } from "express";
import validateResource from "../middleware/validateResource";
import validateMongoIdInParams from "../middleware/validateMongoIdInParams";
import { createMemSchema } from "../schema/mem.schema";
import { addMemHandler } from "../controller/mem.controller";
import saveImageToCloudinary from "../middleware/saveImageToCloudinary";

const MemRoutes = (app: Express) => {
  // app.post(
  //   "/api/mem/",
  //   [validateResource(createCategorySchema), validateCategoryNameNoExist],
  //   addCategoryHandler
  // );
  app.post(
    "/api/mem/",
    [validateResource(createMemSchema), saveImageToCloudinary],
    addMemHandler
  );
};

export default MemRoutes;
