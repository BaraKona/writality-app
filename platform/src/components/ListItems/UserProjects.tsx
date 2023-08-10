import { IconHeartPlus, IconSquarePlus } from "@tabler/icons-react";
import { IProject } from "../../interfaces/IProject";
import { Divider, Skeleton } from "@mantine/core";
import { ProjectListItem } from "./ProjectListItem";
import { FC } from "react";

export const UserProjects: FC<{
	isLoading: boolean;
	projects: IProject[];
	openProject: (project: string) => void;
	removeFavouriteProject: (project: string) => void;
	createProject: () => void;
}> = ({
	isLoading,
	projects,
	openProject,
	removeFavouriteProject,
	createProject,
}) => {
	return (
		<>
			{" "}
			{isLoading ? (
				<>
					<Skeleton height={27} width={160} radius="md" mb={3} />
					<Skeleton height={27} width={160} radius="md" mb={3} />
					<Skeleton height={27} width={160} radius="md" mb={3} />
				</>
			) : (
				<>
					<div>
						<div className="text-blueTextLight text-xs font-normal">
							Your projects
						</div>
					</div>
					<Divider color="grey.0" my={4} />
					{projects?.map((project: IProject, index: number) => {
						return (
							<ProjectListItem
								key={index}
								onClick={() => openProject(`project/${project.uid}/home`)}
								name={project.title || "Untitled Project"}
								projectId={project.uid}
								type={project.type}
								removeFavourite={() => removeFavouriteProject(project.uid)}
							/>
						);
					})}
					{projects?.length !== 0 && (
						<IconSquarePlus
							size={16}
							className="mx-auto cursor-pointer mt-2 text-blueTextLight"
							onClick={createProject}
						/>
					)}
					{/* <Divider color="grey.0" my={4} /> */}
				</>
			)}
			{!isLoading && projects?.length === 0 && (
				<div className="text-blueTextLight text-center text-xs font-normal">
					You have no projects. Create your first project.
					<IconSquarePlus
						size={16}
						className="mx-auto cursor-pointer mt-2 "
						onClick={createProject}
					/>
				</div>
			)}
		</>
	);
};
