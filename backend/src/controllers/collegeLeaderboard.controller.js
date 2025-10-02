import User from "../models/User.js";
import College from "../models/College.js";
import CollegeLeaderboard from "../models/CollegeLeaderboard.js";
import mongoose from "mongoose";

/* ----------------- Helper: Calculate College Stats ----------------- */
const calculateCollegeStats = async (collegeId) => {
    const students = await User.find({
        collegeId,
        role: "student",
    }).select("score stats");

    if (students.length === 0) {
        return {
            totalStudents: 0,
            averageScore: 0,
            totalScore: 0,
            topPerformers: 0,
            stats: {
                totalEasySolved: 0,
                totalMediumSolved: 0,
                totalHardSolved: 0,
                totalGfgSolved: 0,
                totalGithubRepos: 0,
                averageEasySolved: 0,
                averageMediumSolved: 0,
                averageHardSolved: 0,
                averageGfgSolved: 0,
                averageGithubRepos: 0,
            },
        };
    }

    const totalStudents = students.length;
    const totalScore = students.reduce((sum, s) => sum + (s.score || 0), 0);
    const averageScore = Math.round(totalScore / totalStudents);
    const topPerformers = students.filter((s) => s.score > 1000).length;

    // Calculate totals
    const totals = students.reduce(
        (acc, s) => ({
            totalEasySolved:
                acc.totalEasySolved + (s.stats?.leetcode?.easySolved || 0),
            totalMediumSolved:
                acc.totalMediumSolved + (s.stats?.leetcode?.mediumSolved || 0),
            totalHardSolved:
                acc.totalHardSolved + (s.stats?.leetcode?.hardSolved || 0),
            totalGfgSolved: acc.totalGfgSolved + (s.stats?.gfg?.solved || 0),
            totalGithubRepos:
                acc.totalGithubRepos + (s.stats?.github?.repos || 0),
        }),
        {
            totalEasySolved: 0,
            totalMediumSolved: 0,
            totalHardSolved: 0,
            totalGfgSolved: 0,
            totalGithubRepos: 0,
        }
    );

    return {
        totalStudents,
        averageScore,
        totalScore,
        topPerformers,
        stats: {
            ...totals,
            averageEasySolved: Math.round(
                totals.totalEasySolved / totalStudents
            ),
            averageMediumSolved: Math.round(
                totals.totalMediumSolved / totalStudents
            ),
            averageHardSolved: Math.round(
                totals.totalHardSolved / totalStudents
            ),
            averageGfgSolved: Math.round(totals.totalGfgSolved / totalStudents),
            averageGithubRepos: Math.round(
                totals.totalGithubRepos / totalStudents
            ),
        },
    };
};

/* ----------------- Helper: Fetch All Colleges (No Limit) ----------------- */
const fetchAllColleges = async (filter) => {
    const colleges = await College.find(filter);
    const collegeEntries = [];

    for (const college of colleges) {
        const stats = await calculateCollegeStats(college._id);

        // Skip colleges with no students
        if (stats.totalStudents === 0) continue;

        collegeEntries.push({
            collegeId: college._id,
            collegeName: college.name,
            location: college.location,
            ...stats,
        });
    }

    // Sort by average score (descending), then by total students (descending)
    collegeEntries.sort((a, b) => {
        if (b.averageScore !== a.averageScore) {
            return b.averageScore - a.averageScore;
        }
        return b.totalStudents - a.totalStudents;
    });

    // Add ranks
    return collegeEntries.map((entry, index) => ({
        ...entry,
        rank: index + 1,
    }));
};

/* ----------------- Pure Job Function (FOR CRON JOB) ----------------- */
export const generateAllCollegeLeaderboardsJob = async () => {
    try {
        console.log("🚀 Starting college leaderboard generation...");
        const startTime = Date.now();

        // Get all colleges first
        const collegesData = await College.find();
        console.log(`📊 Found ${collegesData.length} colleges in database`);

        /* ---------- CITY LEVEL (All colleges in each city) ---------- */
        const cities = [
            ...new Set(
                collegesData.map((c) => c.location?.city).filter(Boolean)
            ),
        ];

        console.log(`📍 Processing ${cities.length} cities...`);
        let cityCount = 0;
        for (const city of cities) {
            const entries = await fetchAllColleges({
                "location.city": city,
            });

            if (entries.length > 0) {
                await CollegeLeaderboard.findOneAndUpdate(
                    { level: "city", referenceId: city },
                    { entries, generatedAt: new Date() },
                    { upsert: true }
                );
                cityCount++;
                console.log(`✅ City: ${city} - ${entries.length} colleges`);
            }
        }

        /* ---------- STATE LEVEL (All colleges in each state) ---------- */
        const states = [
            ...new Set(
                collegesData.map((c) => c.location?.state).filter(Boolean)
            ),
        ];

        console.log(`🏛️ Processing ${states.length} states...`);
        let stateCount = 0;
        for (const state of states) {
            const entries = await fetchAllColleges({
                "location.state": state,
            });

            if (entries.length > 0) {
                await CollegeLeaderboard.findOneAndUpdate(
                    { level: "state", referenceId: state },
                    { entries, generatedAt: new Date() },
                    { upsert: true }
                );
                stateCount++;
                console.log(`✅ State: ${state} - ${entries.length} colleges`);
            }
        }

        /* ---------- INDIA LEVEL (All colleges) ---------- */
        console.log("🇮🇳 Processing India level...");
        const indiaEntries = await fetchAllColleges({});

        await CollegeLeaderboard.findOneAndUpdate(
            { level: "india", referenceId: "india" },
            { entries: indiaEntries, generatedAt: new Date() },
            { upsert: true }
        );

        const duration = ((Date.now() - startTime) / 1000).toFixed(2);
        console.log(
            `✅ College leaderboards generated successfully in ${duration}s`
        );

        return {
            success: true,
            stats: {
                cities: cityCount,
                states: stateCount,
                totalColleges: indiaEntries.length,
                processingTime: `${duration}s`,
            },
        };
    } catch (error) {
        console.error("❌ Error generating college leaderboards:", error);
        throw error;
    }
};

/* ----------------- Express Route Handler ----------------- */
export const generateAllCollegeLeaderboards = async (req, res) => {
    try {
        const result = await generateAllCollegeLeaderboardsJob();
        res.status(200).json({
            message: "All college leaderboards generated successfully",
            ...result,
        });
    } catch (error) {
        console.error("College leaderboard generation error:", error);
        res.status(500).json({
            message: "Error generating college leaderboards",
            error:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : undefined,
        });
    }
};

/* ----------------- Get College Leaderboard ----------------- */
export const getCollegeLeaderboard = async (req, res) => {
    try {
        let { level, referenceId } = req.params;

        // Special handling for references endpoint
        if (level === "references") {
            return await getAvailableReferences(referenceId, res);
        }

        // Validate level
        if (!["city", "state", "india"].includes(level)) {
            return res.status(400).json({
                message: "Invalid level. Must be 'city', 'state', or 'india'",
                received: level,
            });
        }

        // Build query
        const query = { level };

        // For india level, always use "india" as referenceId
        if (level === "india") {
            query.referenceId = "india";
        } else {
            // For city and state levels, referenceId is required
            if (!referenceId || referenceId === "undefined") {
                return res.status(400).json({
                    message: `referenceId is required for ${level} level`,
                });
            }
            query.referenceId = decodeURIComponent(referenceId);
        }

        const leaderboard = await CollegeLeaderboard.findOne(query).populate(
            "entries.collegeId",
            "name location manager"
        );

        if (!leaderboard) {
            return res.status(404).json({
                message: "College leaderboard not found",
                level,
                referenceId: query.referenceId,
            });
        }

        res.status(200).json({
            leaderboard,
            meta: {
                totalEntries: leaderboard.entries.length,
                generatedAt: leaderboard.generatedAt,
                level: leaderboard.level,
                referenceId: leaderboard.referenceId,
            },
        });
    } catch (error) {
        console.error("Get college leaderboard error:", error);
        res.status(500).json({
            message: "Server error",
            error:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : undefined,
        });
    }
};

// Helper function for getting available references
const getAvailableReferences = async (level, res) => {
    try {
        if (!["city", "state"].includes(level)) {
            return res.status(400).json({
                message: "Level must be 'city' or 'state'",
            });
        }

        const field = level === "city" ? "location.city" : "location.state";
        const references = await College.distinct(field);

        // Filter out null/undefined values
        const validReferences = references.filter(Boolean);

        res.status(200).json({
            level,
            references: validReferences.sort(),
        });
    } catch (error) {
        console.error("Get available references error:", error);
        res.status(500).json({
            message: "Server error",
            error:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : undefined,
        });
    }
};
