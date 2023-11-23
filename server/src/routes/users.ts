import express from "express";
import {
	createUser,
	getUser,
	getAllUsers,
	signIn,
	signOut,
	addFavouriteProject,
	removeFavouriteProject,
	updateUserData,
	addbookmarks,
	getSingleUser,
	sendVerificationEmail,
	verifyEmail,
	completeOnboarding,
	removeBookmark,
} from "../controllers/cUser";
import { protect } from "../middleware/jwtAuth";

const router = express.Router();

// router.post("/", loginUser);
router.get("/", protect, getUser);
router.get("/all", protect, getAllUsers);
router.get("/user/:userId", protect, getSingleUser);

router.post("/signup", createUser);
router.post("/signin", signIn);
router.post("/logout", signOut);
router.post("/favourites/tabs", protect, addbookmarks);

router.post("/favourites", protect, addFavouriteProject);
router.post("/email/send-verification", protect, sendVerificationEmail);
router.post("/email/verify", verifyEmail);
router.post("/onboarding", protect, completeOnboarding);

router.patch("/", protect, updateUserData);
router.patch("/bookmarks", protect, removeBookmark);

router.delete("/favourites", protect, removeFavouriteProject);

export default router;
