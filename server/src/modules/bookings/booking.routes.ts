import express from "express";
import { bookingController } from "./booking.controller";
import { requireAuth, UserRole } from "../../middlewares/requireAuth";

const router = express.Router();

// create booking
router.post(
  "/",
  requireAuth(UserRole.STUDENT),
  bookingController.createBooking,
);

// get all bookings
router.get("/", requireAuth(), bookingController.getMyBookings);

// get single booking
router.get("/:id", requireAuth(), bookingController.getSingleBooking);

export const bookingRoutes = router;
