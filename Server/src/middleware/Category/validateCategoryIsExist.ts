import { isValidObjectId } from "mongoose";
import { unhandleError } from "../../utils/http";
import { SerializeResponse } from "../../utils/http";
import { Request, Response, NextFunction } from "express";
import { findCategory } from "../../service/category.service";

const validateCategoryIsExist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const category = await findCategory({ _id: req.params.id });
    if (!category) {
      return res
        .status(422)
        .json(
          new SerializeResponse(
            422,
            "Error",
            "category with this Id do not exist"
          )
        );
    }
  } catch (error) {
    return unhandleError(error, res);
  }

  next();
};

export default validateCategoryIsExist;
