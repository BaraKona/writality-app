import express from "express";
import { getProjectWordCount } from "../controllers/cAnalytics";
import { protect } from "../middleware/jwtAuth";
const router = express.Router();

router.get("/project/wordCount/:projectId", protect, getProjectWordCount);

export default router;
