import mongoose from "mongoose";

const collegeLeaderboardSchema = new mongoose.Schema(
    {
        level: {
            type: String,
            enum: ["city", "state", "india"],
            required: true,
        },
        referenceId: {
            type: String, // "Ghaziabad", "Uttar Pradesh", or "india"
            required: true,
        },
        entries: [
            {
                collegeId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "College",
                    required: true,
                },
                collegeName: String,
                location: {
                    city: String,
                    state: String,
                },
                totalStudents: Number,
                averageScore: Number,
                totalScore: Number,
                topPerformers: Number, // students with score > 1000
                stats: {
                    totalEasySolved: Number,
                    totalMediumSolved: Number,
                    totalHardSolved: Number,
                    totalGfgSolved: Number,
                    totalGithubRepos: Number,
                    averageEasySolved: Number,
                    averageMediumSolved: Number,
                    averageHardSolved: Number,
                    averageGfgSolved: Number,
                    averageGithubRepos: Number,
                },
                rank: Number,
            },
        ],
        generatedAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

export default mongoose.model("CollegeLeaderboard", collegeLeaderboardSchema);