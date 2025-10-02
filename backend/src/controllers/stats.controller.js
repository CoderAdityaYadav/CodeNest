import { calculateScore } from "../configs/score.js";
import User from "../models/User.js";
import axios from "axios";

/* ----------------- Helpers ----------------- */
/**
 * Fetch LeetCode stats.
 * @param {Object} user - Mongoose user document
 * @param {Boolean} save - whether to save user immediately
 */
export async function fetchLeetcodeStats(user, save = true) {
    try {
        if (!user.handles?.leetcode) throw new Error("LeetCode ID not set!");
        const { data } = await axios.get(
            `${process.env.LEETCODE_API}/${user.handles.leetcode}`
        );

        if (data.totalSolved) {
            user.stats.leetcode.easySolved = data.easySolved || 0;
            user.stats.leetcode.mediumSolved = data.mediumSolved || 0;
            user.stats.leetcode.hardSolved = data.hardSolved || 0;

            if (save) {
                user.score = calculateScore({
                    easyLeetcode: user.stats.leetcode.easySolved,
                    mediumLeetcode: user.stats.leetcode.mediumSolved,
                    hardLeetCode: user.stats.leetcode.hardSolved,
                    gfgCodingScore: user.stats.gfg.codingScore,
                    githubRepos: user.stats.github.repos,
                });
                await user.save();
            }
        }

        return data;
    } catch (err) {
        console.error("Error in fetchLeetcodeStats:", err.message);
        throw err;
    }
}

export async function fetchGfgStats(user, save = true) {
    try {
        if (!user.handles?.gfg) throw new Error("GFG ID not set!");
        const { data } = await axios.get(
            `${process.env.GFG_API}/${user.handles.gfg}`
        );

        if (data.info.totalProblemsSolved) {
            user.stats.gfg.solved = data.info.totalProblemsSolved || 0;
            user.stats.gfg.codingScore = data.info.codingScore || 0;

            if (save) {
                user.score = calculateScore({
                    easyLeetcode: user.stats.leetcode.easySolved,
                    mediumLeetcode: user.stats.leetcode.mediumSolved,
                    hardLeetCode: user.stats.leetcode.hardSolved,
                    gfgCodingScore: user.stats.gfg.codingScore,
                    githubRepos: user.stats.github.repos,
                });
                await user.save();
            }
        }

        return data;
    } catch (err) {
        console.error("Error in fetchGfgStats:", err.message);
        throw err;
    }
}

export async function fetchGitStats(user, save = true) {
    try {
        if (!user.handles?.github) throw new Error("GitHub ID not set!");
        const { data } = await axios.get(
            `${process.env.GIT_API}/${user.handles.github}`,
            {
                headers: {
                    Authorization: `token ${process.env.GITHUB_TOKEN}`,
                    "User-Agent": "mern-stats-app",
                },
            }
        );

        if (data.public_repos !== undefined) {
            user.stats.github.repos = data.public_repos || 0;

            if (save) {
                user.score = calculateScore({
                    easyLeetcode: user.stats.leetcode.easySolved,
                    mediumLeetcode: user.stats.leetcode.mediumSolved,
                    hardLeetCode: user.stats.leetcode.hardSolved,
                    gfgCodingScore: user.stats.gfg.codingScore,
                    githubRepos: user.stats.github.repos,
                });
                await user.save();
            }
        }

        return data;
    } catch (err) {
        console.error("Error in fetchGitStats:", err.message);
        throw err;
    }
}

/* ----------------- API Controllers ----------------- */
export async function getLeetcodeStats(req, res) {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId);
        if (!user)
            return res
                .status(404)
                .json({ success: false, message: "User not found!" });

        const data = await fetchLeetcodeStats(user);
        return res
            .status(200)
            .json({ success: true, message: "LeetCode stats retrieved", data });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: error.message });
    }
}

export async function getGfgStats(req, res) {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId);
        if (!user)
            return res
                .status(404)
                .json({ success: false, message: "User not found!" });

        const data = await fetchGfgStats(user);
        return res
            .status(200)
            .json({ success: true, message: "GFG stats retrieved", data });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: error.message });
    }
}

export async function getGitStats(req, res) {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId);
        if (!user)
            return res
                .status(404)
                .json({ success: false, message: "User not found!" });

        const data = await fetchGitStats(user);
        return res
            .status(200)
            .json({ success: true, message: "GitHub stats retrieved", data });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: error.message });
    }
}

/* ----------------- Get All Stats Controller (Single Save) ----------------- */
export async function getAllStats(req, res) {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId);
        if (!user)
            return res
                .status(404)
                .json({ success: false, message: "User not found!" });

        const results = {};
        const errors = {};

        try {
            results.leetcode = await fetchLeetcodeStats(user, false);
        } catch (e) {
            errors.leetcode = e.message;
        }
        try {
            results.gfg = await fetchGfgStats(user, false);
        } catch (e) {
            errors.gfg = e.message;
        }
        try {
            results.github = await fetchGitStats(user, false);
        } catch (e) {
            errors.github = e.message;
        }

        // Update score only once
        user.score = calculateScore({
            easyLeetcode: user.stats.leetcode.easySolved,
            mediumLeetcode: user.stats.leetcode.mediumSolved,
            hardLeetCode: user.stats.leetcode.hardSolved,
            gfgCodingScore: user.stats.gfg.codingScore,
            githubRepos: user.stats.github.repos,
        });
        await user.save();

        return res.status(200).json({
            success: true,
            message: "Successfully retrieved all stats",
            data: { stats: results, errors, totalScore: user.score },
        });
    } catch (error) {
        console.error("Error in getAllStats:", error.message);
        return res
            .status(500)
            .json({ success: false, message: "Internal Server Error" });
    }
}
