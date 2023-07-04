import { DeleteProjectSetting } from "./settings/DeleteProjectSetting";
import { ChangeProjectTypeSetting } from "./settings/ChangeProjectTypeSetting";
import { SaveButton } from "../buttons/SaveButton";
import { FC, useState } from "react";
import { IProject, ProjectType } from "../../interfaces/IProject";
import { useProjectType } from "../../hooks/projects/useProjectType";
import { useAuthContext } from "../../contexts/AuthContext";
export const ProjectSettings: FC<{ project: IProject }> = ({ project }) => {
	const [isEdited, setIsEdited] = useState(false);
	const [projectType, setProjectType] = useState<ProjectType>(project.type);

	const { currentUser } = useAuthContext();
	const { mutate } = useProjectType(currentUser.uid, project.uid, projectType);

	return (
		<div className="px-4 py-2">
			<div className="flex">
				<div className="mr-auto">
					<div className="text-md font-semibold text-blueText">
						Project Settings
					</div>
					<div className="text-blueText text-xs font-light ">
						Setup your project settings here.
					</div>
				</div>
				<SaveButton isDisabled={!isEdited} onClick={mutate} />
			</div>
			<hr className="my-4" />
			<div className="flex flex-wrap flex-col ">
				<ChangeProjectTypeSetting
					setIsEdited={setIsEdited}
					currentProjectType={project.type}
					setProjectType={setProjectType}
					projectType={projectType}
				/>
				<DeleteProjectSetting />
			</div>
		</div>
	);
};
