import crypto from "crypto";
import College from "../models/College.js";
import User from "../models/User.js"
import Branch from "../models/Branch.js"; // Assuming you have a Branch model


export async function getColleges(req, res) {
    try {
        const colleges = await College.find();
        return res
            .status(200)
            .json({
                success: true,
                message: "Colleges Successfully laoded.",
                data: colleges,
            });
    } catch (error) {
        console.error("Error in getColleges:", error.message);
        return res
            .status(500)
            .json({ success: false, message: "Internal Server Error" });
    }
}

export async function postCollege(req, res) {
    try {
        const { name, city, state } = req.body;
        if (!name || !city || !state)
            return res
                .status(400)
                .json({ success: false, message: "All fields required" });
        const userId = req.user.userId;
        const joinCode = crypto.randomBytes(4).toString("hex");
        const college = await College.create({
            name,
            location: {
                city,
                state,
            },
            manager: userId,
            joinCode,
        });
        if (!college)
            return res
                .status(500)
                .json({ success: false, message: "College was not created" });
        const user = await User.findByIdAndUpdate(userId, {
            collegeId: college._id,
        });
        if (!user)
            return res.status(500).json({
                success: false,
                message: "Failed to assign college to user",
            });
        return res
            .status(200)
            .json({ success: true, message: "College was added successfully" });
    } catch (error) {
        console.error("Error in postCollege:", error.message);
        return res
            .status(500)
            .json({ success: false, message: "Internal Server Error" });
    }
}

export async function joinCollege(req, res) {
    try {
        const { joinCode, collegeId } = req.body;
        const college = await College.findById(collegeId);
        if (college.joinCode !== joinCode) return res.status(400).json({ success: false, message: "Wrong Join Code" });
        await User.findByIdAndUpdate(req.user.userId, { collegeId: college._id });
        return res.status(200).json({ success: true, message: "Joined College as HOD successfully" });
    } catch(error) {
        console.error("Error in joinCollege:", error.message);
        return res
            .status(500)
            .json({ success: false, message: "Internal Server Error" });
    }
}

export async function getCollegeStats(req, res) {
    try {
        const collegeId = req.params.id;

        // Fetch all students and HODs in the college
        const users = await User.find({ collegeId }).select(
            "role stats score name handles branchId"
        );

        const studentUsers = users.filter((u) => u.role === "student");
        const totalStudents = studentUsers.length;

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

        // College-wide stats
        const collegeStats = calculateStats(studentUsers);

        // Branch-wise stats
        const branches = await Branch.find({ collegeId }).select("name hod");

        const branchStats = {};
        for (const branch of branches) {
            const branchStudents = studentUsers.filter(
                (s) => s.branchId.toString() === branch._id.toString()
            );

            // Find HOD name
            const hod = (await User.findOne({ _id: branch.hod }).select(
                "name"
            )) || { name: "Not assigned" };

            branchStats[branch._id] = {
                branchName: branch.name,
                hodName: hod.name,
                stats: calculateStats(branchStudents),
            };
        }
        return res.status(200).json({
            success: true,
            message: "",
            data: {
                counts: {
                    totalStudents,
                    activeStudents: collegeStats.total.activeStudents,
                    activePercentage: collegeStats.total.activePercentage,
                },
                stats: collegeStats,
                branches: branchStats,
            },
        });
    } catch (error) {
        console.error("Error in getCollegeStats:", error.message);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}

export async function getCollegeDetails(req, res) {
    try {
        const collegeId=req.params.id;
        const college = await College.findById(collegeId).select("-joinCode");
        if (!college)
            return res
                .status(400)
                .json({ success: false, message: "No such college exists" });
        return res
            .status(200)
            .json({
                success: true,
                message: "College Details Fetched Successfully",
                data: college,
            });
    } catch (error) {
        console.error("Error in getCollegeDetails:", error.message);
        return res
            .status(500)
            .json({ success: false, message: "Internal Server Error" });
    }
}

// Also have to create a getBranchDetailsByCollege