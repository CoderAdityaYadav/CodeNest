import express from "express";
import {
    getLeaderboard,
    generateAllLeaderboards,
} from "../controllers/leaderboard.controller.js";

const router = express.Router();
// Get leaderboard by level
router.get("/:level/:referenceId", getLeaderboard);
router.post("/generate", generateAllLeaderboards);


export default router;