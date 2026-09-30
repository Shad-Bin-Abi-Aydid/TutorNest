import { BookingStatus } from "../../../generated/prisma/enums";
import { UserRole } from "../../middlewares/requireAuth";
export declare const bookingServices: {
    createBooking: (data: {
        studentId: string;
        tutorProfileId: string;
        categoryId: string;
        scheduledAt: string;
        durationMinutes: number;
    }) => Promise<{
        category: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
        };
        tutorProfile: {
            user: {
                id: string;
                email: string;
                name: string;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            image: string | null;
            userId: string;
            bio: string;
            experienceYears: number;
            pricePerHour: number;
        };
        review: {
            id: string;
            createdAt: Date;
            tutorProfileId: string;
            studentId: string;
            rating: number;
            comment: string | null;
            bookingId: string;
        } | null;
        student: {
            id: string;
            email: string;
            name: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: BookingStatus;
        scheduledAt: Date;
        durationMinutes: number;
        tutorProfileId: string;
        categoryId: string;
        studentId: string;
    }>;
    getMyBookings: (userId: string, role: string) => Promise<({
        category: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
        };
        tutorProfile: {
            user: {
                id: string;
                email: string;
                name: string;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            image: string | null;
            userId: string;
            bio: string;
            experienceYears: number;
            pricePerHour: number;
        };
        review: {
            id: string;
            createdAt: Date;
            tutorProfileId: string;
            studentId: string;
            rating: number;
            comment: string | null;
            bookingId: string;
        } | null;
        student: {
            id: string;
            email: string;
            name: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: BookingStatus;
        scheduledAt: Date;
        durationMinutes: number;
        tutorProfileId: string;
        categoryId: string;
        studentId: string;
    })[] | null>;
    getSingleBooking: (bookingId: string, userId: string, role: string) => Promise<({
        category: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
        };
        tutorProfile: {
            user: {
                id: string;
                email: string;
                name: string;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            image: string | null;
            userId: string;
            bio: string;
            experienceYears: number;
            pricePerHour: number;
        };
        review: {
            id: string;
            createdAt: Date;
            tutorProfileId: string;
            studentId: string;
            rating: number;
            comment: string | null;
            bookingId: string;
        } | null;
        student: {
            id: string;
            email: string;
            name: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: BookingStatus;
        scheduledAt: Date;
        durationMinutes: number;
        tutorProfileId: string;
        categoryId: string;
        studentId: string;
    }) | null>;
    updateBookingStatus: (bookingId: string, newStatus: BookingStatus, userId: string, role: UserRole) => Promise<({
        category: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
        };
        tutorProfile: {
            user: {
                id: string;
                email: string;
                name: string;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            image: string | null;
            userId: string;
            bio: string;
            experienceYears: number;
            pricePerHour: number;
        };
        review: {
            id: string;
            createdAt: Date;
            tutorProfileId: string;
            studentId: string;
            rating: number;
            comment: string | null;
            bookingId: string;
        } | null;
        student: {
            id: string;
            email: string;
            name: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: BookingStatus;
        scheduledAt: Date;
        durationMinutes: number;
        tutorProfileId: string;
        categoryId: string;
        studentId: string;
    }) | null | undefined>;
    deleteBooking: (role: string, bookingId: string) => Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: BookingStatus;
        scheduledAt: Date;
        durationMinutes: number;
        tutorProfileId: string;
        categoryId: string;
        studentId: string;
    } | null>;
};
//# sourceMappingURL=booking.services.d.ts.map