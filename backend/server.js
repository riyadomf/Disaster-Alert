import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";
import morgan from "morgan";
import alertRoutes from "./routes/alertRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import initScheduledJobs from "./scheduledFunctions/disasterAlertScheduler.js";
import cors from "cors";

dotenv.config();

connectDB();

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/alerts", alertRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

initScheduledJobs();
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
