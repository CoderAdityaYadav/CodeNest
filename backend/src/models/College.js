import mongoose from "mongoose";

const collegeSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        location: {
            city: String,
            state: String,
        },
        manager: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            unique: true,
        },
        branches: [{ type: mongoose.Schema.Types.ObjectId, ref: "Branch" }],
        joinCode: { type: String, required: true, unique: true }, // for HODs to join
    },
    { timestamps: true }
);

export default mongoose.model("College", collegeSchema);