import { NextFunction, Request, Response } from "express";
import { availabilityServices } from "./availability.services";

// create availability
const createAvailability = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const tutorId = req.user!.id;
    const data = req.body;

    const result = await availabilityServices.createAvailability(tutorId, data);

    if (!result) {
      res.status(400).json({
        success: false,
        message: "Something Went wrong",
      });
      return;
    }

    res.status(201).json({
      success: true,
      message: "availability created successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

// get my availability
const getMyAvailability = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user!.id;

    const result = await availabilityServices.getMyAvailability(userId);

    if (!result) {
      res.status(404).json({
        success: false,
        message: "You are not authorized to see the details",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Successfully retrieved your availabilities",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

// get all availabilities
const getAllAvailabilities = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const tutorProfileId = req.params.id as string;

    const result =
      await availabilityServices.getAllAvailabilities(tutorProfileId);

    if (result.length === 0) {
      res.status(404).json({
        success: false,
        message: "No availabilities found for this tutor",
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: "All availabilities are retrieved successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

// update availability
const updateAvailabilities = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user!.id;
    const availabilityId = req.params.id as string;
    const data = req.body;

    const result = await availabilityServices.updateAvailabilities(
      userId,
      availabilityId,
      data,
    );

    if (!result) {
      res.status(400).json({
        success: false,
        message: "Something  went wrong!",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "availability updated successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

//  delete availability
const deleteAvailability = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userRole = req.user!.role
    const userId = req.user!.id;
    const availabilityId = req.params.id as string;

    const result = await availabilityServices.deleteAvailability(
      userRole,
      userId,
      availabilityId,
    );

    if (!result) {
      res.status(400).json({
        success: false,
        message: "Something  went wrong!",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "availability deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};

export const availabilityController = {
  createAvailability,
  getMyAvailability,
  getAllAvailabilities,
  updateAvailabilities,
  deleteAvailability,
  
};
