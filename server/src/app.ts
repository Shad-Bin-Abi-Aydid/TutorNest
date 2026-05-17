import express, { Application, Request, Response } from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import { categoriesRoutes } from "./modules/categories/category.routes";
import { userRoutes } from "./modules/users/user.routes";
import { tutorProfileRoutes } from "./modules/tutorProfile/tutorProfile.routes";
import { bookingRoutes } from "./modules/bookings/booking.routes";

const app: Application = express();

app.use(cors());
app.all("/api/auth/{*any}", toNodeHandler(auth));
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "tutorNest API is running" });
});

// Categories
app.use("/api/categories", categoriesRoutes);

// users
app.use("/api/users", userRoutes);

// tutorProfiles
app.use("/api/tutor-profiles", tutorProfileRoutes);

// Booking
app.use("/api/booking", bookingRoutes);

app.use(globalErrorHandler);

export default app;
