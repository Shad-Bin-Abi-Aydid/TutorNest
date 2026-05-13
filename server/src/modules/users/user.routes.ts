import express from "express";
import { userController } from "./user.controller";

const router = express.Router();

// get all users
router.get("/", userController.getAllUsers);

// get single user
router.get("/:id", userController.getSingleUser);

// update user
router.patch("/:id", userController.updateUser);

// delete user
router.delete("/:id", userController.deleteUser);

export const userRoutes = router;