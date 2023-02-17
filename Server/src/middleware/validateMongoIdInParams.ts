import { isValidObjectId } from "mongoose";
import { unhandleError } from "../utils/http";
import { SerializeResponse } from "../utils/http";
import { Request, Response, NextFunction } from "express";
import { findCategory } from "../service/category.service";

const validateMongoIdInParams = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!isValidObjectId(req.params.id)) {
    return res
      .status(404)
      .json(new SerializeResponse(404, "Error", "invalid Id"));
  }
  next();
};

export default validateMongoIdInParams;
