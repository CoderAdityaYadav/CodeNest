import mongoose from "mongoose";

const recruiterReportSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, required: true },
        name: { type: String, required: true },
        email: { type: String, required: true },
        collegeId: { type: mongoose.Schema.Types.ObjectId, required: true },
        collegeName: { type: String, required: true },
        reportMarkdown: { type: String },
        reportStats: { type: Object, default: null },
        last_updated: { type: Date, default:  Date.now() },
    },
    { timestamps: true }
);

export default mongoose.model("RecruiterReport", recruiterReportSchema);