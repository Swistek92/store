import mongoose from "mongoose";

export interface MemDocument extends mongoose.Document {
  title: String;
  image: String;
  author: String;
  active: boolean;
  categories: [String];
  description?: string;
}

const MemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
    require: true,
    unique: true,
  },
  author: {
    type: String,
    require: true,
    unique: false,
  },
  active: {
    default: true,
    require: true,
    type: Boolean,
  },
  categories: {
    require: true,
    type: [String],
  },
  description: {
    require: false,
    type: String,
  },
});

const MemModel = mongoose.model<MemDocument>("Mem", MemSchema);

export default MemModel;
