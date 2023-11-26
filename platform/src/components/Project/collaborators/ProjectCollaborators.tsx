import { FC, ReactNode, useState } from "react";
import { IProject } from "../../../interfaces/IProject";
import { Skeleton } from "@mantine/core";
import { IconUsers } from "@tabler/icons-react";
import { ProjectCollaboratorTable } from "./ProjectCollaboratorTable";
import { InviteUserModal } from "../../Modals";
import { usePublicUsers } from "../../../hooks/user/usePublicUsers";
import { useSendProjectInvites } from "../../../hooks/notification/useSendProjectInvites";
import { ProjectInviteTable } from "./ProjectInviteTable";
import { useRevokeProjectInvitation } from "../../../hooks/notification/useRevokeProjectInvitation";

export const ProjectCollaborators: FC<{ project: IProject }> = ({
	project,
}) => {
	const [openCollaborator, setOpenCollaborator] = useState(false);
	const { data: users } = usePublicUsers();
	const { mutate: sendInvite } = useSendProjectInvites();
	const { mutate: revokeInvite } = useRevokeProjectInvitation();

	if (!project) {
		return <Skeleton height={20} width={100} />;
	}

	return (
		<div className="rounded-lg p-4 h-[calc(100dvh-8rem)] bg-coolGrey-0 dark:bg-baseDarker">
			<InviteUserModal
				opened={openCollaborator}
				setOpened={setOpenCollaborator}
				users={users}
				addProjectCollaborator={sendInvite}
				projectId={project.uid}
			/>
			<div className="flex gap-2 items-center dark:text-coolGrey-4">
				<IconUsers size={25} />
				<h2 className="font-semiBold text-2xl">Collaborators</h2>
			</div>
			<p className="text-coolGrey-5 text-sm pb-4">
				Manage collaborators and their permissions here
			</p>

			<div className="flex flex-col h-[calc(100dvh-14rem)] overflow-y-auto gap-4 px-4">
				<Section
					title="Collaborators"
					description="Invite collaborators to your project to work faster and collaborate easily together. Manage their permissions to better structure your project."
					button={
						<CollaboratorButton
							text="Invite Collaborator"
							onClick={() => setOpenCollaborator(true)}
						/>
					}
				>
					<ProjectCollaboratorTable
						collaborators={project.collaborators}
						emptyText="You have no collaborators. Invite collaborators to your project to monitor and view the progress of your project. They will not be able to edit or modify your project."
					/>
				</Section>

				<Section
					title="Guest Accounts"
					description="Invite guests to monitor and view the progress of your project. They will not be able to edit or modify your project."
					button={
						<CollaboratorButton
							text="Invite Guest"
							onClick={() => {
								console.log("invite guest");
							}}
						/>
					}
				>
					<ProjectCollaboratorTable
						collaborators={[] as IProject["collaborators"]}
						emptyText="You have no guests. Invite guests to your project to monitor and view the progress of your project. They will not be able to edit or modify your project."
					/>
				</Section>

				<Section
					title="Pending Invites"
					description="Manage your pending invites here. You can resend or cancel them entirely."
				>
					<ProjectInviteTable
						collaborators={project.pendingInvite}
						emptyText="You have no pending invites"
						revokeInvite={revokeInvite}
						projectId={project.uid}
					/>
				</Section>
			</div>
		</div>
	);
};

const Section: FC<{
	title: string;
	description: string;
	children?: ReactNode;
	button?: ReactNode;
}> = ({ title, description, children, button }) => {
	return (
		<div className="w-full  flex gap-4 p-4 py-10 justify-between  dark:bg-baseDarker rounded-lg bg-base">
			<div className="basis-96 ">
				<h3 className="text-coolGrey-7 dark:text-coolGrey-4 font-medium text-sm flex gap-2 mb-5">
					{title}
				</h3>
				<p className="text-coolGrey-5 dark:text-coolGrey-4 max-w-xs text-sm">
					{description}
				</p>
				<div className="mt-5">{button}</div>
			</div>
			{children}
		</div>
	);
};

const CollaboratorButton: FC<{
	text: string;
	onClick: () => void;
}> = ({ text, onClick }) => {
	return (
		<button
			className="px-4 py-2 rounded-lg bg-lime-500 dark:bg-lime-700 dark:text-coolGrey-8 font-semibold hover:bg-lime-500/80 dark:hover:bg-lime-400/70 text-xs"
			onClick={onClick}
		>
			{text}
		</button>
	);
};
