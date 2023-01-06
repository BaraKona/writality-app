import express from "express";
import {
  createChat,
  commentOnChat,
  getProjectChat,
} from "../../controllers/chat/cChat";

const router = express.Router();

router.get("/:projectId", getProjectChat);
router.post("/:projectId", commentOnChat);
router.post("/", createChat);

export default router;
