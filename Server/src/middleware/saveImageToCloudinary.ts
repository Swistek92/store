import { isValidObjectId } from "mongoose";
import { SerializeResponse } from "../utils/http";
import { Request, Response, NextFunction } from "express";
import cloudinary from "../utils/cloudinary";
import logger from "../utils/logger";

const saveImageToCloudinary = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const img = req.body.image;
    const uploadImg = await cloudinary.v2.uploader.upload(img, {
      folder: "Mem",
      resource_type: "image",
    });
    req.body.image = uploadImg.secure_url;
  } catch (error) {
    throw new Error("upload img problem");
  }

  next();
};

export default saveImageToCloudinary;
