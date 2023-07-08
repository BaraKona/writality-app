import express from "express";
import {
	createUser,
	getUser,
	getAllUsers,
	signIn,
	signOut,
} from "../controllers/cUser";
import { protect } from "../middleware/jwtAuth";

const router = express.Router();

router.post("/signup", createUser);
// router.post("/", loginUser);
router.get("/", protect, getUser);
router.get("/all", protect, getAllUsers);
router.post("/signin", signIn);
router.post("/logout", signOut);
export default router;
