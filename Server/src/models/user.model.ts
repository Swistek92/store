import { kMaxLength } from "buffer";
import mongoose from "mongoose";

export interface UserDocument {
  name: String;
  account: String;
  password: String;
  avatar?: string;
}

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "plase add your name"],
      trim: true,
      maxLength: [20, "you name is up to 20chars long"],
    },
    account: {
      type: String,
      require: [true, "please add your email or phone"],
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      require: [true, "please add your password"],
      trim: true,
    },
    role: {
      type: String,
      deflaut: "User",
    },
    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/dftyei6oe/image/upload/v1672864895/Projekt_bez_tytu%C5%82u_bxirno.jpg",
    },
    type: {
      type: String,
      default: "normal",
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
