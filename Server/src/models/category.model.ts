import mongoose from "mongoose";

export interface CategoryDocument extends mongoose.Document {
  name: String;
  active: boolean;
  nestedCategories?: [String];
  description?: string;
}

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  active: {
    default: true,
    require: true,
    type: Boolean,
  },
  nestedCategories: {
    require: false,
    type: [String],
  },
  description: {
    require: false,
    type: String,
  },
});

const CategoryModel = mongoose.model<CategoryDocument>(
  "Category",
  categorySchema
);

export default CategoryModel;
