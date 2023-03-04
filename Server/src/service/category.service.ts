import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import CategoryModel, { CategoryDocument } from "../models/category.model";

export async function addCategory(category: CategoryDocument) {
  return CategoryModel.create(category);
}

export async function getAllCategory() {
  return CategoryModel.find();
}

export async function findCategory(query: FilterQuery<CategoryDocument>) {
  return CategoryModel.findOne(query);
}

export async function findAndUpdateCategory(
  query: FilterQuery<CategoryDocument>,
  update: UpdateQuery<CategoryDocument>,
  options: QueryOptions
) {
  return CategoryModel.findOneAndUpdate(query, update, options);
}

export async function deleteCategory(query: FilterQuery<CategoryDocument>) {
  return CategoryModel.deleteOne(query);
}
