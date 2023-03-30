import { unhandleError } from "../../utils/http";
import { SerializeResponse } from "../../utils/http";
import { Request, Response, NextFunction } from "express";
import UserService from "../../service/user.service";
import jwt from "jsonwebtoken";

export const validateRouteJustForUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
      return res
        .status(401)
        .json(new SerializeResponse(401, "Error", "no token, login in"));
    }

    const token = jwt.verify(
      accessToken,
      `${process.env.ACESS_TOKEN_PRIVATE}`,
      { algorithms: ["RS256"] }
    );
    if (!token) {
      return res
        .status(401)
        .json(
          new SerializeResponse(401, "Error", "no token valid token, login in")
        );
    }
  } catch (error) {
    return unhandleError(error, res);
  }

  next();
};
