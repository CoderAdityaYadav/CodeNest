import User from "../models/User.js";
import cron from "node-cron";
import {
    fetchLeetcodeStats,
    fetchGfgStats,
    fetchGitStats,
} from "../controllers/stats.controller.js";
import { calculateScore } from "./score.js";

async function updateAllUserStats() {
    console.log("🔄 Cron Job Started: Updating all user stats...");
    const startTime = Date.now();

    try {
        const users = await User.find({ role: "student" });
        console.log(`📊 Found ${users.length} students to update`);

        let successCount = 0;
        let errorCount = 0;

        const batchSize = 10;
        for (let i = 0; i < users.length; i += batchSize) {
            const batch = users.slice(i, i + batchSize);

            await Promise.all(
                batch.map(async (user) => {
                    try {
                        console.log(
                            `🔄 Updating stats for user: ${
                                user.name || user.email
                            }`
                        );

                        // Fetch all stats in parallel
                        await Promise.all([
                            fetchLeetcodeStats(user, false),
                            fetchGfgStats(user, false),
                            fetchGitStats(user, false),
                        ]);

                        // Update total score and save once
                        user.score = calculateScore({
                            easyLeetcode: user.stats.leetcode.easySolved,
                            mediumLeetcode: user.stats.leetcode.mediumSolved,
                            hardLeetCode: user.stats.leetcode.hardSolved,
                            gfgCodingScore: user.stats.gfg.codingScore,
                            githubRepos: user.stats.github.repos,
                        });

                        await user.save();
                        successCount++;
                        console.log(
                            `✅ Updated: ${user.name || user.email} (Score: ${
                                user.score
                            })`
                        );
                    } catch (err) {
                        errorCount++;
                        console.error(
                            `⚠️ Error updating user ${user.name || user._id}:`,
                            err.message
                        );
                    }
                })
            );

            if (i + batchSize < users.length) {
                console.log(
                    `⏸️ Processed batch ${
                        Math.floor(i / batchSize) + 1
                    }, waiting 2s...`
                );
                await new Promise((resolve) => setTimeout(resolve, 2000));
            }
        }

        const duration = ((Date.now() - startTime) / 1000).toFixed(2);
        console.log(
            `✅ Cron job finished in ${duration}s: ${successCount} updated, ${errorCount} errors`
        );
    } catch (error) {
        const duration = ((Date.now() - startTime) / 1000).toFixed(2);
        console.error(`❌ Cron job failed after ${duration}s:`, error.message);
        throw error;
    }
}

export async function updateUserStats(user) {
    try {
        console.log(
            `🔄 Updating individual stats for: ${user.name || user.email}`
        );

        await Promise.all([
            fetchLeetcodeStats(user, false),
            fetchGfgStats(user, false),
            fetchGitStats(user, false),
        ]);

        user.score = calculateScore({
            easyLeetcode: user.stats.leetcode.easySolved,
            mediumLeetcode: user.stats.leetcode.mediumSolved,
            hardLeetCode: user.stats.leetcode.hardSolved,
            gfgCodingScore: user.stats.gfg.codingScore,
            githubRepos: user.stats.github.repos,
        });

        await user.save();
        console.log(
            `✅ Stats updated for ${user.email} (Score: ${user.score})`
        );
        return user;
    } catch (err) {
        console.error(
            `❌ Error updating stats for ${user.email}:`,
            err.message
        );
        throw err;
    }
}


export default updateAllUserStats;