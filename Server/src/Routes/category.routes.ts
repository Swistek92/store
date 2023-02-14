import { createCategorySchema } from "../schema/category.schema";
import { Express } from "express";
import validateResource from "../middleware/validateResource";
import {
  addCategoryHandler,
  getAllCategoryHandler,
} from "../controller/category.controller";

const CategoryRoutes = (app: Express) => {
  app.post(
    "/api/category/",
    validateResource(createCategorySchema),
    addCategoryHandler
  );

  app.get("/api/category", getAllCategoryHandler);
};

export default CategoryRoutes;
