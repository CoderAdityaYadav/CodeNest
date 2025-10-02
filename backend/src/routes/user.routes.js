import express from "express";
import {
    checkReadinessScore,
    updateProfile,
    getJoinCodebyUser,
} from "../controllers/user.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.patch("/update", authMiddleware, updateProfile);
router.get("/join-code", authMiddleware, getJoinCodebyUser);
router.get("/readiness-score/:studentId", authMiddleware, checkReadinessScore);

export default router