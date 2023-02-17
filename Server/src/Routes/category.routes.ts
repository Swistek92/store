import {
  createCategorySchema,
  updateCategorySchema,
} from "../schema/category.schema";
import { Express } from "express";
import validateResource from "../middleware/validateResource";
import {
  addCategoryHandler,
  getAllCategoryHandler,
  updateCategoryHandler,
} from "../controller/category.controller";
import validateMongoIdInParams from "../middleware/validateMongoIdInParams";
import validateCategoryIsExist from "../middleware/validateCategoryIsExist";

const CategoryRoutes = (app: Express) => {
  app.post(
    "/api/category/",
    validateResource(createCategorySchema),
    addCategoryHandler
  );

  app.get("/api/category", getAllCategoryHandler);

  app.put(
    "/api/category/:id",
    [
      validateResource(updateCategorySchema),
      validateMongoIdInParams,
      validateCategoryIsExist,
    ],
    updateCategoryHandler
  );
};

export default CategoryRoutes;
