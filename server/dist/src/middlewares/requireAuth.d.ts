import { NextFunction, Request, Response } from "express";
export declare enum UserRole {
    ADMIN = "ADMIN",
    STUDENT = "STUDENT",
    TUTOR = "TUTOR"
}
declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string;
                email: string;
                role: string;
            };
        }
    }
}
export declare const requireAuth: (...roles: UserRole[]) => (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=requireAuth.d.ts.map