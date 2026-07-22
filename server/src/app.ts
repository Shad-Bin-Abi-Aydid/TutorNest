import express, { Application, Request, Response } from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import { categoriesRoutes } from "./modules/categories/category.routes";
import { userRoutes } from "./modules/users/user.routes";
import { tutorProfileRoutes } from "./modules/tutorProfile/tutorProfile.routes";
import { bookingRoutes } from "./modules/bookings/booking.routes";
import { availabilityRouter } from "./modules/availability/availability.routes";
import { reviewRouter } from "./modules/reviews/review.routes";

const app: Application = express();

app.use(
  cors({
    origin: process.env.APP_URL || "http://localhost:3000",
    credentials: true,
  })
);
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
app.use("/api/bookings", bookingRoutes);

// availability
app.use("/api/availabilities", availabilityRouter);

// review
app.use("/api/reviews", reviewRouter)

app.use(globalErrorHandler);

export default app;
