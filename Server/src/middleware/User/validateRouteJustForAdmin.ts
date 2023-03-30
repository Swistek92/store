import { unhandleError } from "../../utils/http";
import { SerializeResponse } from "../../utils/http";
import { Request, Response, NextFunction } from "express";
import UserService from "../../service/user.service";
import { verify, decode } from "jsonwebtoken";
import { AuthToken } from "../../../config/interface";

export const validateRouteJustForAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // req.cookies;
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
      return res
        .status(401)
        .json(new SerializeResponse(401, "Error", "no token, login in"));
    }

    const token = verify(accessToken, `${process.env.ACESS_TOKEN_PRIVATE}`, {
      algorithms: ["RS256"],
    });

    if (!token) {
      return res
        .status(401)
        .json(
          new SerializeResponse(401, "Error", "no token valid token, login in")
        );
    }

    const decoded = decode(accessToken) as AuthToken;

    const user = await UserService.findUser({
      _id: decoded.id,
    });

    if (!user || user.role !== "Admin") {
      return res
        .status(401)
        .json(new SerializeResponse(401, "Error", "you are not a Admin"));
    }
  } catch (error) {
    return unhandleError(error, res);
  }

  next();
};
