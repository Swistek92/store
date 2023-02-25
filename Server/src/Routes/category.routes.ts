import { Express } from "express";
import validateResource from "../middleware/validateResource";
import {
  addCategoryHandler,
  deleteCategoryHandler,
  getAllCategoryHandler,
  updateCategoryHandler,
} from "../controller/category.controller";
import validateMongoIdInParams from "../middleware/validateMongoIdInParams";
import validateCategoryIsExist from "../middleware/Category/validateCategoryIsExist";
import validateCategoryNameNoExist from "../middleware/Category/validateCategoryNameNoExist";
import {
  createCategorySchema,
  deleteCategorySchema,
  updateCategorySchema,
} from "../schema/category.schema";

const CategoryRoutes = (app: Express) => {
  app.post(
    "/api/category/",
    [validateResource(createCategorySchema), validateCategoryNameNoExist],
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

  app.delete(
    "/api/category/:id",
    [
      validateResource(deleteCategorySchema),
      validateMongoIdInParams,
      validateCategoryIsExist,
    ],
    deleteCategoryHandler
  );
};

export default CategoryRoutes;
