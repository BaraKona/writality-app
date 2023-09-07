import {
	IconBookmarkPlus,
	IconCubePlus,
	IconFolder,
	IconFolderFilled,
	IconSquarePlus,
} from "@tabler/icons-react";
import { IProject } from "../../interfaces/IProject";
import { Divider, Skeleton, Text } from "@mantine/core";
import { ProjectListItem } from "./ProjectListItem";
import { FC } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { SmallText } from "../texts/SmallText";
import { useParams } from "react-router-dom";
import { FolderListItem } from "./FolderListItem";
import { useOpenFolderChapters } from "../../hooks/projects/useOpenFolderChapters";
import { useLocalStorage } from "@mantine/hooks";

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
	const [parent, enableAnimations] = useAutoAnimate(/* optional config */);
	const { project: currentProject } = useParams();
	const [openFolder, setOpenFolder] = useLocalStorage({
		key: "sidebarFolderOpen",
		defaultValue: localStorage.getItem("sidebarFolderOpen") || "",
	});

	const { data: folderChapters } = useOpenFolderChapters(
		currentProject as string,
		openFolder
	);

	if (isLoading) {
		return (
			<>
				<Skeleton height={27} width={160} radius="md" mb={3} />
				<Skeleton height={27} width={160} radius="md" mb={3} />
				<Skeleton height={27} width={160} radius="md" mb={3} />
			</>
		);
	}

	return (
		<>
			{projects?.standard.length > 0 && (
				<section className="overflow-y-auto my-2" ref={parent}>
					<Divider
						color="grey.0"
						my={4}
						label={<Text className="!text-blueTextLight">Projects</Text>}
						labelPosition="center"
					/>
					{projects.standard?.map((project: IProject, index: number) => {
						return (
							<div
								ref={parent}
								className={`${
									currentProject === project.uid && project.folders.length !== 0
										? ""
										: "mb-1"
								}`}
							>
								<ProjectListItem
									key={project.uid}
									onClick={() => openProject(`project/${project.uid}/home`)}
									name={project.title || "Untitled Project"}
									description={project.description}
									projectId={project.uid}
									type={project.type}
									removeFavourite={() => removeFavouriteProject(project.uid)}
								/>
								{currentProject === project.uid &&
									project.folders.length !== 0 && (
										<div className="ml-4 pl-2 py-2 border-l border-border">
											{project.folders?.map((folder) => {
												return (
													<FolderListItem
														folder={folder}
														folderChapters={folderChapters}
														small
														openFolder={setOpenFolder}
														openedFolder={openFolder}
													/>
												);
											})}
										</div>
									)}
							</div>
						);
					})}
				</section>
			)}

			{projects?.collaboration.length > 0 && (
				<section className="overflow-y-auto my-2">
					<Divider
						color="grey.0"
						my={4}
						label={<Text className="!text-blueTextLight">Collaborations</Text>}
						labelPosition="center"
					/>
					{projects.collaboration?.map((project: IProject, index: number) => {
						return (
							<div
								ref={parent}
								className={`${
									currentProject === project.uid && project.folders.length !== 0
										? ""
										: "mb-1"
								}`}
							>
								<ProjectListItem
									key={project.uid}
									onClick={() => openProject(`project/${project.uid}/home`)}
									name={project.title || "Untitled Project"}
									description={project.description}
									projectId={project.uid}
									type={project.type}
									removeFavourite={() => removeFavouriteProject(project.uid)}
								/>
								{currentProject === project.uid &&
									project.folders.length !== 0 && (
										<div className="ml-4 pl-2 py-2 border-l border-border">
											{project.folders?.map((folder) => {
												return (
													<div className=" px-1 py-0.5 hover:bg-coolGrey-1 rounded-normal">
														<SmallText className="flex items-center gap-2">
															<IconFolderFilled size={16} />
															{folder.name}
														</SmallText>
													</div>
												);
											})}
										</div>
									)}
							</div>
						);
					})}
				</section>
			)}

			{projects?.standard?.length === 0 &&
				projects?.collaboration?.length === 0 && (
					<div className="text-blueTextLight text-center text-xs font-normal ">
						You have no projects. Create your first project.
						<IconCubePlus
							size={16}
							className="mx-auto cursor-pointer mt-2 "
							onClick={createProject}
						/>
					</div>
				)}
		</>
	);
};
