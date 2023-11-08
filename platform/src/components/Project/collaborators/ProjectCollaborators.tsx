import { FC } from "react";
import { IProject } from "../../../interfaces/IProject";
import { UserCard } from "../../user/UserCard";
import { Skeleton } from "@mantine/core";

export const ProjectCollaborators: FC<{ project: IProject }> = ({
	project,
}) => {
	console.log(project);

	if (!project) {
		return <Skeleton height={20} width={100} />;
	}

	return (
		<div>
			hihih!!
			{project.collaborators?.map((collaborator) => (
				<UserCard user={collaborator.uid} />
			))}
		</div>
	);
};
