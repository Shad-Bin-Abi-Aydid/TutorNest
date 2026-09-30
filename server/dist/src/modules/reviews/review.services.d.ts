export declare const reviewServices: {
    createReview: (studentId: string, data: {
        bookingId: string;
        rating: number;
        comment?: string;
    }) => Promise<{
        error: string;
        data?: never;
    } | {
        data: {
            student: {
                id: string;
                name: string;
            };
        } & {
            id: string;
            createdAt: Date;
            tutorProfileId: string;
            studentId: string;
            rating: number;
            comment: string | null;
            bookingId: string;
        };
        error?: never;
    }>;
    getTutorReviews: (tutorProfileId: string) => Promise<({
        student: {
            id: string;
            name: string;
        };
    } & {
        id: string;
        createdAt: Date;
        tutorProfileId: string;
        studentId: string;
        rating: number;
        comment: string | null;
        bookingId: string;
    })[]>;
};
//# sourceMappingURL=review.services.d.ts.map