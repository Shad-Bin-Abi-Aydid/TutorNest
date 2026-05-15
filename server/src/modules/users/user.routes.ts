import express from "express";
import { userController } from "./user.controller";
import { requireAuth, UserRole } from "../../middlewares/requireAuth";

const router = express.Router();

// get all users
router.get("/", requireAuth(UserRole.ADMIN), userController.getAllUsers);

// get single user
router.get("/:id", requireAuth(UserRole.ADMIN), userController.getSingleUser);

// update user
router.patch("/:id", requireAuth(UserRole.ADMIN), userController.updateUser);

// delete user
router.delete("/:id", requireAuth(UserRole.ADMIN), userController.deleteUser);

export const userRoutes = router;