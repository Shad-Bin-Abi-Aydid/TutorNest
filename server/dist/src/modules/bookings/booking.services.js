import { BookingStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import { UserRole } from "../../middlewares/requireAuth";
const bookingInclude = {
    student: { select: { id: true, name: true, email: true } },
    tutorProfile: {
        include: { user: { select: { id: true, name: true, email: true } } },
    },
    category: true,
    review: true,
};
// create booking
const createBooking = async (data) => {
    const result = await prisma.booking.create({
        data: {
            ...data,
            scheduledAt: new Date(data.scheduledAt),
            status: "PENDING",
        },
        include: bookingInclude,
    });
    return result;
};
// get booking
const getMyBookings = async (userId, role) => {
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
            return null;
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
const getSingleBooking = async (bookingId, userId, role) => {
    const result = await prisma.booking.findUnique({
        where: { id: bookingId },
        include: bookingInclude,
    });
    if (!result)
        return null;
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
// update Booking
const updateBookingStatus = async (bookingId, newStatus, userId, role) => {
    const booking = await prisma.booking.findUnique({
        where: {
            id: bookingId,
        },
    });
    if (!booking) {
        return null;
    }
    // for admin
    if (role === UserRole.ADMIN) {
        return prisma.booking.update({
            where: { id: bookingId },
            data: {
                status: newStatus,
            },
            include: bookingInclude,
        });
    }
    // for tutor
    if (role === UserRole.TUTOR &&
        (newStatus === BookingStatus.CANCELLED ||
            newStatus === BookingStatus.COMPLETED ||
            newStatus === BookingStatus.CONFIRMED)) {
        const tutorProfile = await prisma.tutorProfile.findUnique({
            where: {
                userId,
            },
        });
        if (!tutorProfile)
            return null;
        if (tutorProfile.id !== booking.tutorProfileId)
            return null;
        return prisma.booking.update({
            where: {
                id: bookingId,
            },
            data: {
                status: newStatus,
            },
            include: bookingInclude,
        });
    }
    // for student
    if (role === UserRole.STUDENT && newStatus === BookingStatus.CANCELLED) {
        if (userId !== booking.studentId)
            return null;
        return prisma.booking.update({
            where: {
                id: bookingId,
            },
            data: {
                status: newStatus,
            },
            include: bookingInclude,
        });
    }
};
// delete booking
const deleteBooking = async (role, bookingId) => {
    const booking = await prisma.booking.findUnique({
        where: {
            id: bookingId,
        },
    });
    if (!booking) {
        return null;
    }
    if (role === UserRole.ADMIN) {
        return prisma.booking.delete({
            where: {
                id: bookingId
            }
        });
    }
    return null;
};
export const bookingServices = {
    createBooking,
    getMyBookings,
    getSingleBooking,
    updateBookingStatus,
    deleteBooking,
};
//# sourceMappingURL=booking.services.js.map