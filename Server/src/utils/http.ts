import { Response } from "express";
import logger from "./logger";

export class SerializeResponse {
  constructor(
    public statusCode: number,
    public status: "Error" | "Ok",
    public message: string,
    public data?: any
  ) {}
}

export const unhandleError = (error: any, res: Response) => {
  logger.error(error);
  return res
    .status(404)
    .json(
      new SerializeResponse(404, "Error", "Something went wrong...", error)
    );
};
