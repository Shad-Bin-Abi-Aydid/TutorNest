import { Role, UserStatus } from "../../../generated/prisma/enums";
export declare const userServices: {
    getAllUsers: () => Promise<{
        id: string;
        createdAt: Date;
        email: string;
        name: string;
        role: Role;
        status: UserStatus;
    }[]>;
    getSingleUser: (id: string) => Promise<{
        id: string;
        createdAt: Date;
        email: string;
        name: string;
        role: Role;
        status: UserStatus;
    } | null>;
    updateUser: (id: string, data: {
        name?: string;
        role?: Role;
        status?: UserStatus;
    }) => Promise<{
        id: string;
        createdAt: Date;
        email: string;
        name: string;
        role: Role;
        status: UserStatus;
    }>;
    deleteUser: (id: string) => Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        emailVerified: boolean;
        name: string;
        image: string | null;
        role: Role;
        status: UserStatus;
        password: string | null;
    }>;
};
//# sourceMappingURL=user.services.d.ts.map