export declare const tutorProfileServices: {
    createTutorProfile: (data: {
        userId: string;
        bio: string;
        experienceYears: number;
        pricePerHour: number;
        image?: string;
        categoryIds: string[];
    }) => Promise<{
        user: {
            id: string;
            email: string;
            name: string;
        };
        categories: ({
            category: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
            };
        } & {
            tutorProfileId: string;
            categoryId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        image: string | null;
        userId: string;
        bio: string;
        experienceYears: number;
        pricePerHour: number;
    }>;
    getAllTutorProfiles: (filters: {
        categoryId?: string | undefined;
        minPrice?: number | undefined;
        maxPrice?: number | undefined;
        minRating?: number | undefined;
        search?: string | undefined;
        sortBy?: "pricePerHour" | "experienceYears" | "rating" | undefined;
        sortOrder?: "asc" | "desc" | undefined;
    }) => Promise<{
        avgRating: number | null;
        user: {
            id: string;
            email: string;
            name: string;
        };
        categories: ({
            category: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
            };
        } & {
            tutorProfileId: string;
            categoryId: string;
        })[];
        id: string;
        createdAt: Date;
        updatedAt: Date;
        image: string | null;
        userId: string;
        bio: string;
        experienceYears: number;
        pricePerHour: number;
    }[]>;
    getSingleTutorProfile: (tutorId: string) => Promise<({
        user: {
            id: string;
            email: string;
            name: string;
        };
        categories: ({
            category: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
            };
        } & {
            tutorProfileId: string;
            categoryId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        image: string | null;
        userId: string;
        bio: string;
        experienceYears: number;
        pricePerHour: number;
    }) | null>;
    updateTutorProfile: (tutorId: string, data: {
        bio?: string;
        experienceYears?: number;
        pricePerHour?: number;
        image?: string;
        categoryIds?: string[];
    }) => Promise<{
        user: {
            id: string;
            email: string;
            name: string;
        };
        categories: ({
            category: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
            };
        } & {
            tutorProfileId: string;
            categoryId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        image: string | null;
        userId: string;
        bio: string;
        experienceYears: number;
        pricePerHour: number;
    }>;
    deleteTutorProfile: (tutorId: string) => Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        image: string | null;
        userId: string;
        bio: string;
        experienceYears: number;
        pricePerHour: number;
    }>;
    getMyTutorProfile: (userId: string) => Promise<({
        user: {
            id: string;
            email: string;
            name: string;
        };
        categories: ({
            category: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
            };
        } & {
            tutorProfileId: string;
            categoryId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        image: string | null;
        userId: string;
        bio: string;
        experienceYears: number;
        pricePerHour: number;
    }) | null>;
};
//# sourceMappingURL=tutorProfile.services.d.ts.map