import crypto from "crypto";
import Branch from "../models/Branch.js";
import College from "../models/College.js";
import User from "../models/User.js";

export async function postBranch(req, res) {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Enter the name of the branch",
            });
        }
        const userId = req.user.userId;
        const user = await User.findById(userId);
        if (!user) {
            return res
                .status(404)
                .json({ success: false, message: "User not found" });
        }
        if (!user.collegeId) {
            return res.status(400).json({
                success: false,
                message: "User must belong to a college to create a branch",
            });
        }
        const joinCode = crypto.randomBytes(4).toString("hex");
        // Create branch
        const branch = await Branch.create({
            name,
            joinCode,
            hod: userId,
            collegeId: user.collegeId,
        });
        // Add branch to college
        const college = await College.findByIdAndUpdate(
            user.collegeId,
            { $push: { branches: branch._id } },
            { new: true }
        );
        if (!college) {
            return res
                .status(404)
                .json({ success: false, message: "College not found" });
        }
        // Update user with branchId
        await User.findByIdAndUpdate(userId, { branchId: branch._id });
        return res.status(201).json({
            success: true,
            message: "Branch created successfully",
            data: { branch, college },
        });
    } catch (error) {
        console.error("Error in postBranch:", error.message);
        return res
            .status(500)
            .json({ success: false, message: "Internal Server Error" });
    }
}

export async function joinBranch(req, res) {
    try {
        const { joinCode, collegeId } = req.body;
        const userId = req.user.userId;
        const branch = await Branch.findOne({ joinCode });
        if (!branch || String(branch.collegeId) !== String(collegeId)) {
            return res
                .status(400)
                .json({ success: false, message: "Invalid join code" });
        }
        await User.findByIdAndUpdate(userId, { branchId: branch._id,collegeId:collegeId });
        return res
            .status(200)
            .json({ success: true, message: "Joined Branch successfully" });
    } catch (error) {
        console.error("Error in joinBranch:", error.message);
        return res
            .status(500)
            .json({ success: false, message: "Internal Server Error" });
    }
}

export async function getBranchStats(req, res) {
    try {
        const branchId = req.params.id;

        // Fetch all students in the branch
        const users = await User.find({ branchId, role: "student" }).select(
            "stats score name handles"
        );

        const totalStudents = users.length;

        // Helper function to calculate totals & averages
        function calculateStats(students) {
            let lcEasy = 0,
                lcMedium = 0,
                lcHard = 0;
            let gfgSolved = 0,
                githubRepos = 0,
                totalScore = 0;
            let activeCount = 0;

            students.forEach((s) => {
                const lc = s.stats?.leetcode || {};
                const gfg = s.stats?.gfg || {};
                const gh = s.stats?.github || {};

                lcEasy += lc.easySolved || 0;
                lcMedium += lc.mediumSolved || 0;
                lcHard += lc.hardSolved || 0;
                gfgSolved += gfg.solved || 0;
                githubRepos += gh.repos || 0;
                totalScore += s.score || 0;

                if ((s.score || 0) > 0) activeCount++;
            });

            const count = students.length;
            return {
                total: {
                    leetcode: { easy: lcEasy, medium: lcMedium, hard: lcHard },
                    gfg: gfgSolved,
                    github: githubRepos,
                    avgScore: count ? totalScore / count : 0,
                    activeStudents: activeCount,
                    activePercentage: count
                        ? Math.round((activeCount / count) * 100)
                        : 0,
                },
                average: {
                    leetcode: count
                        ? {
                              easy: Math.round(lcEasy / count),
                              medium: Math.round(lcMedium / count),
                              hard: Math.round(lcHard / count),
                          }
                        : { easy: 0, medium: 0, hard: 0 },
                    gfg: count ? Math.round(gfgSolved / count) : 0,
                    github: count ? Math.round(githubRepos / count) : 0,
                    avgScore: count ? Math.round(totalScore / count) : 0,
                },
                topStudents: students
                    .sort((a, b) => b.score - a.score)
                    .slice(0, 5)
                    .map((s) => ({
                        name: s.name,
                        score: s.score,
                        handles: s.handles,
                    })),
            };
        }

        // Get branch information
        const branch = await Branch.findById(branchId).select(
            "name hod collegeId"
        );
        if (!branch) {
            return res.status(404).json({
                success: false,
                message: "Branch not found",
            });
        }

        // Find HOD name
        const hod = (await User.findOne({ _id: branch.hod }).select(
            "name"
        )) || {
            name: "Not assigned",
        };

        // Calculate branch stats
        const branchStats = calculateStats(users);

        return res.status(200).json({
            success: true,
            message: "",
            data: {
                branchInfo: {
                    branchId: branch._id,
                    branchName: branch.name,
                    hodName: hod.name,
                    collegeId: branch.collegeId,
                },
                counts: {
                    totalStudents,
                    activeStudents: branchStats.total.activeStudents,
                    activePercentage: branchStats.total.activePercentage,
                },
                stats: branchStats,
            },
        });
    } catch (error) {
        console.error("Error in getBranchStats:", error.message);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}


export async function getBranchDetails(req, res) {
    try {
        const branchId = req.params.id;
        const branch = await Branch.findById(branchId);
        if (!branch)
            return res
                .status(400)
                .json({ success: false, message: "Branch does not exist" });
        res.status(200).json({
            success: true,
            message: "Branch Details Fetched Successfully",
            data: branch,
        });
    } catch (error) {
        console.error("Error in getBranchDetails:", error.message);
        return res
            .status(500)
            .json({ success: false, message: "Internal Server Error" });
    }
}

// Also have to create a getSectionDetailsByBranch