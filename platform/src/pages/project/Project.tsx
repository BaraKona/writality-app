import { ProjectDescription } from "../../components/Project";
import {
	IconAdjustmentsHorizontal,
	IconDotsVertical,
	IconGlobe,
	IconHome,
	IconMessage,
	IconNews,
	IconSettings,
	IconUsers,
} from "@tabler/icons-react";
import { NoChapters, ChapterRenderer } from "../../components/Chapters";
import { useAuthContext } from "../../contexts/AuthContext";
import { CharacterWrapper } from "../../components/Characters/CharacterWrapper";
import { Loading } from "../../components/Loading";
import { useMutation, useQueryClient } from "react-query";
import { DeleteModal } from "../../components/Modals";
import { updateProjectDescription } from "../../api/project/projects";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Divider, Skeleton, Tabs, Tooltip } from "@mantine/core";
import { ProjectSettings } from "../../components/Project/ProjectSettings";
import { useSingleProject } from "../../hooks/projects/useSingleProject";
import { ChatWrapper } from "../../components/Project/chatrooms/ChatWrapper";
import { tabStyles } from "../../styles/tabStyles";
import { tooltipStyles } from "../../styles/tooltipStyles";
import { useCreateChapter } from "../../hooks/projects/useCreateChapter";
import { FourOFour } from "../404";
import { ProjectAnalytics } from "../../components/Project/ProjectAnalytics";
import { useProjectBoard } from "../../hooks/projects/useProjectBoard";
import { ProjectHistory } from "../../components/Project/ProjectHistory";
import { useCreateFolder } from "../../hooks/projects/useCreateFolder";
import { useDeleteChapter } from "../../hooks/projects/useDeleteChapter";
import { ProjectChapters } from "../../components/Project/ProjectChapters";
import { DragAndDropWrapper } from "../../components/DragAndDrop/DragAndDropWrapper";
import { useMoveChapterToFolder } from "../../hooks/projects/useMoveChapterToFolder";
import { IProject } from "../../interfaces/IProject";
import { ProjectCollaborators } from "../../components/Project/collaborators/ProjectCollaborators";
import { Title } from "../../components/Title";
import { ProjectBoard } from "../../components/Project/ProjectBoard";
import { ProjectWrapper } from "../../components/Chapters/ProjectWrapper";
import { useSocket } from "../../Providers/SocketProvider";

export function Project() {
	const queryClient = useQueryClient();
	const { currentUser } = useAuthContext();
	const { project, projectTab, chapter } = useParams();
	const [openModal, setOpenModal] = useState(false);
	const [chapterId, setChapterId] = useState("");
	const navigate = useNavigate();

	const { pusher } = useSocket();

	const { data: currentProject, isLoading } = useSingleProject(
		project as string
	);
	const { mutate: updateProjectBoard } = useProjectBoard(project as string);

	const { mutateAsync: deleteChapter } = useDeleteChapter(
		project as string,
		chapterId,
		() => setOpenModal(false)
	);

	const updateDescription = useMutation(
		(description: string) =>
			updateProjectDescription(currentUser.uid, project as string, description),
		{
			onSuccess: () => {
				queryClient.invalidateQueries(["project", project]);
				queryClient.invalidateQueries("projects");
			},
		}
	);
	const openChapterModal = (chapterId: string) => {
		setChapterId(chapterId);
		setOpenModal(true);
	};

	const { mutate: createNewChapter } = useCreateChapter(project as string);
	const { mutate: createNewFolder } = useCreateFolder(project as string);
	const { mutate: moveChapterIntoFolder } = useMoveChapterToFolder(
		project as string
	);
	const openChapter = (projectId: string, chapterId: string) => {
		navigate(`/project/${projectId}/chapter/${chapterId}`);
	};

	if (currentProject === null) {
		return <FourOFour />;
	}

	const chapterCount =
		currentProject?.chapters.length +
		currentProject?.folders.reduce(
			(acc: number, folder: IProject["folders"]) => {
				/** @ts-ignore */
				return acc + folder.chapters?.length;
			},
			0
		);

	useEffect(() => {
		if (!pusher || !currentProject) return;

		pusher.subscribe(`project-${currentProject.uid}`);
		pusher.bind("update", () => {
			queryClient.invalidateQueries(["project", project]);
		});

		return () => {
			if (pusher) {
				pusher.unsubscribe(`project-${currentProject?.uid}`);
				pusher.unbind("update");
			}
		};
	}, [currentProject]);

	return (
		<section className="relative flex gap-2 w-full">
			<DeleteModal
				opened={openModal}
				setOpened={setOpenModal}
				deleteBranch={deleteChapter}
				type="chapter"
			/>
			<ProjectWrapper
				project={currentProject}
				isLoading={Boolean(!currentProject)}
				className="w-full transition-all ease-in-out duration-200"
				tab={projectTab || "overview"}
			>
				<Tabs
					className="border-none important:border-none h-[calc(100vh-12.2rem)] w-full px-2"
					value={projectTab}
					onTabChange={(tab) => navigate(`/project/${project}/${tab}`)}
					defaultValue="overview"
					radius={"md"}
					styles={tabStyles}
					keepMounted={false}
				>
					<Tabs.List className="sticky">
						<div className="mr-auto cursor-pointer dark:text-coolGrey-4">
							<h2 className="text-3xl font-semibold my-3 mb-5">
								{currentProject?.title}
							</h2>
						</div>
						<Tooltip
							label="Home"
							position="top"
							withArrow
							styles={tooltipStyles}
						>
							<Tabs.Tab value="overview">Overview</Tabs.Tab>
						</Tooltip>
						<Tooltip
							label="Board"
							position="top"
							withArrow
							styles={tooltipStyles}
						>
							<Tabs.Tab value="board">Board</Tabs.Tab>
						</Tooltip>
						<Tooltip
							label="World"
							position="top"
							withArrow
							styles={tooltipStyles}
						>
							<Tabs.Tab value="world-info" disabled>
								<IconGlobe size={18} />
							</Tabs.Tab>
						</Tooltip>
						<Tooltip
							label="Publish"
							position="top"
							withArrow
							styles={tooltipStyles}
						>
							<Tabs.Tab value="publish" disabled>
								<IconNews size={18} />
							</Tabs.Tab>
						</Tooltip>
						{currentProject?.type === "collaboration" && (
							<>
								<Tooltip
									label="Chat"
									position="top"
									withArrow
									styles={tooltipStyles}
								>
									<Tabs.Tab value="chat">
										<IconMessage size={18} />
									</Tabs.Tab>
								</Tooltip>
								<Tooltip
									label="Collaborators"
									position="top"
									withArrow
									styles={tooltipStyles}
								>
									<Tabs.Tab value="collaborators">
										<IconUsers size={18} />
									</Tabs.Tab>
								</Tooltip>
							</>
						)}
						<Tooltip
							label="Settings"
							position="top"
							withArrow
							styles={tooltipStyles}
						>
							<Tabs.Tab value="settings">
								<IconAdjustmentsHorizontal size={18} />
							</Tabs.Tab>
						</Tooltip>
					</Tabs.List>

					<Tabs.Panel value="overview">
						<div className="flex gap-2 mx-auto">
							<div className="grid grid-cols-9 gap-6 gap-y-2 grid-rows-6 h-[80vh]">
								<ProjectAnalytics />
								<ChapterRenderer
									chapterCount={chapterCount}
									createNewChapter={createNewChapter}
									createNewFolder={createNewFolder}
									isLoading={isLoading}
								>
									<>
										{currentProject?.folders.length === 0 &&
										currentProject.chapters.length === 0 ? (
											<NoChapters
												createNewChapter={createNewChapter}
												title="Chapters"
												p1="You have no chapters currently. Chapters make up your project and
											can be collaborated on."
												p2="Chapters are also versioned so you can always go back to previews
											versions if you decide to scrap your current work."
											/>
										) : (
											<DragAndDropWrapper
												items={currentProject?.chapters}
												handleDrop={moveChapterIntoFolder}
											>
												<ProjectChapters
													project={currentProject}
													chapters={currentProject?.chapters}
													openChapter={openChapter}
													openChapterModal={openChapterModal}
													// folderChapters={openedFolderChapters}
												/>
											</DragAndDropWrapper>
										)}
									</>
								</ChapterRenderer>
								<ProjectHistory project={currentProject} />
							</div>

							<div className="max-w-2xl">
								<ProjectDescription
									project={currentProject}
									updateDescription={updateDescription.mutate}
								/>
							</div>

							{/* {currentProject?.type === "collaboration" ? (
								<ProjectBoard
									project={currentProject}
									updateBoard={updateProjectBoard}
								/>
							) : null} */}
						</div>
					</Tabs.Panel>

					<Tabs.Panel value="world-info">
						<CharacterWrapper> - Protagonist </CharacterWrapper>
					</Tabs.Panel>

					<Tabs.Panel value="settings">
						{currentProject ? (
							<ProjectSettings project={currentProject} />
						) : (
							<Loading isLoading={true} />
						)}
					</Tabs.Panel>
					<Tabs.Panel value="chat">
						<ChatWrapper />
					</Tabs.Panel>
					<Tabs.Panel value="collaborators">
						{currentProject ? (
							<ProjectCollaborators project={currentProject} />
						) : (
							<Loading isLoading={true} />
						)}
					</Tabs.Panel>
					<Tabs.Panel value="board">
						<ProjectBoard
							project={currentProject}
							updateBoard={updateProjectBoard}
						/>
					</Tabs.Panel>
				</Tabs>
			</ProjectWrapper>
		</section>
	);
}
