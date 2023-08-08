import { IconHeartPlus } from "@tabler/icons-react";
import { IProject } from "../../interfaces/IProject";
import { Divider, Skeleton } from "@mantine/core";
import { ProjectListItem } from "./ProjectListItem";
import { FC } from "react";

export const FavouriteProjectItems: FC<{
	isLoading: boolean;
	projects: IProject[];
	openProject: (project: string) => void;
	removeFavouriteProject: (project: string) => void;
}> = ({ isLoading, projects, openProject, removeFavouriteProject }) => {
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
						<div className="text-blueText text-xs font-normal">
							Favourite Projects
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
					<Divider color="grey.0" my={4} />
				</>
			)}
			{!isLoading && projects?.length === 0 && (
				<div className="text-blueText text-center text-xs font-normal">
					You have no favourites. Click on the heart icon to add a favourite.
					<IconHeartPlus size={16} className="mx-auto" />
				</div>
			)}
		</>
	);
};
