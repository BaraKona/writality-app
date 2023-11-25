import { Divider, TextInput } from "@mantine/core";
import { inputStyles } from "../../../styles/inputStyles";
import { IProject } from "../../../interfaces/IProject";

export const ProjectNameSettings: React.FC<{
	project: IProject;
	isLoading: boolean;
	setProjectTitle: (title: string) => void;
	updateProjectName: () => void;
}> = ({ project, isLoading, updateProjectName, setProjectTitle }) => {
	return (
		<div className="max-w-md text-coolGrey-7 dark:text-coolGrey-4">
			<div className="text-sm font-medium ">Project Name</div>
			<p className="text-xs font-light mb-2">
				Change the name of project your project.
			</p>
			<TextInput
				styles={{ ...inputStyles() }}
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
			<Divider my="xs" className="!border-coolGrey-1 dark:!border-borderDark" />
		</div>
	);
};
