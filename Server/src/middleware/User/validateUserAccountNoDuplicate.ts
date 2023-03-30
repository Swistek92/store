import { unhandleError } from "../../utils/http";
import { SerializeResponse } from "../../utils/http";
import { Request, Response, NextFunction } from "express";
import UserService from "../../service/user.service";

export const validateUserAccountNoDuplicate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const isDuplicated = await UserService.findUser({
      account: req.body.account,
    });
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
