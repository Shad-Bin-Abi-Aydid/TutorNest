import { categoriesServices } from "./category.services";
// create categories
const createCategories = async (req, res, next) => {
    try {
        const result = await categoriesServices.createCategories(req.body);
        res.status(201).json({
            success: true,
            message: "Category created successfully",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
};
// get All categories
const getAllCategories = async (req, res, next) => {
    try {
        const result = await categoriesServices.getAllCategories();
        res.status(200).json({
            success: true,
            message: "All categories retrieved successfully",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
};
// get Single categories
const getSingleCategory = async (req, res, next) => {
    try {
        const categoryId = req.params.id;
        const result = await categoriesServices.getSingleCategory(categoryId);
        if (!result) {
            res.status(404).json({
                success: false,
                message: "Category not found",
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: "Category retrieved successfully",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
};
// Update Category
const updateCategory = async (req, res, next) => {
    try {
        const categoryId = req.params.id;
        const result = await categoriesServices.updateCategory(categoryId, req.body);
        res.status(200).json({
            success: true,
            message: "Category updated successfully",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
};
// Delete category
const deleteCategory = async (req, res, next) => {
    try {
        const categoryId = req.params.id;
        const result = await categoriesServices.deleteCategory(categoryId);
        res.status(204).json();
    }
    catch (err) {
        next(err);
    }
};
export const categoriesController = {
    createCategories,
    getAllCategories,
    getSingleCategory,
    updateCategory,
    deleteCategory,
};
//# sourceMappingURL=category.controller.js.map