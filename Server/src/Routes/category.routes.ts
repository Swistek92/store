import express from "express";
import validateResource from "../middleware/validateResource";
import validateMongoIdInParams from "../middleware/validateMongoIdInParams";
import validateCategoryIsExist from "../middleware/Category/validateCategoryIsExist";
import validateCategoryNameNoDuplicate from "../middleware/Category/validateCategoryNameNoDuplicate";

import { categorySchemas } from "../schema/category.schema";
import categoryCtrl from "../controller/category.controller";

export const CategoryRouter = express.Router();

CategoryRouter.post(
  "/category",
  [validateResource(categorySchemas.create), validateCategoryNameNoDuplicate],
  categoryCtrl.addCategoryHandler
);

CategoryRouter.get("/category", categoryCtrl.getAllCategoryHandler);

CategoryRouter.put(
  "/category/:id",
  [
    validateResource(categorySchemas.update),
    validateMongoIdInParams,
    validateCategoryIsExist,
  ],
  categoryCtrl.updateCategoryHandler
);

CategoryRouter.delete(
  "/category/:id",
  [
    validateResource(categorySchemas.delete),
    validateMongoIdInParams,
    validateCategoryIsExist,
  ],
  categoryCtrl.deleteCategoryHandler
);
