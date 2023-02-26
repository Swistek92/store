import { SerializeResponse, unhandleError } from "../utils/http";
import { NextFunction, Request, Response } from "express";
import UserModel from "../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userCtrl = {
  register: async (req: Request, res: Response) => {
    try {
      const { name, account, password } = req.body;
      const passwordHash = await bcrypt.hash(password, 12);

      const newUser = new UserModel({
        name,
        account,
        password: passwordHash,
      });

      res
        .status(201)
        .json(new SerializeResponse(201, "Ok", "User created", newUser));
    } catch (error) {
      unhandleError(error, res);
    }
  },
};

export default userCtrl;
