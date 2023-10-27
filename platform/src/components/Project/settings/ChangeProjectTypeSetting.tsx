import { Divider, Select, Text } from "@mantine/core";
import { ProjectType } from "../../../interfaces/IProject";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { IconExclamationCircle } from "@tabler/icons-react";
export const ChangeProjectTypeSetting: FC<{
	setIsEdited: Dispatch<SetStateAction<boolean>>;
	currentProjectType: ProjectType;
	setProjectType: Dispatch<SetStateAction<ProjectType>>;
	projectType: ProjectType;
}> = ({ setIsEdited, currentProjectType, setProjectType, projectType }) => {
	const values = [
		{ value: ProjectType.standard, label: "Standard" },
		{ value: ProjectType.collaboration, label: "Collaboration" },
	];

	return (
		<div className="max-w-md">
			<div className="text-sm font-medium text-coolGrey-7">Project Type</div>
			<p className="text-xs font-light mb-2">
				Change the type of project you are working on.
			</p>
			<div className="items-center gap-2">
				<Select
					placeholder="Collaboration"
					defaultValue={currentProjectType}
					data={values}
					onChange={(value) => {
						value !== currentProjectType
							? setIsEdited(true)
							: setIsEdited(false);
						setProjectType(value as ProjectType);
					}}
					styles={{
						item: {
							borderRadius: "0.375rem",
							borderColor: "#e2e2e2",
							color: "#394251",
							fontSize: "0.75rem",
						},
						// item hover style

						input: {
							borderColor: "#e2e2e2",
							borderRadius: "0.375rem !important",
							border: "1px solid #e2e2e2 !important",
							color: "#394251",
							fontSize: "0.75rem !important",
						},
						label: {
							color: "#394251",
							fontSize: "0.75rem",
							fontWeight: 400,
						},
					}}
				/>
				<Text
					className="font-light mt-2 leading-normal"
					size="xs"
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
