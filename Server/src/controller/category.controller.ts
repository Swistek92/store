import { Request, Response } from "express";
import {
  addCategory,
  findCateogry,
  getAllCategory,
} from "../service/category.service";
import logger from "../utils/logger";

export async function addCategoryHandler(req: Request, res: Response) {
  try {
    const validateConfictError = await findCateogry(req.body.name);
    if (validateConfictError) {
      return res.status(409).send("Category with this name allready exist");
    }
  } catch (error) {
    return res.status(404).send(error);
  }

  try {
    const newCategory = await addCategory(req.body);
    return res.status(201).send(newCategory);
  } catch (error) {
    return res.status(404).send(error);
  }
}

export async function getAllCategoryHandler(req: Request, res: Response) {
  try {
    const category = await getAllCategory();
    return res.status(200).send(category);
  } catch (error) {
    return res.status(404).send(error);
  }
}
