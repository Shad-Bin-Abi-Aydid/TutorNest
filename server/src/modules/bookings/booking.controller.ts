import { NextFunction, Request, Response } from "express";
import { bookingServices } from "./booking.services";

// create booking
const createBooking = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await bookingServices.createBooking({
      ...req.body,
      studentId: req.user!.id,
    });

    res.status(201).json({
      success: true,
      message: "Booking made successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

// get all bookings
const getMyBookings = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user!.id;
    const userRole = req.user!.role;

    const result = await bookingServices.getMyBookings(userId, userRole);

    res.status(200).json({
      success: true,
      message: "Booking details found successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

// get single booking
const getSingleBooking = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const role = req.user!.role;
    const userId = req.user!.id;
    const bookingId = req.params.id as string;

    const result = await bookingServices.getSingleBooking(
      bookingId,
      userId,
      role,
    );

    if (!result) {
      res.status(404).json({
        success: false,
        message: "Booking not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Booking found successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const bookingController = {
  createBooking,
  getMyBookings,
  getSingleBooking,
};
