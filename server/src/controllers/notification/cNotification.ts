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
			active: true,
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
			active: true,
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

export const acceptProjectInvitation = async (req: any, res: any) => {
	const userId = req.user._id;
	const { notificationId, projectId } = req.params;
	const pusher = initPusher();

	try {
		const user = await User.findOne({ _id: userId });

		const projectId = user.inbox.find(
			/**@ts-ignore */
			(notification) => notification._id.toString() === notificationId
		).ctaId;

		const project = await Project.findOne({ uid: projectId });
		const owner = await User.findOne({ _id: project.owner });

		if (!project || !owner) {
			return res.status(404).json({ message: "Project or User not found" });
		}

		if (
			project.collaborators.some((collaborator) => collaborator.user === userId)
		) {
			return res
				.status(400)
				.json({ message: "You are already a collaborator on this project." });
		}

		if (
			project.pendingInvite.every(
				(invite) => invite.user.toString() !== userId.toString()
			)
		) {
			return res
				.status(400)
				.json({
					message: "You no longer have permission to join this project",
				});
		}

		project.collaborators.push({
			user: userId.toString(),
			dateAdded: new Date(),
			role: collaboratorRole.editor,
			active: true,
			lastContribution: null,
		});

		project.pendingInvite = project.pendingInvite.filter(
			(invite) => invite.user.toString() !== userId.toString()
		);

		const notification = {
			notificationType: notificationType.projectAccept,
			notificationBody: `You have accepted an invitation to join ${project.title}. You can find it in your list of collaborations.`,
			notificationTitle: "You have joined a project",
			notificationTime: new Date(),
			notificationRead: false,
			active: true,
			ctaId: project.uid,
		};

		const notificationForOwner = {
			notificationType: notificationType.projectAccept,
			notificationBody: `${user.name} has accepted your invitation to join ${project.title}.`,
			notificationTitle: "User has joined your project",
			notificationTime: new Date(),
			notificationRead: false,
			active: true,
			ctaId: project.uid,
		};

		owner.inbox.push(notificationForOwner);
		user.inbox.push(notification);

		user.inbox.find(
			(notification) => notification._id.toString() === notificationId
		).active = false;

		await user.save();
		await owner.save();
		await project.save();

		pusher.trigger(`project-${projectId}`, "update", {
			notificationId,
			userId,
		});

		pusher.trigger(`user-${userId}`, "notification", {
			notification,
			userId,
		});

		res.status(200).json({ message: "Project joined successfully." });
	} catch (error) {
		console.log(error);
		res.status(404).json({ message: error.message });
	}
};
