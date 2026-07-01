import express from "express";
import { reviewController } from "./review.controller";
import { requireAuth, UserRole } from "../../middlewares/requireAuth";

const router = express.Router();

router.post("/", requireAuth(UserRole.STUDENT), reviewController.createReview);

router.get("/tutor/:tutorProfileId", reviewController.getTutorReviews);

export const reviewRouter = router;
