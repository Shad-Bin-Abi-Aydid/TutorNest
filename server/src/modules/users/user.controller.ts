import { NextFunction, Request, Response } from "express";
import { userServices } from "./user.services";


// get all users
const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await userServices.getAllUsers();

    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

// get single user
const getSingleUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.params.id as string;

    const result = await userServices.getSingleUser(userId);
    if (!result) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "User retrieved successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

// update user
const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.params.id as string;

    const result = await userServices.updateUser(userId, req.body);

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

// delete user
const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.params.id as string;

    if (userId === req.user!.id) {
      res.status(403).json({
        success: false,
        message: "You can't delete your own account",
      });
      return;
    }

    const result = await userServices.deleteUser(userId);

    if (result.error) {
      res.status(409).json({
        success: false,
        message: result.error,
      });
      return;
    }

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

export const userController = {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
