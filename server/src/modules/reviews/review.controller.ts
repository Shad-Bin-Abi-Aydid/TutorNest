import { NextFunction, Request, Response } from "express";
import { reviewServices } from "./review.services";

// for create review
const createReview = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const studentId = req.user!.id as string;

    const result = await reviewServices.createReview(studentId, req.body);

    if (result.error) {
      res.status(400).json({
        success: false,
        message: result.error,
      });
      return;
    }

    res.status(201).json({
      success: true,
      message: "Review submitted successfully",
      data: result.data,
    });
  } catch (err) {
    next(err);
  }
};

// For getTutorReviews
const getTutorReviews = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const tutorProfileId = req.params.tutorProfileId as string;

    const result = await reviewServices.getTutorReviews(tutorProfileId);

    if (result.length === 0) {
      res.status(404).json({
        success: false,
        message: "No review found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "review found successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const reviewController = {
  createReview,
  getTutorReviews,
};
