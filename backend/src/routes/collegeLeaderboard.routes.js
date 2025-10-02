import express from "express";
import {
    getCollegeLeaderboard,
    generateAllCollegeLeaderboards,
} from "../controllers/collegeLeaderboard.controller.js";

const router = express.Router();

// Get college leaderboard by level
router.get("/:level/:referenceId", getCollegeLeaderboard);
router.post("/generate", generateAllCollegeLeaderboards);

export default router;