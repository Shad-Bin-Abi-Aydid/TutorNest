import { NextFunction, Request, Response } from "express";
import { categoriesServices } from "./category.services";

// create categories
const createCategories = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await categoriesServices.createCategories(req.body);
    res.status(200).send(result);
  } catch (err) {
    next(err);
  }
};

// get All categories
const getAllCategories = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await categoriesServices.getAllCategories();

    res.status(200).send(result);
  } catch (err) {
    next(err);
  }
};

// get Single categories
const getSingleCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const categoryId = req.params.id as string;
    if (!categoryId) {
      res
        .status(400)
        .json({ success: false, message: "Category ID is required" });
      return;
    }

    const result = await categoriesServices.getSingleCategory(categoryId);

    res.status(200).send(result);
  } catch (err) {
    next(err);
  }
};

// Update Category
const updateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const categoryId = req.params.id as string;
    if (!categoryId) {
      res
        .status(400)
        .json({ success: false, message: "Category ID is required" });
      return;
    }

    const result = await categoriesServices.updateCategory(
      categoryId,
      req.body,
    );

    res.status(200).send(result);
  } catch (err) {
    next(err);
  }
};

// Delete category
const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const categoryId = req.params.id as string;
    if (!categoryId) {
      res
        .status(400)
        .json({ success: false, message: "Category ID is required" });
      return;
    }

    const result = await categoriesServices.deleteCategory(categoryId);

    res.status(204).send(result);
  } catch (err) {
    next(err);
  }
}; 

export const categoriesController = {
  createCategories,
  getAllCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory
};
