import { BookingStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";

// create review
const createReview = async (
  studentId: string,
  data: { bookingId: string; rating: number; comment?: string },
) => {
  // find out the booking first
  const booking = await prisma.booking.findUnique({
    where: {
      id: data.bookingId,
    },
  });

  // if booking is not exist
  if (!booking) {
    return { error: "Booking not found" };
  }

  // check the booking studentId is the same login user
  if (studentId !== booking.studentId) {
    return { error: "You can only review your own bookings" };
  }

  // check the booking status is completed or not
  if (booking.status !== BookingStatus.COMPLETED) {
    return { error: "Sorry, the booking is not completed yet!" };
  }

  // check the review already exist or not
  const review = await prisma.review.findUnique({
    where: {
      bookingId: data.bookingId,
    },
  });
  if (review) {
    return { error: "Review already exist for this booking" };
  }

  // now we create the review
  const result = await prisma.review.create({
    data: {
      bookingId: data.bookingId,
      studentId,
      tutorProfileId: booking.tutorProfileId,
      rating: data.rating,
      comment: data.comment ?? null,
    },
    include: {
      student: { select: { id: true, name: true } },
    },
  });

  return { data: result };
};

// get review
const getTutorReviews = async (tutorProfileId: string) => {
  const result = await prisma.review.findMany({
    where: { tutorProfileId },
    include: {
      student: { select: { id: true, name: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return result;
};

export const reviewServices = {
  createReview,
  getTutorReviews,
};
