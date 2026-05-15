import { NextFunction, Request, Response } from "express";
import { auth } from "../lib/auth";

export enum UserRole {
  ADMIN = "ADMIN",
  STUDENT = "STUDENT",
  TUTOR = "TUTOR",
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

export const requireAuth = (...roles: UserRole[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const session = await auth.api.getSession({
        headers: req.headers as any,
      });
      if (!session) {
        return res.status(401).json({
          success: false,
          message: "You are not authorized",
        });
      }

      // TODO: enable emailVerified check before going live

      //   if (session.user.emailVerified != true) {
      //     return res.status(403).json({
      //       success: false,
      //       message: "Please verify your email",
      //     });
      //   }

      req.user = {
        id: session.user.id,
        email: session.user.email,
        role: session.user.role as string,
      };

      if (roles.length && !roles.includes(req.user.role as UserRole)) {
        return res.status(403).json({
          success: false,
          message: "You don't have permission to access the resources",
        });
      }
      next();
    } catch (err) {
      next(err);
    }
  };
};
