import { Prisma } from "../../../generated/prisma/client";
import { Role, UserStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";

// get All users
const getAllUsers = async () => {
  const result = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      createdAt: true,
    },
  });

  return result;
};

// get single user
const getSingleUser = async (id: string) => {
  const result = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      createdAt: true,
    },
  });

  return result;
};

// Update user
const updateUser = async (
  id: string,
  data: {
    name?: string;
    role?: Role;
    status?: UserStatus;
  },
) => {
  const result = await prisma.user.update({
    where: {
      id,
    },
    data: data as Prisma.UserUpdateInput,
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      createdAt: true,
    },
  });

  return result;
};

// delete user
const deleteUser = async (id: string) => {
  const result = await prisma.user.delete({
    where: {
      id,
    },
  });

  return result;
};

export const userServices = {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
