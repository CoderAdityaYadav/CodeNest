import User from "../models/User.js";
import Section from "../models/Section.js";
import College from "../models/College.js";
import Branch from "../models/Branch.js";

export async function updateProfile(req, res) {
    try {
        const userId = req.user.userId;
        const { name, email, leetcode, github, gfg } = req.body;
        const updates = {};
        if (name) updates.name = name;
        if (email) updates.email = email;
        if (leetcode || gfg || github) {
            updates.handles = {};
            if (leetcode) updates.handles.leetcode = leetcode;
            if (gfg) updates.handles.gfg = gfg;
            if (github) updates.handles.github = github;
        }
        if (Object.keys(updates).length === 0) {
            return res.status(400).json({
                success: false,
                message: "No valid fields provided for update",
            });
        }
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: updates },
            { new: true, runValidators: true }
        ).select("-password");
        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            data: updatedUser,
        });
    } catch (error) {
        console.error("Error in updateProfile:", error.message);
        return res
            .status(500)
            .json({ success: false, message: "Internal Server Error" });
    }
}

export async function checkReadinessScore(req, res) {
    try {
    } catch {}
}

export async function getJoinCodebyUser(req, res) {
    try {
        const user = await User.findById(req.user.userId);
        let institiuition;
        if (user.sectionId) {
            institiuition = await Section.findById(user.sectionId);
        } else if (user.branchId) {
            institiuition = await Branch.findById(user.branchId);
        } else if (user.collegeId) {
            institiuition = await College.findById(user.collegeId);
        } else {
            return res.status(400).json({
                success: false,
                message: "Join any instituion to store its join Code",
            });
        }
        return res.status(200).json({
            success: true,
            message: "Join Code fetched Successfully",
            data: {
                joinCode: institiuition.joinCode,
                name: institiuition.name,
            },
        });
    } catch (error) {
        console.error("Error in getJoinCodeByUser:", error.message);
        return res
            .status(500)
            .json({ success: false, message: "Internal Server Error" });
    }
}
