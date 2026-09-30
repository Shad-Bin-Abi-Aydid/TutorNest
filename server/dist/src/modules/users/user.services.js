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
const getSingleUser = async (id) => {
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
const updateUser = async (id, data) => {
    const result = await prisma.user.update({
        where: {
            id,
        },
        data: data,
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
const deleteUser = async (id) => {
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
//# sourceMappingURL=user.services.js.map