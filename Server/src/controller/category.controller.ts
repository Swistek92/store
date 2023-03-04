import { NextFunction, Request, Response } from "express";
import {
  addCategory,
  deleteCategory,
  findAndUpdateCategory,
  getAllCategory,
} from "../service/category.service";
import { SerializeResponse, unhandleError } from "../utils/http";

const categoryCtrl = {
  deleteCategoryHandler: async (req: Request, res: Response) => {
    try {
      const deletedCategory = await deleteCategory({ _id: req.params.id });
      res
        .status(204)
        .json(
          new SerializeResponse(204, "Ok", "Category deleted", deletedCategory)
        );
    } catch (error) {
      unhandleError(error, res);
    }
  },

  updateCategoryHandler: async (req: Request, res: Response) => {
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
  },

  addCategoryHandler: async (req: Request, res: Response) => {
    try {
      const newCategory = await addCategory(req.body);
      return res
        .status(201)
        .json(new SerializeResponse(201, "Ok", "Created", newCategory));
    } catch (error) {
      return unhandleError(error, res);
    }
  },

  getAllCategoryHandler: async (req: Request, res: Response) => {
    try {
      const category = await getAllCategory();
      return res
        .status(200)
        .json(new SerializeResponse(200, "Ok", "Your Categories", category));
    } catch (error) {
      return unhandleError(error, res);
    }
  },
};

export default categoryCtrl;
