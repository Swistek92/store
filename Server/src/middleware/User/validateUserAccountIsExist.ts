import { unhandleError } from "../../utils/http";
import { SerializeResponse } from "../../utils/http";
import { Request, Response, NextFunction } from "express";
import UserService from "../../service/user.service";

const validateUserAccountIsExist = async (
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
    } else {
      req.body.user = user;
    }
  } catch (error) {
    return unhandleError(error, res);
  }

  next();
};

export default validateUserAccountIsExist;
