import { IconCubePlus } from "@tabler/icons-react";
import { IProject } from "../../interfaces/IProject";
import { Divider, Skeleton, Text } from "@mantine/core";
import { ProjectListItem } from "./ProjectListItem";
import { FC } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export const UserProjects: FC<{
	isLoading: boolean;
	projects: {
		standard: IProject[];
		collaboration: IProject[];
	};
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
	const [parent] = useAutoAnimate();

	if (isLoading) {
		return (
			<>
				<Skeleton height={10} width="100%" radius="sm" mb={10} mt={20} />
				<Skeleton height={20} width="100%" radius="sm" mb={3} />
				<Skeleton height={20} width="100%" radius="sm" mb={3} />
				<Skeleton height={20} width="100%" radius="sm" mb={3} />
				<Skeleton height={20} width="100%" radius="sm" mb={3} />
				<Skeleton height={10} width="100%" radius="sm" mb={10} mt={15} />
				<Skeleton height={20} width="100%" radius="sm" mb={3} />
				<Skeleton height={20} width="100%" radius="sm" mb={3} />
				<Skeleton height={20} width="100%" radius="sm" mb={3} />
			</>
		);
	}

	return (
		<div className="overflow-y-auto h-[calc(100vh-100px)]">
			{projects?.standard.length > 0 && (
				<section className=" my-2" ref={parent}>
					<Divider
						color="grey.0"
						my={4}
						label={<Text className="!text-blueTextLight">Projects</Text>}
						labelPosition="center"
					/>
					<div className=" ">
						{projects.standard?.map((project: IProject, index: number) => {
							return (
								<ProjectListItem
									key={project.uid}
									onClick={() => openProject(`project/${project.uid}/home`)}
									name={project.title || "Untitled Project"}
									projectId={project.uid}
									projectFolders={project.folders}
									type={project.type}
									chapters={project.chapters}
								/>
							);
						})}
					</div>
				</section>
			)}

			{projects?.collaboration.length > 0 && (
				<section className=" my-2" ref={parent}>
					<Divider
						color="grey.0"
						my={4}
						label={<Text className="!text-blueTextLight">Collaborations</Text>}
						labelPosition="center"
					/>
					<div className="max-h-96 ">
						{projects.collaboration?.map((project: IProject, index: number) => {
							return (
								<ProjectListItem
									key={project.uid}
									chapters={project.chapters}
									onClick={() => openProject(`project/${project.uid}/home`)}
									name={project.title || "Untitled Project"}
									projectId={project.uid}
									projectFolders={project.folders}
									type={project.type}
								/>
							);
						})}
					</div>
				</section>
			)}

			{!projects ||
				(projects?.standard?.length === 0 &&
					projects?.collaboration?.length === 0 && (
						<div className="text-blueTextLight text-center text-xs font-normal ">
							You have no projects. Create your first project.
							<IconCubePlus
								size={16}
								className="mx-auto cursor-pointer mt-2 "
								onClick={createProject}
							/>
						</div>
					))}
		</div>
	);
};
