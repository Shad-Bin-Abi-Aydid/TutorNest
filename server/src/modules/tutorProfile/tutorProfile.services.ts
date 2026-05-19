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
const getAllTutorProfiles = async (filters: {
  categoryId?: string | undefined;
  minPrice?: number | undefined;
  maxPrice?: number | undefined;
  minRating?: number | undefined;
  search?: string | undefined;
  sortBy?: "pricePerHour" | "experienceYears" | "rating" | undefined;
  sortOrder?: "asc" | "desc" | undefined;
}) => {
  const {
    categoryId,
    minPrice,
    maxPrice,
    minRating,
    search,
    sortBy,
    sortOrder,
  } = filters;

  const prismaOrderBy =
    sortBy && sortBy !== "rating"
      ? { [sortBy]: sortOrder ?? "asc" }
      : undefined;

  const result = await prisma.tutorProfile.findMany({
    where: {
      // filter by category
      ...(categoryId && {
        categories: { some: { categoryId } },
      }),

      // filter by pricePerHour
      ...((minPrice !== undefined || maxPrice !== undefined) && {
        pricePerHour: {
          ...(minPrice !== undefined && { gte: minPrice }),
          ...(maxPrice !== undefined && { lte: maxPrice }),
        },
      }),

      // search filter
      ...(search && {
        user: { name: { contains: search, mode: "insensitive" } },
      }),
    },

    include: {
      user: { select: { id: true, name: true, email: true } },
      categories: { include: { category: true } },
      reviews: { select: { rating: true } },
    },
    ...(prismaOrderBy && { orderBy: prismaOrderBy }),
  });

  let profiles = result.map(({ reviews, ...rest }) => ({
    ...rest,
    avgRating:
      reviews.length > 0
        ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        : null,
  }));

  if (minRating !== undefined) {
    profiles = profiles.filter(
      (p) => p.avgRating !== null && p.avgRating >= minRating,
    );
  }

  if (sortBy === "rating") {
    const order = sortOrder === "desc" ? -1 : 1;
    profiles.sort(
      (a, b) => ((a.avgRating ?? -1) - (b.avgRating ?? -1)) * order,
    );
  }

  return profiles;
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
