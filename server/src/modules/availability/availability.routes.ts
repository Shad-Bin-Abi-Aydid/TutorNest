import express from "express";
import { availabilityController } from "./availability.controller";
import { requireAuth, UserRole } from "../../middlewares/requireAuth";

const router = express.Router();

// create availability
router.post(
  "/",
  requireAuth(UserRole.TUTOR),
  availabilityController.createAvailability,
);

// get my availability
router.get(
  "/my",
  requireAuth(UserRole.TUTOR),
  availabilityController.getMyAvailability,
);

// get all availabilities
router.get("/:id", availabilityController.getAllAvailabilities);

// update availabilities
router.patch(
  "/:id",
  requireAuth(UserRole.TUTOR),
  availabilityController.updateAvailabilities,
);

// delete availability
router.delete(
  "/:id",
  requireAuth(UserRole.TUTOR, UserRole.ADMIN),
  availabilityController.deleteAvailability,
);
export const availabilityRouter = router;
