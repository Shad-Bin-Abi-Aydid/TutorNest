export interface TutorProfile {
  id: string;
  userId: string;
  image: string | null;
  bio: string;
  experienceYears: number;
  pricePerHour: number;
  createdAt: string;
  updatedAt: string;
  avgRating?: number | null;
  user: {
    id: string;
    name: string;
    email: string;
  };
  categories: {
    tutorProfileId: string;
    categoryId: string;
    category: Category;
  }[];
}

export interface TutorFilters {
  search?: string;
  categoryId?: string;
  minPrice?: string;
  maxPrice?: string;
  minRating?: string;
  sortBy?: string;
  sortOrder?: string;
}

export interface Category {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  bookingId: string;
  studentId: string;
  tutorProfileId: string;
  rating: number;
  comment: string | null;
  createdAt: string;
  student: {
    id: string;
    name: string;
  };
}
