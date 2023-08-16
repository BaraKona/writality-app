import { Divider, TextInput } from "@mantine/core";
import { inputStyles } from "../../../styles/inputStyles";
import { IProject } from "../../../interfaces/IProject";
import { Dispatch, SetStateAction } from "react";

export const ProjectNameSettings: React.FC<{
	project: IProject;
	isLoading: boolean;
	setProjectTitle: (title: string) => void;
	updateProjectName: () => void;
}> = ({ project, isLoading, updateProjectName, setProjectTitle }) => {
	return (
		<div className="max-w-md">
			<div className="text-sm font-medium text-coolGrey-7">Project Name</div>
			<p className="text-xs font-light mb-2">
				Change the name of project your project.
			</p>
			<TextInput
				styles={{ ...inputStyles }}
				placeholder="Project name"
				defaultValue={project?.title}
				onChange={(e) => setProjectTitle(e.currentTarget.value)}
				onBlur={(e) => {
					if (project?.title !== e.target.value) {
						updateProjectName();
					}
				}}
				disabled={isLoading}
			/>
			<Divider my="xs" color="grey.0" />
		</div>
	);
};
