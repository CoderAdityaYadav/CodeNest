import mongoose from "mongoose";

const sectionSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
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
        coordinator: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            unique: true,
        }, 
        students: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

        joinCode: { type: String, required: true, unique: true }, // for students to join
    },
    { timestamps: true }
);

export default mongoose.model("Section", sectionSchema);