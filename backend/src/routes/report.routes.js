import express from "express";
import {
    getUserReport,
    postStudentReport,
    postCoordinatorReport,
    postManagerReport,
    postRecruiterReportForCollege,
    postHodReport,
} from "../controllers/report.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { roleMiddleware } from "../middleware/role.middleware.js";

const router = express.Router();

router.post(
    "/studentReport",
    authMiddleware,
    roleMiddleware(["student"]),
    postStudentReport
);
router.post(
    "/coordinatorReport",
    authMiddleware,
    roleMiddleware(["coordinator"]),
    postCoordinatorReport
);
router.post("/hodReport", authMiddleware, roleMiddleware(["hod"]), postHodReport);
router.post(
    "/managerReport",
    authMiddleware,
    roleMiddleware(["manager"]),
    postManagerReport
);
router.post(
    "/recruiterReport/:collegeId",
    authMiddleware,
    roleMiddleware(["recruiter"]),
    postRecruiterReportForCollege
);

router.get("/userReport", authMiddleware, getUserReport);

export default router;
