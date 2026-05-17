import { prisma } from "../../lib/prisma";
import { UserRole } from "../../middlewares/requireAuth";

const bookingInclude = {
  student: { select: { id: true, name: true, email: true } },
  tutorProfile: {
    include: { user: { select: { id: true, name: true, email: true } } },
  },
  category: true,
} as const;

// create booking
const createBooking = async (data: {
  studentId: string;
  tutorProfileId: string;
  categoryId: string;
  scheduledAt: string;
  durationMinutes: number;
}) => {
  const result = await prisma.booking.create({
    data: {
      ...data,
      scheduledAt: new Date(data.scheduledAt),
      status: "CONFIRMED",
    },
    include: bookingInclude,
  });

  return result;
};

// get booking
const getMyBookings = async (userId: string, role: string) => {
  if (role === UserRole.ADMIN) {
    return prisma.booking.findMany({
      include: bookingInclude,
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  if (role === UserRole.TUTOR) {
    const tutorProfile = await prisma.tutorProfile.findUnique({
      where: {
        userId,
      },
    });

    if (!tutorProfile) {
      return [];
    }

    return prisma.booking.findMany({
      where: {
        tutorProfileId: tutorProfile.id,
      },
      include: bookingInclude,
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  return prisma.booking.findMany({
    where: {
      studentId: userId,
    },
    include: bookingInclude,
    orderBy: {
      createdAt: "desc",
    },
  });
};

// get single booking
const getSingleBooking = async (
  bookingId: string,
  userId: string,
  role: string,
) => {
  const result = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: bookingInclude,
  });

  if (!result) return null;

  if (role === UserRole.ADMIN) {
    return result;
  }

  if (role === UserRole.TUTOR && result.tutorProfile.userId === userId) {
    return result;
  }

  if (role === UserRole.STUDENT && result.studentId === userId) {
    return result;
  }

  return null;
};

export const bookingServices = {
  createBooking,
  getMyBookings,
  getSingleBooking,
};
