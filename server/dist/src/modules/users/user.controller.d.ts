import { NextFunction, Request, Response } from "express";
export declare const userController: {
    getAllUsers: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getSingleUser: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    updateUser: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    deleteUser: (req: Request, res: Response, next: NextFunction) => Promise<void>;
};
//# sourceMappingURL=user.controller.d.ts.map