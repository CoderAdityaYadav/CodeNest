import User from "../models/User.js";
import College from "../models/College.js";
import StudentLeaderboard from "../models/StudentLeaderboard.js";
import mongoose from "mongoose";

/* ----------------- Helper: Fetch top N students ----------------- */
const fetchTopStudents = async (filter, limit) => {
    const studentsQuery = User.find({ ...filter, role: "student" }).sort({
        score: -1,
    }); 

    if (limit) studentsQuery.limit(limit);

    const students = await studentsQuery.select(
        "name score stats.leetcode.easySolved stats.leetcode.mediumSolved stats.leetcode.hardSolved stats.gfg.solved stats.gfg.codingScore stats.github.repos collegeId branchId sectionId"
    );

    return students.map((s, i) => ({
        userId: s._id,
        name: s.name,
        score: s.score,
        easySolved: s.stats.leetcode.easySolved,
        mediumSolved: s.stats.leetcode.mediumSolved,
        hardSolved: s.stats.leetcode.hardSolved,
        gfgSolved: s.stats.gfg.solved,
        gfgCodingScore: s.stats.gfg.codingScore,
        githubRepos: s.stats.github.repos,
        collegeId: s.collegeId,
        branchId: s.branchId,
        sectionId: s.sectionId,
        rank: i + 1,
    }));
};

/* ----------------- Pure Job Function ----------------- */
export const generateAllLeaderboardsJob = async () => {
    try {
        /* ---------- SECTION LEVEL (all students) ---------- */
        const sections = await User.distinct("sectionId", { role: "student" });
        for (const sectionId of sections) {
            const entries = await fetchTopStudents({ sectionId }, null);
            await StudentLeaderboard.findOneAndUpdate(
                { level: "section", referenceId: sectionId },
                { entries, levelRef: "Section", generatedAt: new Date() },
                { upsert: true }
            );
        }

        /* ---------- BRANCH LEVEL (top 30) ---------- */
        const branches = await User.distinct("branchId", { role: "student" });
        for (const branchId of branches) {
            const entries = await fetchTopStudents({ branchId }, 30);
            await StudentLeaderboard.findOneAndUpdate(
                { level: "branch", referenceId: branchId },
                { entries, levelRef: "Branch", generatedAt: new Date() },
                { upsert: true }
            );
        }

        /* ---------- COLLEGE LEVEL (top 30) ---------- */
        const colleges = await User.distinct("collegeId", { role: "student" });
        for (const collegeId of colleges) {
            const entries = await fetchTopStudents({ collegeId }, 30);
            await StudentLeaderboard.findOneAndUpdate(
                { level: "college", referenceId: collegeId },
                { entries, levelRef: "College", generatedAt: new Date() },
                { upsert: true }
            );
        }

        /* ---------- CITY LEVEL (top 30) ---------- */
        const collegesData = await College.find();
        const cities = [...new Set(collegesData.map((c) => c.location.city))];

        for (const city of cities) {
            const studentIds = await User.aggregate([
                { $match: { role: "student", collegeId: { $ne: null } } },
                {
                    $lookup: {
                        from: "colleges",
                        localField: "collegeId",
                        foreignField: "_id",
                        as: "college",
                    },
                },
                { $unwind: "$college" },
                { $match: { "college.location.city": city } },
                { $sort: { score: -1 } },
                { $limit: 30 },
                {
                    $project: {
                        userId: "$_id",
                        name: 1,
                        score: 1,
                        easySolved: "$stats.leetcode.easySolved",
                        mediumSolved: "$stats.leetcode.mediumSolved",
                        hardSolved: "$stats.leetcode.hardSolved",
                        gfgSolved: "$stats.gfg.solved",
                        gfgCodingScore: "$stats.gfg.codingScore",
                        githubRepos: "$stats.github.repos",
                        collegeId: 1,
                        branchId: 1,
                        sectionId: 1,
                    },
                },
            ]);

            const entries = studentIds.map((s, i) => ({ ...s, rank: i + 1 }));

            await StudentLeaderboard.findOneAndUpdate(
                { level: "city", referenceId: city },
                { entries, generatedAt: new Date() },
                { upsert: true }
            );
        }


        /* ---------- STATE LEVEL (top 30) ---------- */
       const states = [...new Set(collegesData.map((c) => c.location.state))];

       for (const state of states) {
           const studentIds = await User.aggregate([
               { $match: { role: "student", collegeId: { $ne: null } } },
               {
                   $lookup: {
                       from: "colleges",
                       localField: "collegeId",
                       foreignField: "_id",
                       as: "college",
                   },
               },
               { $unwind: "$college" },
               { $match: { "college.location.state": state } },
               { $sort: { score: -1 } },
               { $limit: 30 },
               {
                   $project: {
                       userId: "$_id",
                       name: 1,
                       score: 1,
                       easySolved: "$stats.leetcode.easySolved",
                       mediumSolved: "$stats.leetcode.mediumSolved",
                       hardSolved: "$stats.leetcode.hardSolved",
                       gfgSolved: "$stats.gfg.solved",
                       gfgCodingScore: "$stats.gfg.codingScore",
                       githubRepos: "$stats.github.repos",
                       collegeId: 1,
                       branchId: 1,
                       sectionId: 1,
                   },
               },
           ]);

           const entries = studentIds.map((s, i) => ({ ...s, rank: i + 1 }));

           await StudentLeaderboard.findOneAndUpdate(
               { level: "state", referenceId: state },
               { entries, generatedAt: new Date() },
               { upsert: true }
           );
       }


        /* ---------- INDIA LEVEL (top 30) ---------- */
        const indiaEntries = await fetchTopStudents({ role: "student" }, 30);
        await StudentLeaderboard.findOneAndUpdate(
            { level: "india" },
            { referenceId:"india",entries: indiaEntries, generatedAt: new Date() },
            { upsert: true }
        );

        console.log("✅ Leaderboards generated successfully");
    } catch (error) {
        console.error("❌ Error generating leaderboards:", error);
        throw error;
    }
};

/* ----------------- Express Route Handler ----------------- */
export const generateAllLeaderboards = async (req, res) => {
    try {
        await generateAllLeaderboardsJob();
        res.status(200).json({
            message: "All leaderboards generated successfully",
        });
    } catch (error) {
        res.status(500).json({ message: "Error generating leaderboards" });
    }
};

/* ----------------- Get Leaderboard ----------------- */
export const getLeaderboard = async (req, res) => {
    try {
        const { level, referenceId } = req.params;

        // Build query
        const query = { level };

        if (referenceId) {
            const isObjectId = /^[0-9a-fA-F]{24}$/.test(referenceId);
            query.referenceId = isObjectId
                ? new mongoose.Types.ObjectId(referenceId)
                : referenceId; 
        }

        const leaderboard = await StudentLeaderboard.findOne(query);

        if (!leaderboard) {
            return res.status(404).json({ message: "Leaderboard not found" });
        }

        res.status(200).json({ leaderboard });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};
