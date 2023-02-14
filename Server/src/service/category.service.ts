import CategoryModel, { CategoryDocument } from "../models/category.model";
import logger from "../utils/logger";

export async function addCategory(category: CategoryDocument) {
  return CategoryModel.create(category);
}

export async function getAllCategory() {
  return CategoryModel.find();
}

export async function findCateogry(name: string) {
  return CategoryModel.findOne({ name });
}
