import express from "express";
import {
    getSectionStats,
    joinSection,
    postSection,
    getSectionDetails,
} from "../controllers/section.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { roleMiddleware } from "../middleware/role.middleware.js";
import { sameCollegeMiddlewareForSection } from "../middleware/sameCollege.middleware.js";

const router = express.Router();

router.post("", authMiddleware, roleMiddleware(["coordinator"]), postSection);
router.post(
    "/join",
    authMiddleware,
    roleMiddleware(["student"]),
    joinSection
);
router.get(
    "/:id/stats",
    authMiddleware,
    sameCollegeMiddlewareForSection,
    getSectionStats
);
router.get(
    "/:id/details",
    authMiddleware,
    roleMiddleware(["coordinator", "hod", "manager", "student"]),
    getSectionDetails
);

export default router;