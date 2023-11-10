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
			user: inviteeId,
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
