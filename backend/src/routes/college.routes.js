import express from "express";
import {
    getColleges,
    getCollegeStats,
    joinCollege,
    postCollege,
    getCollegeDetails,
} from "../controllers/college.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { roleMiddleware } from "../middleware/role.middleware.js";

const router = express.Router();

router.get("", getColleges);
router.post("", authMiddleware, roleMiddleware(["manager"]), postCollege);
router.post("/join", authMiddleware, roleMiddleware(["hod"]), joinCollege);
router.get(
    "/:id/stats",
    // authMiddleware,
    getCollegeStats
);
router.get(
    "/:id/details",
    // authMiddleware,
    // roleMiddleware(["manager", "hod", "coordinator", "student"]),
    getCollegeDetails
);

export default router;