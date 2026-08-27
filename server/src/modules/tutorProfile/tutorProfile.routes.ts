import express from "express";
import { tutorProfileController } from "./tutorProfile.controller";
import { requireAuth, UserRole } from "../../middlewares/requireAuth";

const router = express.Router();

// create tutorProfile
router.post(
  "/",
  requireAuth(UserRole.TUTOR),
  tutorProfileController.createTutorProfile,
);

// get all tutorProfiles
router.get("/", tutorProfileController.getAllTutorProfiles);

// get tutorProfile by UserID (own - me)
router.get(
  "/me",
  requireAuth(UserRole.TUTOR),
  tutorProfileController.getMyTutorProfile,
);

// get single tutorProfile
router.get("/:id", tutorProfileController.getSingleTutorProfile);

// update tutorProfile
router.patch(
  "/:id",
  requireAuth(UserRole.TUTOR, UserRole.ADMIN),
  tutorProfileController.updateTutorProfile,
);

// delete tutorProfile
router.delete(
  "/:id",
  requireAuth(UserRole.TUTOR, UserRole.ADMIN),
  tutorProfileController.deleteTutorProfile,
);

export const tutorProfileRoutes = router;
