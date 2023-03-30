import { SerializeResponse } from "./../utils/http";
import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";
import logger from "../utils/logger";
const validateResource =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      return res
        .status(400)
        .json(new SerializeResponse(400, "Error", "Invalid_Type", error));
    }
  };

export default validateResource;
