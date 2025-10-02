import Branch from "../models/Branch.js";
import Section from "../models/Section.js";
import User from "../models/User.js";
import crypto from "crypto";

export async function postSection(req, res) {
    try {
        const { name } = req.body;
        if (!name)
            return res.status(400).json({
                success: false,
                message: "Enter the name of the section",
            });
        const userId = req.user.userId;
        const user = await User.findById(userId);
        const joinCode = crypto.randomBytes(4).toString("hex");
        const section = await Section.create({
            name,
            joinCode,
            coordinator: userId,
            branchId: user.branchId,
            collegeId: user.collegeId,
        });
        if (!section)
            return res
                .status(400)
                .json({ success: false, message: "Section was not created" });
        await Branch.findByIdAndUpdate(
            user.branchId,
            {
                $push: { sections: section._id },
            },
            { new: true }
        );
        await User.findByIdAndUpdate(userId, { sectionId: section._id });
        return res.status(201).json({
            success: true,
            message: "Section was created Successfully",
        });
    } catch (error) {
        console.error("Error in postSection:", error.message);
        return res
            .status(500)
            .json({ success: false, message: "Internal Server Error" });
    }
}

export async function joinSection(req, res) {
    try {
        const { joinCode, collegeId } = req.body;
        const userId = req.user.userId;
        const section = await Section.findOne({ joinCode });
        if (!section || String(section.collegeId) !== String(collegeId))
            return res
                .status(400)
                .json({ success: false, message: "Wrong join code" });
        await Section.findByIdAndUpdate(
            section._id,
            { $addToSet: { students: userId } },
            { new: true }
        );
        await User.findByIdAndUpdate(userId, {
            sectionId: section._id,
            collegeId,
            branchId: section.branchId,
        });
        return res
            .status(200)
            .json({ success: true, message: "Joined Section successfully" });
    } catch (error) {
        console.error("Error in joinSection:", error.message);
        return res
            .status(500)
            .json({ success: false, message: "Internal Server Error" });
    }
}

export async function getSectionStats(req, res) {
    try {
        const sectionId = req.params.id;

        // Fetch all students in the section
        const users = await User.find({ sectionId, role: "student" }).select(
            "stats score name handles"
        );

        

        const totalStudents = users.length;

        // Helper function to calculate totals & averages (same as above)
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

        // Get section information
        const section = await Section.findById(sectionId).select(
            "name coordinator branchId collegeId"
        );
        if (!section) {
            return res.status(404).json({
                success: false,
                message: "Section not found",
            });
        }

        // Find coordinator name
        const coordinator = (await User.findOne({
            _id: section.coordinator,
        }).select("name")) || {
            name: "Not assigned",
        };

        // Get branch name
        const branch = await Branch.findById(section.branchId).select("name");

        // Calculate section stats
        const sectionStats = calculateStats(users);

        return res.status(200).json({
            success: true,
            message: "",
            data: {
                sectionInfo: {
                    sectionId: section._id,
                    sectionName: section.name,
                    coordinatorName: coordinator.name,
                    branchId: section.branchId,
                    branchName: branch?.name || "Unknown",
                    collegeId: section.collegeId,
                },
                counts: {
                    totalStudents,
                    activeStudents: sectionStats.total.activeStudents,
                    activePercentage: sectionStats.total.activePercentage,
                },
                stats: sectionStats,
            },
        });
    } catch (error) {
        console.error("Error in getSectionStats:", error.message);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}


export async function getSectionDetails(req, res) {
    try {
        const sectionId = req.params.id;
        const section = await Section.findById(sectionId);
        if (!section)
            return res
                .status(400)
                .json({ success: false, message: "Section does not exist" });
        res.status(200).json({
            success: true,
            message: "Branch Details Fetched Successfully",
            data: section,
        });
    } catch (error) {
        console.error("Error in getSectionDetails:", error.message);
        return res
            .status(500)
            .json({ success: false, message: "Internal Server Error" });
    }
}
