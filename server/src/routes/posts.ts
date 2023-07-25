import express from "express";
import {
	createPost,
	getPosts,
	useSinglePost,
	getUserPosts,
} from "../controllers/cPosts";
import { protect } from "../middleware/jwtAuth";
const router = express.Router();

router.get("/", protect, getPosts);
router.post("/", protect, createPost);
router.get("/user", protect, getUserPosts);
router.get("/:postId", useSinglePost);
export default router;
