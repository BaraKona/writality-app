import express from "express";
import {
	createChat,
	commentOnChat,
	getProjectChat,
} from "../../controllers/chat/cChat";
import { protect } from "../../middleware/jwtAuth";

const router = express.Router();

router.get("/:projectId", protect, getProjectChat);
router.patch("/:projectId/chat/:chatId/comment", protect, commentOnChat);
router.post("/", protect, createChat);

export default router;
