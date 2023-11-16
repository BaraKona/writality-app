import { DeleteProjectSetting } from "./settings/DeleteProjectSetting";
import { ChangeProjectTypeSetting } from "./settings/ChangeProjectTypeSetting";
import { SaveButton } from "../buttons/SaveButton";
import { FC, useState } from "react";
import { IProject, ProjectType } from "../../interfaces/IProject";
import { useProjectType } from "../../hooks/projects/useProjectType";
import { useAuthContext } from "../../contexts/AuthContext";
import { useProjectTitleChange } from "../../hooks/projects/useProjectTitleChange";
import { ProjectNameSettings } from "./settings/ProjectNameSettings";
import { Divider, Skeleton } from "@mantine/core";

export const ProjectSettings: FC<{ project: IProject }> = ({ project }) => {
	const [isEdited, setIsEdited] = useState(false);
	const [projectType, setProjectType] = useState<ProjectType>(project.type);
	const [projectTitle, setProjectTitle] = useState(project.title);
	const { currentUser } = useAuthContext();
	const { mutate } = useProjectType(project.uid, projectType);
	const { mutate: changeProjectTitle } = useProjectTitleChange(
		project.uid,
		projectTitle
	);

	return (
		<div className="px-4 py-2 bg-base dark:bg-baseDark border border-border dark:border-borderDark rounded-lg h-[calc(100dvh-7rem)]">
			<div className="flex">
				<div className="mr-auto">
					<div className="text-md font-semibold text-coolGrey-7">
						Project Settings
					</div>
					<div className="text-coolGrey-7 text-xs font-light ">
						Setup your project settings here.
					</div>
				</div>
				<SaveButton isDisabled={!isEdited} onClick={mutate} />
			</div>
			<Divider my="xs" className="!border-coolGrey-1 dark:!border-borderDark" />
			<div className="flex flex-wrap flex-col gap-2 ">
				{!project ? (
					<Skeleton height={20} width={100} />
				) : (
					<>
						<ProjectNameSettings
							project={project}
							isLoading={false}
							updateProjectName={changeProjectTitle}
							setProjectTitle={setProjectTitle}
						/>
						<ChangeProjectTypeSetting
							setIsEdited={setIsEdited}
							currentProjectType={project.type}
							setProjectType={setProjectType}
							projectType={projectType}
						/>
						<DeleteProjectSetting />
					</>
				)}
			</div>
		</div>
	);
};
