import express from "express";
import { categoriesController } from "./category.controller";

const router  = express.Router();

// create Categories
router.post("/", categoriesController.createCategories);

// get categories
router.get("/", categoriesController.getAllCategories);

// get Single category
router.get("/:id", categoriesController.getSingleCategory);

// update Category
router.patch("/:id", categoriesController.updateCategory);

// Delete Category
router.delete("/:id", categoriesController.deleteCategory);


export const categoriesRoutes = router;