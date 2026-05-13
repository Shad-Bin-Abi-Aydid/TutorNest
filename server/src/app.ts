import express, { Application, Request, Response } from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import { categoriesRoutes } from "./modules/categories/category.routes";

const app: Application = express();

app.use(cors());
app.all("/api/auth/{*any}", toNodeHandler(auth));
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "tutorNest API is running" });
});

// Categories
app.use("/categories", categoriesRoutes);

app.use(globalErrorHandler);

export default app;
