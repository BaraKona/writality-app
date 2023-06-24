import { ProjectDescription } from "../../../components/Project";
import { v4 as uuidv4 } from "uuid";
import {
	NoChapters,
	Chapter,
	ChapterWrapper,
	ChapterRenderer,
} from "../../../components/Chapters";
import { useAuthContext } from "../../../contexts/AuthContext";
import { IChapter } from "../../../interfaces/IChapter";
import { CharacterWrapper } from "../../../components/Characters/CharacterWrapper";
import { Loading } from "../../../components/Loading";
import { useQuery, useMutation, useQueryClient } from "react-query";
import {
	getProjectChapters,
	createChapter,
	deleteSingleChapter,
} from "../../../api/project/chapters";
import { DeleteModal } from "../../../components/Modals";
import {
	getSingleProject,
	deleteSingleProject,
	updateProjectDescription,
	updateProjectTitle,
} from "../../../api/project/projects";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { chapterCreator } from "../../../hooks";
import { Tabs } from "@mantine/core";
import { useEditor } from "@tiptap/react";
import { extensions } from "../../../components/Editor/utils/editorExtensions";
import { useTabContext } from "../../../contexts/TabContext";
import { ProjectSettings } from "../../../components/Project/ProjectSettings";
import { CreateChapterButton } from "../../../components/buttons";
import { IconTrash } from "@tabler/icons";
import { IProject } from "../../../interfaces/IProject";

export function Project() {
	const queryClient = useQueryClient();
	const { currentUser } = useAuthContext();
	const { project } = useParams();
	const [openModal, setOpenModal] = useState(false);
	const [openDeleteProject, setOpenDeleteProject] = useState(false);
	const [chapterId, setChapterId] = useState("");
	const { tabs, setTabs } = useTabContext();
	const navigate = useNavigate();

	const { data: currentProject } = useQuery(
		["project", project],
		() => getSingleProject(currentUser.uid, project as string),
		{ enabled: !!project && !!currentUser.uid }
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
	const deleteProject = useMutation(
		() => deleteSingleProject(currentUser.uid, project as string),
		{
			onSuccess: () => {
				queryClient.invalidateQueries(["projects", currentUser.uid]);
				navigate("/dashboard");
			},
		}
	);
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
	const createNewChapter = () => {
		addChapter.mutate(chapterCreator(currentUser.uid, project as string));
	};

	const updateProjectTitleMutation = useMutation(
		(title: string) =>
			updateProjectTitle(
				currentUser.uid,
				project as string,
				title || currentProject?.title
			),
		{
			onSuccess: () => {
				queryClient.invalidateQueries(["project", project as string]);
				queryClient.invalidateQueries(["projects", currentUser.uid]);
			},
		}
	);

	const openChapter = (projectId: string, chapterId: string) => {
		navigate(`/project/${projectId}/chapter/${chapterId}`);
	};

	const editor = useEditor({
		extensions,
	});

	if (isLoading || !editor || !currentProject) {
		return <Loading isLoading={true} />;
	}
	return (
		<>
			<DeleteModal
				opened={openDeleteProject}
				setOpened={setOpenDeleteProject}
				deleteBranch={deleteProject.mutate}
				type="project"
			/>
			<DeleteModal
				opened={openModal}
				setOpened={setOpenModal}
				deleteBranch={deleteChapter.mutate}
				type="chapter"
			/>
			{chapters?.length == 0 ? (
				<NoChapters createNewChapter={createNewChapter} />
			) : (
				<ChapterWrapper
					title={currentProject.title}
					type={currentProject.type}
					createNewChapter={createNewChapter}
					updateProjectTitle={updateProjectTitleMutation.mutate}
				>
					<Tabs
						className="w-full border-none important:border-none"
						defaultValue="home"
						color="gray"
						radius={"md"}
						orientation="vertical"
						variant="pills"
						styles={{
							tab: {
								backgroundColor: "#f2f2f2",
								borderTopLeftRadius: "0px",
								borderBottomLeftRadius: "0px",
							},
						}}
					>
						<Tabs.List>
							<Tabs.Tab value="home">Home</Tabs.Tab>
							<Tabs.Tab value="world-info" disabled>
								World
							</Tabs.Tab>
							<Tabs.Tab value="settings">Settings</Tabs.Tab>
							<Tabs.Tab value="publish" disabled>
								Publish
							</Tabs.Tab>
							{currentProject?.type === "collaboration" && (
								<Tabs.Tab value="chat">Chat</Tabs.Tab>
							)}
						</Tabs.List>

						<Tabs.Panel value="home">
							<div className="flex flex-wrap">
								<ChapterRenderer chapterCount={chapters?.length}>
									{chapters?.map((chapter: IChapter, index: number) => (
										<Chapter
											openChapter={() =>
												openChapter(chapter.projectId, chapter.uid)
											}
											key={index}
											chapter={chapter}
											openChapterModal={() => openChapterModal(chapter.uid)}
											disabled={false}
										/>
									))}
								</ChapterRenderer>
								{editor && currentProject && (
									<ProjectDescription
										project={currentProject}
										user={currentUser.uid}
										editor={editor}
										updateDescription={updateDescription.mutate}
									/>
								)}
								{/* <CharacterWrapper> - Protagonist </CharacterWrapper> */}
							</div>
						</Tabs.Panel>

						<Tabs.Panel value="world-info">
							<CharacterWrapper> - Protagonist </CharacterWrapper>
						</Tabs.Panel>

						<Tabs.Panel value="settings">
							Delete Project
							<CreateChapterButton
								createNewChapter={() => setOpenDeleteProject(true)}
								text="Delete Project"
								icon={<IconTrash size={20} />}
							/>
						</Tabs.Panel>
					</Tabs>
				</ChapterWrapper>
			)}
		</>
	);
}
