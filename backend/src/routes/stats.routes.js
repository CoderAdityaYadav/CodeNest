import express from "express"
import { getAllStats,getGfgStats,getGitStats,getLeetcodeStats } from "../controllers/stats.controller.js";
const router = express.Router();

router.get("/:userId", getAllStats);
router.get("/leetcodeStats/:userId", getLeetcodeStats);
router.get("/gfgStats/:userId", getGfgStats);
router.get("/githubStats/:userId", getGitStats);

export default router;