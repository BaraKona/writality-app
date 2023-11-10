import User from "../../models/user/userSchema";
import Project from "../../models/projectSchema";
import { notificationType } from "../../models/user/userSchema";
import { initPusher } from "../../../pusherProvider";
import { collaboratorRole } from "../../models/projectSchema";

export const sendProjectInvite = async (req: any, res: any) => {
	const { projectId, userId } = req.params;
	const inviteeId = req.user._id;
	const pusher = initPusher();

	try {
		const project = await Project.findOne({ uid: projectId });
		const user = await User.findOne({ uid: userId });
		const invitee = await User.findOne({ _id: inviteeId });

		if (!project || !user) {
			return res.status(404).json({ message: "Project or User not found" });
		}

		const notification = {
			notificationType: notificationType.projectInvite,
			notificationBody: `You have been invited to join ${project.title} by ${invitee.name}`,
			notificationTitle: "Invitation to join project",
			notificationTime: new Date(),
			notificationRead: false,
			ctaId: project.uid,
		};

		project.pendingInvite.push({
			user: user._id.toString(),
			dateAdded: new Date(),
			role: collaboratorRole.editor,
			active: true,
		});

		user.inbox.push(notification);
		await user.save();
		await project.save();

		pusher.trigger(`user-${userId}`, "notification", {
			notification,
			userId,
		});
		res.status(200).json({ message: "Invite sent", projectId });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Something went wrong" });
	}
};

export const revokeProjectInvite = async (req: any, res: any) => {
	const userId = req.user._id;
	const { projectId, inviteeId } = req.params;
	const pusher = initPusher();

	try {
		const user = await User.findOne({ uid: inviteeId });
		const invitedUser = await User.findOne({ uid: inviteeId });
		const project = await Project.findOne({
			$or: [
				{ owner: userId, uid: projectId },
				{
					collaborators: {
						$elemMatch: { user: userId, active: true, role: "admin" },
					},
					uid: projectId,
				},
			],
		});

		project.pendingInvite = project.pendingInvite.filter(
			(invite) => invitedUser._id.toString() !== invite.user.toString()
		);

		const notification = {
			notificationType: notificationType.projectRevoke,
			notificationBody: `Your invitation to join ${project.title} has been revoked`,
			notificationTitle: "Invitation revoked",
			notificationTime: new Date(),
			notificationRead: false,
			ctaId: project.uid,
		};

		user.inbox.push(notification);

		await user.save();
		await project.save();

		pusher.trigger(`user-${inviteeId}`, "notification", {
			notification,
			userId,
		});

		res
			.status(200)
			.json({ message: "Invitation revoked successfully.", projectId });
	} catch (error) {
		console.log(error);
		res.status(404).json({ message: error.message });
	}
};

export const openNotification = async (req: any, res: any) => {
	const userId = req.user._id;
	const { notificationId } = req.params;

	try {
		const user = await User.findOne({ _id: userId });

		user.inbox = user.inbox.map((notification) => {
			/**@ts-ignore */
			if (notification._id.toString() === notificationId) {
				notification.notificationRead = true;
			}
			return notification;
		});

		await user.save();

		res.status(200).json({ message: "Notification opened successfully." });
	} catch (error) {
		console.log(error);
		res.status(404).json({ message: error.message });
	}
};
