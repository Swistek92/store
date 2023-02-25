import { isValidObjectId } from "mongoose";
import { SerializeResponse } from "../utils/http";
import { Request, Response, NextFunction } from "express";

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
