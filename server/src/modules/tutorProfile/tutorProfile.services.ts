import { prisma } from "../../lib/prisma";

// create tutorProfile
const createTutorProfile = async (data: {
  userId: string;
  bio: string;
  experienceYears: number;
  pricePerHour: number;
  image?: string;
  categoryIds: string[];
}) => {
  // destruct them as categoryIds are not the part of the tutorProfile table
  const { categoryIds, ...profileData } = data;

  if (!categoryIds.length) {
    throw new Error("At least one category is required");
  }

  const result = await prisma.tutorProfile.create({
    data: {
      ...profileData,
      categories: {
        create: categoryIds.map((categoryId) => ({ categoryId })),
      },
    },
    // return full category names instead of just IDs
    include: {
      user: { select: { id: true, name: true, email: true } },
      categories: { include: { category: true } },
    },
  });

  return result;
};

// get all tutorProfiles
const getAllTutorProfiles = async () => {
  const result = await prisma.tutorProfile.findMany({
    include: {
      user: { select: { id: true, name: true, email: true } },
      categories: { include: { category: true } },
    },
  });
  return result;
};

// get single tutorProfile
const getSingleTutorProfile = async (tutorId: string) => {
  const result = await prisma.tutorProfile.findUnique({
    where: {
      id: tutorId,
    },
    include: {
      user: { select: { id: true, name: true, email: true } },
      categories: { include: { category: true } },
    },
  });
  return result;
};

// update tutorProfile
const updateTutorProfile = async (
  tutorId: string,
  data: {
    bio?: string;
    experienceYears?: number;
    pricePerHour?: number;
    image?: string;
    categoryIds?: string[];
  },
) => {
  const { categoryIds, ...profileData } = data;
  const result = await prisma.tutorProfile.update({
    where: {
      id: tutorId,
    },
    data: {
      ...profileData,
      ...(categoryIds && {
        categories: {
          deleteMany: {},
          create: categoryIds.map((categoryId) => ({ categoryId })),
        },
      }),
    },
    include: {
      user: { select: { id: true, name: true, email: true } },
      categories: { include: { category: true } },
    },
  });
  return result;
};

// delete tutorProfile
const deleteTutorProfile = async (tutorId: string) => {
  const result = await prisma.tutorProfile.delete({
    where: {
      id: tutorId,
    },
  });
  return result;
};

export const tutorProfileServices = {
  createTutorProfile,
  getAllTutorProfiles,
  getSingleTutorProfile,
  updateTutorProfile,
  deleteTutorProfile,
};
