import updateAllUserStats from "./userCron.js";
import runLeaderboard from "./leaderboardCron.js";
import cron from "node-cron";

const cronJobs = async () => {
    console.log("🚀 Running startup tasks...");
    const startTime = Date.now();

    try {
        console.log("📊 Starting user stats update...");
        await updateAllUserStats();
        console.log("✅ User stats updated successfully");

        console.log("🏆 Starting leaderboard generation...");
        await runLeaderboard();
        console.log("✅ Leaderboards updated successfully");

        const duration = ((Date.now() - startTime) / 1000).toFixed(2);
        console.log(
            `🎉 All startup tasks completed successfully in ${duration}s!`
        );
    } catch (error) {
        const duration = ((Date.now() - startTime) / 1000).toFixed(2);
        console.error(
            `💥 Startup tasks failed after ${duration}s:`,
            error.message
        );
    }
};

cron.schedule("0 */6 * * *", cronJobs, {
    name: "daily-stats-and-leaderboard-update",
    timezone: "Asia/Kolkata",
});

// cronJobs();

export default cronJobs;