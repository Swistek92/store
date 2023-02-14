import { createCategorySchema } from "../schema/category.schema";
import { Express } from "express";
import validateResource from "../middleware/validateResource";
import { addCategoryHandler } from "../controller/category.controller";

const CategoryRoutes = (app: Express) => {
  app.post(
    "/api/category/",
    validateResource(createCategorySchema),
    addCategoryHandler
  );
};

export default CategoryRoutes;
