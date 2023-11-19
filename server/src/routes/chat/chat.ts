import express from "express";
import {
	createChat,
	commentOnChat,
	getProjectChat,
	getUserChatById,
} from "../../controllers/chat/cChat";
import { protect } from "../../middleware/jwtAuth";

const router = express.Router();

router.get("/project/:projectId", protect, getProjectChat);
router.get("/user/:chatId", protect, getUserChatById);
router.patch("/comment/:chatId", protect, commentOnChat);
router.post("/", protect, createChat);

export default router;
