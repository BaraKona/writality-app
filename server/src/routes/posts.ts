import express from "express";
import { createPost, getPosts } from "../controllers/cPosts";
import { protect } from "../middleware/jwtAuth";
const router = express.Router();

router.get("/", protect, getPosts);
router.post("/", protect, createPost);

export default router;
