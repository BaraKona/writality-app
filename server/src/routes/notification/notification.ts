import express from "express";
import { sendProjectInvite } from "../../controllers/notification/cNotification";
import { protect } from "../../middleware/jwtAuth";

const router = express.Router();

router.post("/project-invite/:projectId/:userId", protect, sendProjectInvite);

export default router;
