import { prisma } from "../../lib/prisma";
import { UserRole } from "../../middlewares/requireAuth";
// create availability
const createAvailability = async (tutorId, data) => {
    const { days, startTime, endTime } = data;
    //  check the tutor is exist or not
    const tutorProfile = await prisma.tutorProfile.findUnique({
        where: {
            userId: tutorId,
        },
    });
    if (!tutorProfile) {
        return null;
    }
    //   check the new time overlap or not
    const overlap = await prisma.availability.findFirst({
        where: {
            tutorProfileId: tutorProfile.id,
            dayOfWeek: days,
            AND: [
                { startTime: { lt: data.endTime } },
                { endTime: { gt: data.startTime } },
            ],
        },
    });
    if (overlap)
        return null;
    return prisma.availability.create({
        data: {
            tutorProfileId: tutorProfile.id,
            dayOfWeek: days,
            startTime,
            endTime,
        },
    });
};
// get my availability
const getMyAvailability = async (userId) => {
    const tutorProfile = await prisma.tutorProfile.findUnique({
        where: {
            userId,
        },
    });
    if (!tutorProfile)
        return null;
    return prisma.availability.findMany({
        where: {
            tutorProfileId: tutorProfile.id,
        },
    });
};
// get all availabilities
const getAllAvailabilities = async (tutorProfileId) => {
    const result = await prisma.availability.findMany({
        where: {
            tutorProfileId,
        },
    });
    return result;
};
// update availabilities
const updateAvailabilities = async (userId, availabilityId, data) => {
    const tutorProfile = await prisma.tutorProfile.findUnique({
        where: {
            userId,
        },
    });
    if (!tutorProfile)
        return null;
    const slot = await prisma.availability.findUnique({
        where: {
            id: availabilityId,
        },
    });
    if (!slot || slot.tutorProfileId !== tutorProfile.id) {
        return null;
    }
    return prisma.availability.update({
        where: {
            id: availabilityId,
        },
        data: {
            ...data,
        },
    });
};
// delete availability
const deleteAvailability = async (userRole, userId, availabilityId) => {
    if (userRole === UserRole.ADMIN) {
        return prisma.availability.delete({
            where: {
                id: availabilityId,
            },
        });
    }
    const tutorProfile = await prisma.tutorProfile.findUnique({
        where: {
            userId,
        },
    });
    if (!tutorProfile)
        return null;
    const slot = await prisma.availability.findUnique({
        where: {
            id: availabilityId,
        },
    });
    if (!slot || slot.tutorProfileId !== tutorProfile.id) {
        return null;
    }
    return prisma.availability.delete({
        where: {
            id: availabilityId,
        },
    });
};
export const availabilityServices = {
    createAvailability,
    getMyAvailability,
    getAllAvailabilities,
    updateAvailabilities,
    deleteAvailability,
};
//# sourceMappingURL=availability.services.js.map