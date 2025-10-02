import express from "express";
import {
    getBranchStats,
    joinBranch,
    postBranch,
    getBranchDetails,
} from "../controllers/branch.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { roleMiddleware } from "../middleware/role.middleware.js";
import { sameCollegeMiddlewareForBranch } from "../middleware/sameCollege.middleware.js";

const router = express.Router();

router.post("", authMiddleware, roleMiddleware(["hod"]), postBranch);
router.post(
    "/join",
    authMiddleware,
    roleMiddleware(["coordinator"]),
    joinBranch
);
router.get(
    "/:id/stats",
    authMiddleware,
    sameCollegeMiddlewareForBranch,
    getBranchStats
);
router.get(
    "/:id/details",
    authMiddleware,
    roleMiddleware(["hod", "manager", "coordinator"]),
    getBranchDetails
);

export default router;
