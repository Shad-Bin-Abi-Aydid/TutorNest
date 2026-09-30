import { DayOfWeek } from "../../../generated/prisma/enums";
export declare const availabilityServices: {
    createAvailability: (tutorId: string, data: {
        days: DayOfWeek;
        startTime: string;
        endTime: string;
    }) => Promise<{
        id: string;
        tutorProfileId: string;
        dayOfWeek: DayOfWeek;
        startTime: string;
        endTime: string;
    } | null>;
    getMyAvailability: (userId: string) => Promise<{
        id: string;
        tutorProfileId: string;
        dayOfWeek: DayOfWeek;
        startTime: string;
        endTime: string;
    }[] | null>;
    getAllAvailabilities: (tutorProfileId: string) => Promise<{
        id: string;
        tutorProfileId: string;
        dayOfWeek: DayOfWeek;
        startTime: string;
        endTime: string;
    }[]>;
    updateAvailabilities: (userId: string, availabilityId: string, data: {
        dayOfWeek?: DayOfWeek;
        startTime?: string;
        endTime?: string;
    }) => Promise<{
        id: string;
        tutorProfileId: string;
        dayOfWeek: DayOfWeek;
        startTime: string;
        endTime: string;
    } | null>;
    deleteAvailability: (userRole: string, userId: string, availabilityId: string) => Promise<{
        id: string;
        tutorProfileId: string;
        dayOfWeek: DayOfWeek;
        startTime: string;
        endTime: string;
    } | null>;
};
//# sourceMappingURL=availability.services.d.ts.map