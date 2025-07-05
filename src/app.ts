import express, { NextFunction, Request, Response } from "express";
import bookRoutes from "./app/routes/bookRoutes";
import borrowRoutes from "./app/routes/borrowRoutes";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "https://mlms-rust.vercel.app"],
  })
);

app.use("/api/books", bookRoutes);
app.use("/api/borrow", borrowRoutes);

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("Welcome To Library Management System");
});

export default app;
