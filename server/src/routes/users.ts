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
	addFavouriteTabs,
} from "../controllers/cUser";
import { protect } from "../middleware/jwtAuth";

const router = express.Router();

router.post("/signup", createUser);
// router.post("/", loginUser);
router.get("/", protect, getUser);
router.get("/all", protect, getAllUsers);
router.patch("/", protect, updateUserData);
router.post("/signin", signIn);
router.post("/logout", signOut);
router.post("/favourites/tabs", protect, addFavouriteTabs);
router.post("/favourites", protect, addFavouriteProject);
router.delete("/favourites", protect, removeFavouriteProject);
export default router;
