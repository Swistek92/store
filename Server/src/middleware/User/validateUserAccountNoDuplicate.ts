import { unhandleError } from "../../utils/http";
import { SerializeResponse } from "../../utils/http";
import { Request, Response, NextFunction } from "express";
import { findCategory } from "../../service/category.service";
import { findUserAccount } from "../../service/user.service";

const validateUserAccountNoDuplicate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const isDuplicated = await findUserAccount(req.body.account);
    if (isDuplicated) {
      return res
        .status(409)
        .json(
          new SerializeResponse(
            409,
            "Error",
            "account with that email or phone allready exist"
          )
        );
    }
  } catch (error) {
    return unhandleError(error, res);
  }

  next();
};

export default validateUserAccountNoDuplicate;
