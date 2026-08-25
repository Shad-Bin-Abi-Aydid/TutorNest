import { Category } from "./tutor.type";

export interface Booking {
  id: string;
  scheduledAt: string;
  durationMinutes: number;
  status: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";
  student: {
    id: string;
    name: string;
    email: string;
  };
  tutorProfile: {
    id: string;
    bio: string;
    pricePerHour: number;
    user: {
      id: string;
      name: string;
      email: string;
    };
  };
  category: Category;
}