import User from "../models/User.js";
import Section from "../models/Section.js";
import Branch from "../models/Branch.js";

export async function sameCollegeMiddlewareForSection(req, res, next) {
    try {
        const user = await User.findById(req.user.userId);
        if (!user || !user.collegeId)
            return res.status(401).json({
                success: false,
                message: "Not authorized for this college",
            });
        const section = await Section.findById(req.params.id);
        if (!section) {
            return res
                .status(404)
                .json({ success: false, message: "Section not found" });
        }
        if (section.collegeId.toString() !== user.collegeId.toString())
            return res.status(403).json({
                success: false,
                message: "Forbidden Not same college",
            });
        next();
    } catch (error) {
        console.error("Error in sameCollegeMiddleware:", error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}

export async function sameCollegeMiddlewareForBranch(req, res, next) {
    try {
        const user = await User.findById(req.user.userId);
        if (!user || !user.collegeId) {
            return res.status(401).json({
                success: false,
                message: "Not authorized for this college",
            });
        }
        const branch = await Branch.findById(req.params.id);
        if (!branch) {
            return res.status(404).json({
                success: false,
                message: "Branch not found",
            });
        }
        if (branch.collegeId.toString() !== user.collegeId.toString()) {
            return res.status(403).json({
                success: false,
                message: "Forbidden: Not same college",
            });
        }
        next(); // ✅ everything good
    } catch (error) {
        console.error(
            "Error in sameCollegeMiddlewareForBranch:",
            error.message
        );
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}
