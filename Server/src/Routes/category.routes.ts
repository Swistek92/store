import express from "express";
import validateResource from "../middleware/validateResource";
import validateMongoIdInParams from "../middleware/validateMongoIdInParams";
import validateCategoryIsExist from "../middleware/Category/validateCategoryIsExist";
import validateCategoryNameNoDuplicate from "../middleware/Category/validateCategoryNameNoDuplicate";

import { categorySchemas } from "../schema/category.schema";
import categoryCtrl from "../controller/category.controller";

const router = express.Router();

router.post(
  "/category",
  [validateResource(categorySchemas.create), validateCategoryNameNoDuplicate],
  categoryCtrl.addCategoryHandler
);

router.get("/category", categoryCtrl.getAllCategoryHandler);

router.put(
  "/category/:id",
  [
    validateResource(categorySchemas.update),
    validateMongoIdInParams,
    validateCategoryIsExist,
  ],
  categoryCtrl.updateCategoryHandler
);

router.delete(
  "/category/:id",
  [
    validateResource(categorySchemas.delete),
    validateMongoIdInParams,
    validateCategoryIsExist,
  ],
  categoryCtrl.deleteCategoryHandler
);

export default router;
