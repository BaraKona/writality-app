import express from "express";
import {
	createPost,
	getPosts,
	useSinglePost,
	getUserPosts,
	getSingleUserPosts,
} from "../controllers/cPosts";
import { protect } from "../middleware/jwtAuth";
const router = express.Router();

router.get("/", protect, getPosts);
router.get("/user", protect, getUserPosts);
router.get("/:postId", useSinglePost);
router.get("/user/public/:userId", protect, getSingleUserPosts);
router.post("/", protect, createPost);
export default router;
