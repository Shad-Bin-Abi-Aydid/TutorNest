import express from "express";
import { tutorProfileController } from "./tutorProfile.controller";

const router = express.Router();

// create tutorProfile
router.post("/",tutorProfileController.createTutorProfile);

// get all tutorProfiles
router.get("/", tutorProfileController.getAllTutorProfiles);

// get single tutorProfile
router.get("/:id",tutorProfileController.getSingleTutorProfile);

// update tutorProfile
router.patch("/:id", tutorProfileController.updateTutorProfile);

// delete tutorProfile
router.delete("/:id", tutorProfileController.deleteTutorProfile);



export const tutorProfileRoutes = router;