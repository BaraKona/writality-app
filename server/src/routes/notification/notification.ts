import express from "express";
import {
	sendProjectInvite,
	revokeProjectInvite,
	openNotification,
	acceptProjectInvitation,
} from "../../controllers/notification/cNotification";
import { protect } from "../../middleware/jwtAuth";

const router = express.Router();

router.post("/project-invite/:projectId/:userId", protect, sendProjectInvite);
router.delete(
	"/project-invite/:projectId/:inviteeId",
	protect,
	revokeProjectInvite
);
router.patch("/open-notification/:notificationId", protect, openNotification);
router.patch(
	"/accept-project-invitation/:notificationId/:projectId",
	protect,
	acceptProjectInvitation
);

export default router;
