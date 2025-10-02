import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        email: { type: String, required: true, unique: true, lowercase: true },
        password: { type: String, required: true },

        role: {
            type: String,
            enum: ["student", "coordinator", "hod", "manager", "admin","recruiter"],
            default: "student",
        },

        collegeId: { type: mongoose.Schema.Types.ObjectId, ref: "College" },
        branchId: { type: mongoose.Schema.Types.ObjectId, ref: "Branch" },
        sectionId: { type: mongoose.Schema.Types.ObjectId, ref: "Section" },

        handles: {
            leetcode: { type: String, trim: true },
            gfg: { type: String, trim: true },
            github: { type: String, trim: true },
        },

        stats: {
            leetcode: {
                easySolved: { type: Number, default: 0 },
                mediumSolved: { type: Number, default: 0 },
                hardSolved: { type: Number, default: 0 },
            },
            gfg: {
                solved: { type: Number, default: 0 },
                codingScore: { type: Number, default: 0 },
            },
            github: {
                repos: { type: Number, default: 0 },
            },
        },
        score: { type: Number, default: 0 },
    },
    { timestamps: true }
);

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        return next(error);
    }
});

export default mongoose.model("User", userSchema);