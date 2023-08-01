import { ProjectDescription } from "../../components/Project";
import {
	IconGlobe,
	IconHome,
	IconMessage,
	IconNews,
	IconSettings,
} from "@tabler/icons";
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
import { useCreateChapter } from "../../hooks/chapter/useCreateChapter";
import { FourOFour } from "../404";
import { PublishChapterSide } from "../../components/Project/publish/PublishChapterSide";
import { Block, BlockNoteEditor } from "@blocknote/core";
import { useBlockNote } from "@blocknote/react";
import { useEditorContext } from "../../contexts/EditorContext";
export function Project() {
	const queryClient = useQueryClient();
	const { currentUser } = useAuthContext();
	const { project, projectTab, chapter } = useParams();
	const [openModal, setOpenModal] = useState(false);
	const [chapterId, setChapterId] = useState("");
	const navigate = useNavigate();
	// const { editor, content, setContent } = useEditorContext();
	const { data: currentProject, isLoading: projectLoading } = useSingleProject(
		project as string
	);

	const { data: chapters, isLoading } = useQuery(
		["chapters", project],
		() => getProjectChapters(currentUser.uid, project as string),
		{ enabled: !!currentProject }
	);
	const addChapter = useMutation(createChapter, {
		onSuccess: () => {
			queryClient.invalidateQueries("chapters");
		},
	});
	const deleteChapter = useMutation(
		() => deleteSingleChapter(currentUser.uid, project as string, chapterId),
		{
			onSuccess: () => {
				queryClient.invalidateQueries("chapters");
				setOpenModal(false);
			},
		}
	);
	const updateDescription = useMutation(
		(description: string) =>
			updateProjectDescription(currentUser.uid, project as string, description),
		{
			onSuccess: () => {
				queryClient.invalidateQueries(["project", project]);
			},
		}
	);
	const openChapterModal = (chapterId: string) => {
		setChapterId(chapterId);
		setOpenModal(true);
	};

	const { mutate: createNewChapter } = useCreateChapter(project as string);

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
	const tipTapEditor = useEditor({
		extensions,
	});
	if (currentProject === null) {
		return <FourOFour />;
	}
	return (
		<>
			<DeleteModal
				opened={openModal}
				setOpened={setOpenModal}
				deleteBranch={deleteChapter.mutate}
				type="chapter"
			/>
			<ChapterWrapper
				project={currentProject}
				isLoading={Boolean(!currentProject)}
			>
				<Tabs
					className="w-full border-none important:border-none h-[calc(100vh-7.0rem)]"
					value={projectTab}
					onTabChange={(tab) => navigate(`/project/${project}/${tab}`)}
					defaultValue="home"
					radius={"md"}
					orientation="vertical"
					styles={tabStyles}
					keepMounted={false}
				>
					<Tabs.List>
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
						<div className="flex flex-wrap">
							<ChapterRenderer
								chapterCount={chapters?.length}
								createNewChapter={createNewChapter}
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
											<NoChapters createNewChapter={createNewChapter} />
										) : (
											<>
												{chapters?.map((chapter: IChapter, index: number) => (
													<Chapter
														openChapter={() =>
															openChapter(chapter.projectId, chapter.uid)
														}
														key={index}
														chapter={chapter}
														openChapterModal={() =>
															openChapterModal(chapter.uid)
														}
														disabled={false}
													/>
												))}
											</>
										)}
									</>
								)}
							</ChapterRenderer>
							{/* <Divider color="grey.0" orientation="vertical" /> */}
							<ProjectDescription
								project={currentProject}
								user={currentUser.uid}
								editor={tipTapEditor}
								updateDescription={updateDescription.mutate}
							/>

							{/* <CharacterWrapper> - Protagonist </CharacterWrapper> */}
						</div>
					</Tabs.Panel>
					<Tabs.Panel value="publish">
						<div className="flex flex-wrap gap-2">
							<PublishChapterSide
								chapter={chapters?.find((c: IChapter) => c.uid === chapter)}
								editor={editor}
							/>
							<ChapterRenderer
								chapterCount={chapters?.length}
								createNewChapter={createNewChapter}
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
											<NoChapters createNewChapter={createNewChapter} />
										) : (
											<>
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
											</>
										)}
									</>
								)}
							</ChapterRenderer>
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
				</Tabs>
			</ChapterWrapper>
		</>
	);
}
