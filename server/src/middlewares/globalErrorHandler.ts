import { NextFunction, Request, Response } from "express";

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Something went wrong",
    error:
      process.env.NODE_ENV === "development" ? err : "Something went wrong",
  });
};

export default globalErrorHandler;
