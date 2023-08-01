import { useState } from "react";
import {
	EditorWrapper,
	ChapterEditorController,
} from "../../components/Editor";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useAuthContext } from "../../contexts/AuthContext";
import { Loading } from "../../components/Loading";
import { CreateBranchModal } from "../../components/Modals/CreateBranchModal";
import {
	getSingleChapter,
	mergePositionMain,
	mergeReplaceMain,
} from "../../api/project/chapters";
import {
	getAllChapterVersions,
	deleteSingleChapterVersion,
} from "../../api/project/versions";
import { useNavigate, useParams } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import {
	createBranch,
	getAllBranches,
	getSingleBranch,
	updateBranch,
	deleteBranch,
} from "../../api/project/branches";
import {
	UpdateContentModal,
	DeleteModal,
	VersionModal,
	AdvancedMergeModal,
} from "../../components/Modals";
import { branchCreator, useAppendHistory } from "../../hooks";
import { useMergeReplace } from "../../hooks/chapter/useMergeReplace";
import { useEditor } from "@tiptap/react";
import { extensions } from "../../components/Editor/utils/editorExtensions";
import { ChapterBranchMenu } from "../../components/Chapters/branch/ChapterBranchMenu";
import { ChapterVersionMenu } from "../../components/Chapters/version/ChapterVersionMenu";
import { ChapterHistoryMenu } from "../../components/Chapters/history/ChapterHistoryMenu";
import { ChapterSettingsMenu } from "../../components/Chapters/settings/ChapterSettingsMenu";
import { ChapterSidebar } from "../../components/Chapters/ChapterSidebar";
import { ChapterVersionButton } from "../../components/Chapters/version/ChapterVersionButton";
import { ChapterHistoryButton } from "../../components/Chapters/history/ChapterHistoryButton";
import { ChapterBranchButton } from "../../components/Chapters/branch/ChapterBranchButton";
import { useUpdateChapterContent } from "../../hooks/chapter/useUpdateChapterContent";
import { ChapterSettingsButton } from "../../components/Chapters/settings/ChapterSettingsButton";
import { useLocalStorage } from "@mantine/hooks";
import { MergeEditor } from "../../components/Editor/MergeEditor";
import { BlockEditor } from "../../components/Editor/BlockEditor";
import { useCreateChapterBranch } from "../../hooks/chapter/useCreateChapterBranch";
import { MergeBlockEditor } from "../../components/Editor/MergeBlockEditor";
import { useSingleProject } from "../../hooks/projects/useSingleProject";
import { ChapterMergeButton } from "../../components/Chapters/merge/ChapterMergeButton";
import { MergeBranchModal } from "../../components/Chapters/merge/MergeChapterMondal";
import { Divider } from "@mantine/core";

export const Chapter = () => {
	const navigate = useNavigate();
	const { currentUser } = useAuthContext();
	const [text, setText] = useState("");
	const [searchParams, setSearchParams] = useSearchParams();
	const [opened, setOpened] = useState(false);
	const [branchName, setBranchName] = useState("chapter-v1");
	const [mergeOpened, setMergeOpened] = useState(false);
	const [versionModalOpen, setVersionModalOpen] = useState(false);
	const [UpdateContentModalOpen, setUpdateContentModalOpen] = useState(false);
	const [openDeleteBranch, setOpenDeleteBranch] = useState(false);
	const [position, setPosition] = useState<string | null>(null);
	const [version, setVersion] = useState({} as any);
	const [advancedMergeOpened, setAdvancedMergeOpened] = useState(false);
	const [title, setTitle] = useState("");
	const { chapter, project } = useParams();
	const [editorContent, setEditorContent] = useState("");

	const [sidebar, setSidebar] = useLocalStorage({
		key: "chapter-sidebar",
		defaultValue: "",
	});

	const queryClient = useQueryClient();
	const branch = searchParams.get("branch");
	const merge = searchParams.get("merge");

	const { data: currentProject, isLoading: projectLoading } = useSingleProject(
		project as string
	);

	const { data: chapterContent, isLoading } = useQuery(
		["chapter", chapter],
		() =>
			getSingleChapter(currentUser.uid, project as string, chapter as string),
		{ enabled: !!chapter && !!project && !!currentUser.uid }
	);
	const { data: chapterVersions } = useQuery(
		["versions", chapter as string],
		() => getAllChapterVersions(chapter as string),
		{ enabled: !!chapterContent }
	);
	const { data: chapterBranches } = useQuery(
		["chapterBranches", chapter as string],
		() => getAllBranches(chapter as string),
		{ enabled: !!chapterContent }
	);
	const { data: currentBranch, isSuccess: branchSuccess } = useQuery(
		["currentBranch", branch as string],
		() => getSingleBranch(chapter as string, branch as string),
		{ enabled: !!chapterContent && !!branch }
	);

	const { mutate: createBranchMutation } = useCreateChapterBranch();
	const deleteBranchMutation = useMutation(
		() => deleteBranch(chapter as string, branch as string),
		{
			onSuccess: () => {
				queryClient.invalidateQueries(["chapterBranches", chapter as string]);
				setOpenDeleteBranch(false);
				navigate(`/project/${project}/chapter/${chapter}`);
			},
		}
	);
	const deleteChapterVersionMutation = useMutation(
		() => deleteSingleChapterVersion(chapter as string, version.uid),
		{
			onSuccess: () => {
				queryClient.invalidateQueries(["versions", chapter as string]);
				setVersionModalOpen(false);
			},
		}
	);
	const { mutate: replaceMain } = useMergeReplace(
		project as string,
		chapter as string
	);

	const { mutate: updateChapterContentMutation } = useUpdateChapterContent(
		project as string,
		chapter as string,
		title || chapterContent?.content.title
	);

	const updateBranchMutation = useMutation(
		() =>
			updateBranch(chapter as string, branch as string, {
				...currentBranch,
				content: editorContent,
				dateUpdated: {
					user: currentUser.uid,
					date: new Date(),
				},
			}),
		{
			onSuccess: () => {
				queryClient.invalidateQueries(["currentBranch", branch as string]);
			},
		}
	);
	const mergePosition = useMutation(
		() =>
			mergePositionMain(
				currentUser.uid,
				project as string,
				chapter as string,
				position || "",
				currentBranch,
				useAppendHistory(currentUser.uid, chapterContent, currentBranch.name),
				{
					user: currentUser.uid,
					date: Date.now(),
				}
			),
		{
			onSuccess: () => {
				queryClient.invalidateQueries(["chapter", chapter as string]);
				queryClient.invalidateQueries(["versions", chapter as string]);
				searchParams.delete("branch");
				setSearchParams(searchParams);
				setMergeOpened(false);
			},
		}
	);

	const closeSidebar = () => {
		setSidebar("");
	};

	const navigateToMain = () => {
		searchParams.delete("branch");
		searchParams.delete("merge");
		setSearchParams(searchParams);
	};

	const openMerge = (type: string) => {
		searchParams.set("merge", type);
		setSearchParams(searchParams);
	};
	const editor = useEditor({
		extensions,
	});

	if ((branch && !currentBranch) || !chapterContent || !editor)
		return <Loading isLoading={true}> </Loading>;
	return (
		<>
			<CreateBranchModal
				branchName={branchName}
				setBranchName={setBranchName}
				createBranch={() =>
					createBranchMutation({
						chapterId: chapter as string,
						name: branchName,
						title: title || chapterContent?.content.title,
						projectId: project as string,
						content: editorContent,
					})
				}
				setOpened={setOpened}
				opened={opened}
			/>
			{/* {branch && currentBranch && (
				<AdvancedMergeModal
					setOpened={setAdvancedMergeOpened}
					opened={advancedMergeOpened}
					main={chapterContent?.content}
					setText={setText}
					currentContent={currentBranch}
					mergeBranch={() => replaceMain(currentBranch.content)}
				/>
			)} */}
			<DeleteModal
				setOpened={setOpenDeleteBranch}
				opened={openDeleteBranch}
				deleteBranch={deleteBranchMutation.mutate}
				type="branch"
			/>
			<UpdateContentModal
				setOpened={setUpdateContentModalOpen}
				opened={UpdateContentModalOpen}
				setText={() => {
					currentBranch
						? setText(
								JSON.parse(localStorage.getItem(currentBranch?.uid) as string)
									.text
						  )
						: setText(
								JSON.parse(
									localStorage.getItem(chapterContent?.content.uid) as string
								).text
						  );
					setUpdateContentModalOpen(false);
				}}
			/>
			<MergeBranchModal opened={mergeOpened} setMergeOpened={setMergeOpened} currentBranch={currentBranch} mergeBranch={merge === "replace" ? () => replaceMain(currentBranch) : () => console.log('ff')}/>
			<VersionModal
				setOpened={setVersionModalOpen}
				opened={versionModalOpen}
				deleteVersion={deleteChapterVersionMutation.mutate}
				version={version}
				currentContent={branch ? currentBranch : chapterContent?.content}
				setText={setText}
				editor={editor}
			/>
			<EditorWrapper
				save={
					branch
						? updateBranchMutation.mutate
						: () => updateChapterContentMutation(editorContent)
				}
				content={currentBranch ? currentBranch : chapterContent?.content}
			>
				{editor && !merge && (
					<BlockEditor
						setEditorContent={setEditorContent}
						content={branch ? currentBranch : chapterContent.content}
						isLoading={isLoading}
						setTitle={setTitle}
						isEditable={Boolean(branch) || currentProject?.type === "standard"}
					/>
				)}
				{merge && currentBranch && (
					<MergeBlockEditor
						branch={currentBranch}
						main={chapterContent.content}
					/>
				)}
				<div className="flex flex-row ">
					<ChapterSidebar active={Boolean(sidebar)}>
						<ChapterBranchButton
							setActive={() => setSidebar("branches")}
							active={sidebar === "branches"}
						/>
						<ChapterVersionButton
							setActive={() => setSidebar("versions")}
							active={sidebar === "versions"}
						/>
						<ChapterHistoryButton
							setActive={() => setSidebar("history")}
							active={sidebar === "history"}
						/>
						{merge === "replace" && (
							<>
							<Divider my={2} color="grey.0" />
							<ChapterMergeButton
								setOpen={() => setMergeOpened(true)}
							/>
							</>
						)}

					</ChapterSidebar>
					<div>
						<ChapterBranchMenu
							openMergeModal={openMerge}
							chapterBranches={chapterBranches}
							currentBranch={
								currentBranch
									? currentBranch
									: editor?.getHTML() || chapterContent
							}
							mainContent={chapterContent?.content}
							checkoutMain={() => navigateToMain()}
							openDeleteBranch={setOpenDeleteBranch}
							openBranchModal={() => setOpened(true)}
							close={() => closeSidebar()}
							active={sidebar === "branches"}
						/>

						<ChapterVersionMenu
							chapterVersions={chapterVersions}
							setOpen={setVersionModalOpen}
							setVersion={setVersion}
							text={editor.getHTML()}
							close={() => closeSidebar()}
							active={sidebar === "versions"}
						/>
						<ChapterHistoryMenu
							history={chapterContent?.history}
							close={() => closeSidebar()}
							active={sidebar === "history"}
						/>
					</div>
				</div>
			</EditorWrapper>
		</>
	);
};
