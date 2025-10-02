import cron from "node-cron";
import { generateAllLeaderboardsJob } from "../controllers/leaderboard.controller.js";
import { generateAllCollegeLeaderboardsJob } from "../controllers/collegeLeaderboard.controller.js"; // Fixed: should be Job function

const runLeaderboard = async () => {
    console.log("⏳ Leaderboard generation for students started...");
    try {
        await Promise.all([
            generateAllLeaderboardsJob(),
            generateAllCollegeLeaderboardsJob(),
        ]);

        console.log("🎉 All leaderboards updated successfully!");
    } catch (error) {
        console.error("❌ Leaderboard generation failed:", error.message);
        throw error; 
    }
};

// runLeaderboard();

export default runLeaderboard;