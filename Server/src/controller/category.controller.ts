import { CategoryDocument } from "./../models/category.model";
import { NextFunction, Request, Response } from "express";
import {
  addCategory,
  deleteCategory,
  findAndUpdateCategory,
  findCategory,
  getAllCategory,
} from "../service/category.service";
import { SerializeResponse, unhandleError } from "../utils/http";
import logger from "../utils/logger";

export async function deleteCategoryHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // await validateExistCategory(req.body.name, res);

  try {
    const deletedCategory = await deleteCategory({ name: req.query.name });
    res
      .status(204)
      .json(
        new SerializeResponse(204, "Ok", "Category deleted", deletedCategory)
      );
  } catch (error) {
    unhandleError(error, res);
  }
}
interface updateBody {
  oldName: string;
  newObj: Object;
}

export async function updateCategoryHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const update = req.body;

  try {
    const updateCategory = await findAndUpdateCategory(
      { _id: req.params.id },
      update,
      {
        new: true,
      }
    );
    return res
      .status(200)
      .json(
        new SerializeResponse(200, "Ok", "Category Updated", updateCategory)
      );
  } catch (error) {
    unhandleError(error, res);
  }
}

export async function addCategoryHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const isDuplicated = await findCategory({ name: req.body.name });

  if (isDuplicated) {
    return res
      .status(409)
      .json(
        new SerializeResponse(409, "Error", "name is allready exist in db")
      );
  }

  try {
    const newCategory = await addCategory(req.body);
    return res
      .status(201)
      .json(new SerializeResponse(201, "Ok", "Created", newCategory));
  } catch (error) {
    return unhandleError(error, res);
  }
}

export async function getAllCategoryHandler(req: Request, res: Response) {
  try {
    const category = await getAllCategory();
    return res
      .status(200)
      .json(new SerializeResponse(200, "Ok", "Your Categories", category));
  } catch (error) {
    return unhandleError(error, res);
  }
}
