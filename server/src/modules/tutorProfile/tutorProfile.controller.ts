import { NextFunction, Request, Response } from "express";
import { tutorProfileServices } from "./tutorProfile.services";

// create tutorProfile
const createTutorProfile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await tutorProfileServices.createTutorProfile(req.body);

    res.status(201).json({
      success: true,
      message: "Tutor profile created successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

// get all tutorProfiles
const getAllTutorProfiles = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {
      categoryId,
      minPrice,
      maxPrice,
      minRating,
      search,
      sortBy,
      sortOrder,
    } = req.query;

    const filters = {
      categoryId: categoryId as string | undefined,
      minPrice: minPrice ? parseFloat(minPrice as string) : undefined,
      maxPrice: maxPrice ? parseFloat(maxPrice as string) : undefined,
      minRating: minRating ? parseFloat(minRating as string) : undefined,
      search: search as string | undefined,
      sortBy: sortBy as
        | "pricePerHour"
        | "experienceYears"
        | "rating"
        | undefined,
      sortOrder: sortOrder as "asc" | "desc" | undefined,
    };

    const result = await tutorProfileServices.getAllTutorProfiles(filters);

    res.status(200).json({
      success: true,
      message: "All tutor profiles are retrieved successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

// get single tutorProfile
const getSingleTutorProfile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const tutorId = req.params.id as string;

    const result = await tutorProfileServices.getSingleTutorProfile(tutorId);

    if (!result) {
      res.status(404).json({
        success: false,
        message: "Tutor profile not found",
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: "Get tutor profile successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

// update tutorProfile
const updateTutorProfile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const tutorId = req.params.id as string;

    const result = await tutorProfileServices.updateTutorProfile(
      tutorId,
      req.body,
    );

    res.status(200).json({
      success: true,
      message: "update tutor profile successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

// delete TutorProfile
const deleteTutorProfile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const tutorId = req.params.id as string;

    const result = await tutorProfileServices.deleteTutorProfile(tutorId);

    res.status(204).json();
  } catch (err) {
    next(err);
  }
};

export const tutorProfileController = {
  createTutorProfile,
  getAllTutorProfiles,
  getSingleTutorProfile,
  updateTutorProfile,
  deleteTutorProfile,
};
