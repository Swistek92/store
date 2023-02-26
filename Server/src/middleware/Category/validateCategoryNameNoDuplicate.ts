import { unhandleError } from "../../utils/http";
import { SerializeResponse } from "../../utils/http";
import { Request, Response, NextFunction } from "express";
import { findCategory } from "../../service/category.service";

const validateCategoryNameNoDuplicate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const isDuplicated = await findCategory({ name: req.body.name });
    if (isDuplicated) {
      return res
        .status(409)
        .json(
          new SerializeResponse(409, "Error", "name is allready exist in db")
        );
    }
  } catch (error) {
    return unhandleError(error, res);
  }

  next();
};

export default validateCategoryNameNoDuplicate;
