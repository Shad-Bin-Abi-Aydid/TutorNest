import { prisma } from "../../lib/prisma";

// Create categories
const createCategories = async (data: { name: string }) => {
  const result = await prisma.category.create({
    data,
  });

  return result;
};

// get all Categories
const getAllCategories = async () => {
  const result = await prisma.category.findMany();

  return result;
};

// get Single Categories
const getSingleCategory = async (id: string) => {
  const result = await prisma.category.findUnique({
    where: {
      id,
    },
  });

  return result;
};

// Update Categories
const updateCategory = async (categoryId: string, data: { name: string }) => {
  const result = await prisma.category.update({
    where: {
      id: categoryId,
    },
    data,
  });

  return result;
};

// delete Category
const deleteCategory = async (id: string) => {
  const result = await prisma.category.delete({
    where: {
      id,
    },
  });

  return result;
};

export const categoriesServices = {
  createCategories,
  getAllCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory,
};
