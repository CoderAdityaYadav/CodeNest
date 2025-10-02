// controllers/report.controller.js
import User from "../models/User.js";
import StudentReport from "../models/StudentReport.js";
import College from "../models/College.js";
import RecruiterReport from "../models/RecruiterReport.js";
import axios from "axios";
import {
    customModelForCoordinator,
    customModelForRecruiters,
    customModelForStudents,
} from "../services/googleCustomModel.js";
import CoordinatorReport from "../models/CoordinatorReport.js";

export async function postStudentReport(req, res) {
    try {
        const userId = req.user?.userId;
        const user = await User.findById(userId);
        if (!user) {
            return res
                .status(404)
                .json({ success: false, message: "User not found!" });
        }
        const lcSolved =
            user.stats.leetcode.easySolved +
            user.stats.leetcode.mediumSolved +
            user.stats.leetcode.hardSolved;
        const gfgSolved = user.stats.gfg.solved;
        const githubRepos = user.stats.github.repos;

        const { results, errors } = await getAllStatsForStudent(user);
        const payload = {
            data: { stats: results },
            errors,
        };
        const { markdown, data } = await customModelForStudents(payload);
        const normalizedData = {
            readiness_score: data.readiness_score,
            problem_solving: data["Problem-Solving"],
            portfolio: data.Portfolio,
            readiness_execution: data["Readiness/Execution"],
            top_strengths: data.top_strengths || [],
            top_gaps: data.top_gaps || [],
            key_metrics: {
                leetcode_solved: data.key_metrics.leetcode_solved || lcSolved,
                gfg_solved: data.key_metrics.gfg_solved || gfgSolved,
                github_repos: data.key_metrics.github_repos || githubRepos,
            },
        };
        const reportPayload = {
            userId,
            name: user.name,
            email: user.email,
            sectionId: user.sectionId,
            branchId: user.branchId,
            collegeId: user.collegeId,
            report: { data: normalizedData, markdown },
            last_updated: new Date(),
        };
        await StudentReport.findOneAndUpdate({ userId }, reportPayload, {
            upsert: true,
            new: true,
            setDefaultsOnInsert: true,
        });
        return res.status(200).json({
            success: true,
            message:
                "Successfully retrieved all Stats for a single User and saved",
            data: { markdown, data: normalizedData },
        });
    } catch (error) {
        console.error("Error in getStudentReport:", error.message);
        return res
            .status(500)
            .json({ success: false, message: "Internal Server Error" });
    }
}

async function getAllStatsForStudent(user) {
    try {
        const tasks = {
            leetcode: user.handles?.leetcode
                ? axios.get(
                      `${process.env.LEETCODE_API}/${user.handles.leetcode}`
                  )
                : Promise.reject(new Error("LeetCode ID not set!")),
            gfg: user.handles?.gfg
                ? axios.get(`${process.env.GFG_API}/${user.handles.gfg}`)
                : Promise.reject(new Error("GFG ID not set!")),
            github: user.handles?.github
                ? axios.get(`${process.env.GIT_API}/${user.handles.github}`, {
                      headers: {
                          // Stronger, documented GitHub headers:
                          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`, // "token" also accepted
                          "User-Agent": "mern-stats-app",
                          Accept: "application/vnd.github+json",
                          "X-GitHub-Api-Version": "2022-11-28",
                      },
                  })
                : Promise.reject(new Error("GitHub ID not set!")),
        };

        const results = {};
        const errors = {};

        const settled = await Promise.allSettled([
            tasks.leetcode,
            tasks.gfg,
            tasks.github,
        ]);

        ["leetcode", "gfg", "github"].forEach((key, i) => {
            if (settled[i].status === "fulfilled") {
                results[key] = settled[i].value.data; // only .data payload
            } else {
                errors[key] = settled[i].reason?.message ?? "Unknown error";
            }
        });

        return { results, errors };
    } catch (error) {
        console.error("Error in getAllStatsForStudent:", error);
        throw error;
    }
}

export async function postCoordinatorReport(req, res) {
    try {
        const userId = req.user.userId;
        const user = await User.findById(userId);

        if (!user) {
            return res
                .status(404)
                .json({ success: false, message: "Coordinator not found" });
        }

        const sectionId = user.sectionId;
        const students = await StudentReport.find({ sectionId }).select(
            "name email last_updated report"
        );

        const result = students.map((student) => ({
            name: student.name,
            email: student.email,
            last_updated: student.last_updated,
            reportData: student.report?.data || null,
        }));

        // Call AI model
        const report = await customModelForCoordinator(result);

        // Build payload
        const payload = {
            userId,
            name: user.name,
            email: user.email,
            sectionId: user.sectionId,
            branchId: user.branchId,
            collegeId: user.collegeId,
            reportMarkdown: report.markdown,
            reportStats: report.json || null, // save aggregated stats JSON
            last_updated: new Date(),
        };

        // Upsert coordinator report
        const updatedReport = await CoordinatorReport.findOneAndUpdate(
            { userId },
            payload,
            {
                upsert: true,
                new: true,
                setDefaultsOnInsert: true,
            }
        );

        return res.status(200).json({
            success: true,
            message:
                "Coordinator report fetched successfully and updated the Coordinator Report",
            data: updatedReport, // returning saved version (includes stats)
        });
    } catch (error) {
        console.error("❌ Error in getCoordinatorReport:", error.message);
        return res
            .status(500)
            .json({ success: false, message: "Internal Server Error" });
    }
}

export async function postHodReport(req, res) {
    try {
    } catch (error) {
        console.error("Error in getStudentReport:", error.message);
        return res
            .status(500)
            .json({ success: false, message: "Internal Server Error" });
    }
}
export async function postManagerReport(req, res) {
    try {
    } catch (error) {
        console.error("Error in getStudentReport:", error.message);
        return res
            .status(500)
            .json({ success: false, message: "Internal Server Error" });
    }
}

export async function postRecruiterReportForCollege(req, res) {
    try {
        const userId = req.user.userId;
        const user = await User.findById(userId);
        const collegeId = req.params.collegeId;
        const college = await College.findById(collegeId);

        // Get all coordinator reports for this college
        const coordinatorReports = await CoordinatorReport.find({
            collegeId,
        }).select("reportMarkdown reportStats");
        const coordinatorData = coordinatorReports.map((r) => ({
            markdown: r.reportMarkdown,
            stats: r.reportStats,
        }));

        const report = await customModelForRecruiters(coordinatorData);
        if (!report.json) {
            return res.status(500).json({
                success: false,
                message: "Failed to generate recruiter report from AI",
            });
        }
        const payload = {
            userId,
            name: user.name,
            email: user.email,
            collegeId,
            collegeName: college.name,
            reportMarkdown: report.markdown,
            reportStats: report.json,
            last_updated: new Date(),
        };

        const updatedReport = await RecruiterReport.findOneAndUpdate(
            { collegeId },
            payload,
            {
                upsert: true,
                new: true,
                setDefaultsOnInsert: true,
            }
        );
        if (!updatedReport)
            return res.status(500).json({
                message: "Error in saving the report",
                success: false,
            });

        return res.status(200).json({
            success: true,
            message:
                "Recruiter report fetched successfully and updated the Recruiter Report",
            data: updatedReport,
        });
    } catch (error) {
        console.error("❌ Error in getRecruiterReportForCollege:", error);
        return res
            .status(500)
            .json({ success: false, message: "Internal Server Error" });
    }
}

export async function getUserReport(req, res) {
    try {
        const userId = req.user.userId;
        const user = await User.findById(userId);
        let report;

        if (user.role === "student") {
            report = await StudentReport.find({ userId });
        } else if (user.role === "coordinator") {
            report = await CoordinatorReport.find({ userId });
        } else if (user.role === "recruiter") {
            report = await RecruiterReport.find({ userId });
        } else {
            return res.status(400).json({
                message: "Invalid user role.",
                success: false,
            });
        }
        if (!report || report.length === 0) {
            return res.status(404).json({
                message: "User has not generated any report.",
                success: false,
            });
        }

        return res.status(200).json({
            message: "Report(s) fetched successfully",
            success: true,
            data: report,
        });
    } catch (error) {
        console.error("❌ Error in getUserReport:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}
