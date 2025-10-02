import mongoose from "mongoose";

const studentReportSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    name: { type: String, required: true },
    email: { type: String, required: true },
    sectionId: { type: mongoose.Schema.Types.ObjectId, ref: "Section" },
    branchId: { type: mongoose.Schema.Types.ObjectId, ref: "Branch" },
    collegeId: { type: mongoose.Schema.Types.ObjectId, ref: "Section" },
    report: {
        data: {
            readiness_score: { type: Number },
            problem_solving: { type: Number },
            portfolio: { type: Number },
            readiness_execution: { type: Number },

            top_strengths: [{ type: String }],
            top_gaps: [{ type: String }],

            key_metrics: {
                leetcode_solved: { type: Number },
                gfg_solved: { type: Number },
                github_repos: { type: Number },
            },
        },
        markdown: { type: String }, // optional, for display
    },
    last_updated: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.model("StudentReport", studentReportSchema);