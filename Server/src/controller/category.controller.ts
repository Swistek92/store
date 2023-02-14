import { Request, Response } from "express";
import { addCategory } from "../service/category.service";

export async function addCategoryHandler(req: Request, res: Response) {
  try {
    const newCategory = await addCategory(req.body);
    return res.status(201).send(newCategory);
  } catch (error) {
    return res.status(404).send(error);
  }
}
