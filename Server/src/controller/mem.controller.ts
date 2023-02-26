import { NextFunction, Request, Response } from "express";
import { addMem } from "../service/mem.service";
import { SerializeResponse, unhandleError } from "../utils/http";
import logger from "../utils/logger";

const memCtrl = {
  addMem: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newMem = await addMem(req.body);
      return res
        .status(201)
        .json(new SerializeResponse(201, "Ok", "Created", newMem));
    } catch (error) {
      return unhandleError(error, res);
    }
  },
};

export default memCtrl;
