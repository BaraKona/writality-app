import { FC } from "react";
import { IProject } from "../../../interfaces/IProject";
import { UserCard } from "../../user/UserCard";
import { Divider, Skeleton, Text } from "@mantine/core";
import { Title } from "../../Title";
import { IconUsers } from "@tabler/icons-react";

export const ProjectCollaborators: FC<{ project: IProject }> = ({
	project,
}) => {
	console.log(project);

	if (!project) {
		return <Skeleton height={20} width={100} />;
	}

	return (
		<div className="border rounded-normal border-border dark:border-borderDark p-2 h-[calc(100vh-8rem)] overflow-y-auto">
			<div className="flex gap-2 items-center">
				<IconUsers size={25} />
				<h2 className="font-semiBold text-2xl">Collaborators</h2>
			</div>
			<p className="text-coolGrey-4">
				Manage collaborators and their permissions here{" "}
			</p>

			<Divider className="!border-coolGrey-1 dark:!border-borderDark my-2" />
			<div className="flex flex-col">
				<Section
					title="Collaborators"
					description="Invite collaborators to your project to work faster and collaborate easily together. Manage their permissions to better structure your project."
				/>
				<Divider className="!border-coolGrey-1 dark:!border-borderDark my-2" />
				<Section
					title="Guest Accounts"
					description="Invite guests to monitor and view the progress of your project. They will not be able to edit or modify your project."
				/>

				<Divider className="!border-coolGrey-1 dark:!border-borderDark my-2" />
				<Section
					title="Pending Invites"
					description="Manage your pending invites here. You can resend or cancel them entirely."
				/>
			</div>
		</div>
	);
};

const Section: FC<{ title: string; description: string }> = ({
	title,
	description,
}) => {
	return (
		<div className="w-full  flex gap-4 p-4 py-24">
			<div className="basis-96">
				<h3 className="text-coolGrey-7 dark:text-coolGrey-4 font-medium text-sm flex gap-2">
					{title}
				</h3>
				<Text className="text-coolGrey-4 dark:text-coolGrey-5 max-w-xs">
					{description}
				</Text>
			</div>
		</div>
	);
};
