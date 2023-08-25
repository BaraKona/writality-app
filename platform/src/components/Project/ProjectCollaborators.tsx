import { FC } from "react";
import { IProject } from "../../interfaces/IProject";

export const ProjectCollaborators: FC<{ project: IProject }> = ({
	project,
}) => {
	return (
		<>
			{project.collaborators?.map((collaborator) => {
				return (
					<div className="flex items-center gap-2">
						<span className="text-coolGrey-7 text-sm font-medium"></span>
					</div>
				);
			})}
		</>
	);
};
