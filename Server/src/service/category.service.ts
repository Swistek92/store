import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import CategoryModel, { CategoryDocument } from "../models/category.model";
import logger from "../utils/logger";
export async function addCategory(category: CategoryDocument) {
  return CategoryModel.create(category);
}

export async function getAllCategory() {
  return CategoryModel.find();
}

interface findQuery {
  _id?: any;
  name?: string;
}

export async function findCategory({ _id, name }: findQuery) {
  if (_id) {
    return CategoryModel.findOne({ _id: String(_id) });
  } else if (name) {
    return CategoryModel.findOne({ name: String(name) });
  } else {
    throw new Error("query is required");
  }
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
