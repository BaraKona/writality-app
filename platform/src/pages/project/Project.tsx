import { ProjectDescription } from "../../components/Project";
import {
	IconDotsVertical,
	IconGlobe,
	IconHome,
	IconMessage,
	IconNews,
	IconSettings,
} from "@tabler/icons-react";
import {
	NoChapters,
	Chapter,
	ChapterWrapper,
	ChapterRenderer,
} from "../../components/Chapters";
import { useAuthContext } from "../../contexts/AuthContext";
import { IChapter } from "../../interfaces/IChapter";
import { CharacterWrapper } from "../../components/Characters/CharacterWrapper";
import { Loading } from "../../components/Loading";
import { useQuery, useMutation, useQueryClient } from "react-query";
import {
	getProjectChapters,
	createChapter,
	deleteSingleChapter,
} from "../../api/project/chapters";
import { DeleteModal } from "../../components/Modals";
import { updateProjectDescription } from "../../api/project/projects";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Divider, Skeleton, Tabs, Tooltip } from "@mantine/core";
import { useEditor } from "@tiptap/react";
import { extensions } from "../../components/Editor/utils/editorExtensions";
import { ProjectSettings } from "../../components/Project/ProjectSettings";
import { useSingleProject } from "../../hooks/projects/useSingleProject";
import { ChatWrapper } from "../../components/Project/chatrooms/ChatWrapper";
import { tabStyles } from "../../styles/tabStyles";
import { tooltipStyles } from "../../styles/tooltipStyles";
import { useCreateChapter } from "../../hooks/projects/useCreateChapter";
import { FourOFour } from "../404";
import { PublishChapterSide } from "../../components/Project/publish/PublishChapterSide";
import { Block, BlockNoteEditor } from "@blocknote/core";
import { useBlockNote } from "@blocknote/react";
import { useEditorContext } from "../../contexts/EditorContext";
import { BannerImage } from "../../components/BannerImage";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { ProjectAnalytics } from "../../components/Project/ProjectAnalytics";
import { ProjectBoard } from "../../components/Project/ProjectBoard";
import { useProjectBoard } from "../../hooks/projects/useProjectBoard";
import { ProjectHistory } from "../../components/Project/ProjectHistory";
import { useCreateFolder } from "../../hooks/projects/useCreateFolder";
import { useProjectChapters } from "../../hooks/chapter/useProjectChapters";
import { useDeleteChapter } from "../../hooks/projects/useDeleteChapter";
import { ProjectChapters } from "../../components/Project/ProjectChapters";
import { DragAndDropWrapper } from "../../components/DragAndDrop/DragAndDropWrapper";
import { useMoveChapterToFolder } from "../../hooks/projects/useMoveChapterToFolder";
import { useOpenFolderChapters } from "../../hooks/projects/useOpenFolderChapters";
import { useLocalStorage } from "@mantine/hooks";
export function Project() {
	const queryClient = useQueryClient();
	const { currentUser } = useAuthContext();
	const { project, projectTab, chapter } = useParams();
	const [openModal, setOpenModal] = useState(false);
	const [chapterId, setChapterId] = useState("");
	const navigate = useNavigate();
	const [openedFolder, setOpenFolder] = useLocalStorage({
		key: "openFolder",
		defaultValue: localStorage.getItem("openFolder") || "",
	});

	const { data: currentProject } = useSingleProject(project as string);
	const { mutate: updateProjectBoard } = useProjectBoard(project as string);
	const { data: openedFolderChapters } = useOpenFolderChapters(
		project as string,
		openedFolder
	);
	const { data: chapters, isLoading } = useProjectChapters({
		projectId: project as string,
	});

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

	const openPublishChapter = (
		projectId: string,
		chapterId: string,
		chapter: IChapter
	) => {
		editor?.replaceBlocks(
			editor.topLevelBlocks,
			JSON.parse(chapter.content?.content || "[]")
		);
		navigate(`/project/${projectId}/publish/chapter/${chapterId}/`);
	};
	const editor = useBlockNote({});

	function openFolder(folderId: string) {
		console.log("folder", folderId);
	}

	if (currentProject === null) {
		return <FourOFour />;
	}

	return (
		<section className="relative">
			<DeleteModal
				opened={openModal}
				setOpened={setOpenModal}
				deleteBranch={deleteChapter}
				type="chapter"
			/>
			<ChapterWrapper
				project={currentProject}
				isLoading={Boolean(!currentProject)}
			>
				<Tabs
					className="w-full border-none important:border-none h-[calc(100vh-7.2rem)]"
					value={projectTab}
					onTabChange={(tab) => navigate(`/project/${project}/${tab}`)}
					defaultValue="home"
					radius={"md"}
					orientation="vertical"
					styles={tabStyles}
					keepMounted={false}
				>
					<Tabs.List className="sticky">
						<Tooltip
							label="Home"
							position="right"
							withArrow
							styles={tooltipStyles}
						>
							<Tabs.Tab value="home">
								<IconHome size={18} />
							</Tabs.Tab>
						</Tooltip>
						<Tooltip
							label="World"
							position="right"
							withArrow
							styles={tooltipStyles}
						>
							<Tabs.Tab value="world-info" disabled>
								<IconGlobe size={18} />
							</Tabs.Tab>
						</Tooltip>
						<Tooltip
							label="Publish"
							position="right"
							withArrow
							styles={tooltipStyles}
						>
							<Tabs.Tab value="publish">
								<IconNews size={18} />
							</Tabs.Tab>
						</Tooltip>
						{currentProject?.type === "collaboration" && (
							<>
								<Divider my="xs" color="grey.0" />
								<Tooltip
									label="Chat"
									position="right"
									withArrow
									styles={tooltipStyles}
								>
									<Tabs.Tab value="chat">
										<IconMessage size={18} />
									</Tabs.Tab>
								</Tooltip>
							</>
						)}
						<Divider my="xs" color="grey.0" />
						<Tooltip
							label="Settings"
							position="right"
							withArrow
							styles={tooltipStyles}
						>
							<Tabs.Tab value="settings">
								<IconSettings size={18} />
							</Tabs.Tab>
						</Tooltip>
					</Tabs.List>

					<Tabs.Panel value="home">
						<div className="flex flex-col gap-2 max-w-screen-xl mx-auto">
							<div className="grid grid-cols-9 gap-6 gap-y-2 grid-rows-4 h-[80vh]">
								<ProjectAnalytics />
								<ProjectDescription
									project={currentProject}
									updateDescription={updateDescription.mutate}
								/>
								<ChapterRenderer
									chapterCount={chapters?.length}
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
												items={chapters}
												handleDrop={moveChapterIntoFolder}
											>
												<ProjectChapters
													project={currentProject}
													openedFolder={openedFolder}
													chapters={chapters}
													openChapter={openChapter}
													openChapterModal={openChapterModal}
													openFolder={setOpenFolder}
													folderChapters={openedFolderChapters}
												/>
											</DragAndDropWrapper>
										)}
									</>
								</ChapterRenderer>
								<ProjectHistory project={currentProject} />
							</div>
							{/* <Divider color="grey.0" orientation="vertical" /> */}

							{/* <CharacterWrapper> - Protagonist </CharacterWrapper> */}
							<ProjectBoard
								project={currentProject}
								updateBoard={updateProjectBoard}
							/>
						</div>
					</Tabs.Panel>
					{/* <Tabs.Panel value="publish">
						<div className="flex flex-wrap gap-2">
							<PublishChapterSide
								chapter={chapters?.find((c: IChapter) => c.uid === chapter)}
								editor={editor}
							/>
							<ChapterRenderer
								chapterCount={chapters?.length}
								createNewChapter={createNewChapter}
								createNewFolder={createNewFolder}
								isLoading={isLoading}
							>
								{isLoading ? (
									<>
										{[...Array(10)].map((_, i) => (
											<Skeleton h={20} w="100%" m={3} />
										))}
									</>
								) : (
									<>
										{chapters?.length == 0 ? (
											<NoChapters
												createNewChapter={createNewChapter}
												title="Chapters"
												p1="You have no chapters currently. Chapters make up your project and can be collaborated on."
												p2="Chapters are also versioned so you can always go back to previews versions if you decide to scrap your current work."
											/>
										) : (
											<div ref={parent}>
												{chapters?.map((chapter: IChapter, index: number) => (
													<Chapter
														openChapter={() =>
															openPublishChapter(
																chapter.projectId,
																chapter.uid,
																chapter
															)
														}
														key={index}
														chapter={chapter}
														openChapterModal={() =>
															openChapterModal(chapter.uid)
														}
														disabled={false}
													/>
												))}{" "}
											</div>
										)}
									</>
								)}
							</ChapterRenderer>
						</div>
					</Tabs.Panel> */}
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
				</Tabs>
			</ChapterWrapper>
		</section>
	);
}
