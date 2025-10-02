import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import { connectDb } from "./utils/db.js";
import authRoutes from "../src/routes/auth.routes.js"
import statRoutes from "../src/routes/stats.routes.js";
import userRoutes from "../src/routes/user.routes.js";
import collegeRoutes from "../src/routes/college.routes.js";
import branchRoutes from "../src/routes/branch.routes.js";
import sectionRoutes from "../src/routes/section.routes.js";
import updateAllUserStats from "./configs/userCron.js";
import leaderboardRoutes from "./routes/leaderboard.routes.js";
import collegeLeaderboardRoutes from "./routes/collegeLeaderboard.routes.js"
import cronJobs from "./configs/cronJobs.js";
import userReports from "./routes/report.routes.js";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;

app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials:true,
}))

app.use("/api/auth",authRoutes)
app.use("/api/stats", statRoutes);
app.use("/api/updateStats", updateAllUserStats);
app.use("/api/leaderboard", leaderboardRoutes);
app.use("/api/college-leaderboard",collegeLeaderboardRoutes)
app.use("/api/users",userRoutes);
app.use("/api/colleges",collegeRoutes);
app.use("/api/branches",branchRoutes);
app.use("/api/sections", sectionRoutes);
app.use("/api/report", userReports);

app.listen(PORT, () => {
    console.log("Server is running on PORT 3000");
    connectDb();
})