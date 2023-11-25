import { Divider, Select, Text } from "@mantine/core";
import { ProjectType } from "../../../interfaces/IProject";
import { Dispatch, FC, SetStateAction } from "react";
import { IconExclamationCircle } from "@tabler/icons-react";
import { inputStyles } from "../../../styles/inputStyles";
import { useThemeContext } from "../../../Providers/ThemeProvider";
export const ChangeProjectTypeSetting: FC<{
	setIsEdited: Dispatch<SetStateAction<boolean>>;
	currentProjectType: ProjectType;
	setProjectType: Dispatch<SetStateAction<ProjectType>>;
	projectType: ProjectType;
}> = ({ setIsEdited, currentProjectType, setProjectType, projectType }) => {
	const { theme } = useThemeContext();
	const values = [
		{ value: ProjectType.standard, label: "Standard" },
		{ value: ProjectType.collaboration, label: "Collaboration" },
	];

	return (
		<div className="max-w-md text-coolGrey-7 dark:text-coolGrey-4">
			<div className="text-sm font-medium ">Project Type</div>
			<p className="text-xs font-light mb-2">
				Change the type of project you are working on.
			</p>
			<div className="items-center gap-2">
				<Select
					placeholder="Collaboration"
					defaultValue={currentProjectType}
					data={values}
					className="!text-coolGrey-7 dark:!text-coolGrey-4"
					onChange={(value) => {
						value !== currentProjectType
							? setIsEdited(true)
							: setIsEdited(false);
						setProjectType(value as ProjectType);
					}}
					styles={{
						// ...inputStyles(),
						item: {
							borderRadius: "0.375rem",
							borderColor: theme === "dark" ? "#394251" : "#e2e2e2",
							color: theme === "dark" ? "#e2e2e2" : "#394251",
							fontSize: "0.75rem",
						},
						input: {
							borderColor: "#e2e2e2",
							borderRadius: "0.375rem !important",
							border: "1px solid #e2e2e2 !important",
							color: theme === "dark" ? "#e2e2e2" : "#394251",
							fontSize: "0.75rem !important",
						},
						label: {
							color: theme === "dark" ? "#e2e2e2" : "#394251",
							fontSize: "0.75rem",
							fontWeight: 400,
						},
						dropdown: {
							backgroundColor: theme === "dark" ? "#191a23" : "#fff",
							border: theme === "dark" ? "1px solid #35384a" : "none",
							borderRadius: "10px",
						},
					}}
				/>
				<Text
					className="font-light mt-2 leading-normal"
					size="sm"
					color="dimmed"
				>
					{projectType === ProjectType.standard
						? "Standard projects are for individual use. You can invite collaborators to your project, but you will be the only one who can edit the project."
						: "Collaboration projects are for teams. You can invite collaborators to your project, and they will be able to edit the project. You cannot edit the main chapters of the project and will only be able to edit them through merging branches."}
				</Text>
				<Text className="font-light mt-2 text-red-200" size="xs" color="dimmed">
					{projectType !== ProjectType.standard && (
						<div className="flex gap-1 items-center">
							<IconExclamationCircle
								size={16}
								color="red"
								className="basis-16"
							/>
							Collaborative projects do not allow you to edit the main directly.
							You can only edit the main through merging branches.
						</div>
					)}
				</Text>
			</div>
			<Divider my="xs" className="!border-coolGrey-1 dark:!border-borderDark" />
		</div>
	);
};
