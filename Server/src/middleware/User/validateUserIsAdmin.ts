import { unhandleError } from "../../utils/http";
import { SerializeResponse } from "../../utils/http";
import { Request, Response, NextFunction } from "express";
import UserService from "../../service/user.service";

export const validateUserIsAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await UserService.findUser({
      account: req.body.account,
    });
    if (!user) {
      return res
        .status(400)
        .json(new SerializeResponse(400, "Error", "this account do not exist"));
    } else if (user.role !== "Admin") {
      return res
        .status(401)
        .json(
          new SerializeResponse(401, "Error", "Unauthorized, you are not admin")
        );
    }
  } catch (error) {
    return unhandleError(error, res);
  }

  next();
};
