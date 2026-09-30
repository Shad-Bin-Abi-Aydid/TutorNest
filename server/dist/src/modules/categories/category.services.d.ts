export declare const categoriesServices: {
    createCategories: (data: {
        name: string;
    }) => Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
    }>;
    getAllCategories: () => Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
    }[]>;
    getSingleCategory: (id: string) => Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
    } | null>;
    updateCategory: (categoryId: string, data: {
        name: string;
    }) => Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
    }>;
    deleteCategory: (id: string) => Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
    }>;
};
//# sourceMappingURL=category.services.d.ts.map