import mongoose from "mongoose";

const studentLeaderboardSchema = new mongoose.Schema(
    {
        level: {
            type: String,
            enum: ["section", "branch", "college", "city", "state", "india"],
            required: true,
        },
        referenceId: {
            type: mongoose.Schema.Types.Mixed,
        },
        levelRef: {
            type: String,
            enum: ["Section", "Branch", "College"], 
        },
        entries: [
            {
                userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
                name: String,
                score: Number,
                easySolved: Number,
                mediumSolved: Number,
                hardSolved: Number,
                gfgSolved: Number,
                gfgCodingScore: Number,
                githubRepos: Number,
                collegeId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "College",
                },
                branchId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Branch",
                },
                sectionId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Section",
                },
                rank: Number,
            },
        ],
        generatedAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

export default mongoose.model("StudentLeaderboard", studentLeaderboardSchema);