import CategoryModel, { CategoryDocument } from "../models/category.model";

export async function addCategory(category: CategoryDocument) {
  return CategoryModel.create(category);
}
