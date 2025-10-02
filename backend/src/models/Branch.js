import mongoose from "mongoose";

const branchSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        collegeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "College",
            required: true,
        },

        hod: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            unique: true,
        },
        sections: [{ type: mongoose.Schema.Types.ObjectId, ref: "Section" }],

        joinCode: { type: String, required: true, unique: true }, 
    },
    { timestamps: true }
);

export default mongoose.model("Branch", branchSchema);