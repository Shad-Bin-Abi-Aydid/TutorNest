import express from "express";
import { categoriesController } from "./category.controller";
import { requireAuth, UserRole } from "../../middlewares/requireAuth";

const router  = express.Router();

// create Categories
router.post("/", requireAuth(UserRole.ADMIN), categoriesController.createCategories);

// get categories
router.get("/", categoriesController.getAllCategories);

// get Single category
router.get("/:id", categoriesController.getSingleCategory);

// update Category
router.patch("/:id", requireAuth(UserRole.ADMIN), categoriesController.updateCategory);

// Delete Category
router.delete("/:id", requireAuth(UserRole.ADMIN), categoriesController.deleteCategory);


export const categoriesRoutes = router;