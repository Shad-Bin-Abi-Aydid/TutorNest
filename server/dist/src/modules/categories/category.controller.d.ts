import { NextFunction, Request, Response } from "express";
export declare const categoriesController: {
    createCategories: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getAllCategories: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getSingleCategory: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    updateCategory: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    deleteCategory: (req: Request, res: Response, next: NextFunction) => Promise<void>;
};
//# sourceMappingURL=category.controller.d.ts.map