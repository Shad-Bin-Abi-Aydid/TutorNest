export interface TutorProfile {
        id: string,
        userId: string,
        image: string | null,
        bio: string,
        experienceYears: number,
        pricePerHour: number,
        createdAt: string,
        updatedAt: string,
        avgRating?: number | null,
        user: {
            id: string,
            name: string,
            email: string
        },
        categories: {
            tutorProfileId: string,
            categoryId: string,
            category: {
                id: string,
                name: string,
                createdAt: string,
                updatedAt: string
            }
        }[]
}