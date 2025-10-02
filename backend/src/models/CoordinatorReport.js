import mongoose from "mongoose";

const coordinatorReportSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        name: { type: String, required: true },
        email: { type: String, required: true },
        sectionId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Section",
            required: true,
        },
        branchId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Branch",
            required: true,
        },
        collegeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "College",
            required: true,
        },
        reportMarkdown: { type: String },
        reportStats: {
            type: Object,
            default: null,
        },
        last_updated: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

export default mongoose.model("CoordinatorReport", coordinatorReportSchema);
