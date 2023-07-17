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
	updateChapterContent,
	mergePositionMain,
	mergeReplaceMain,
	updateChapterTitle,
} from "../../api/project/chapters";
import {
	createVersion,
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
	MergeBranchModal,
	UpdateContentModal,
	DeleteModal,
	VersionModal,
	AdvancedMergeModal,
} from "../../components/Modals";
import { branchCreator, versionCreator, useAppendHistory } from "../../hooks";

import { useEditor } from "@tiptap/react";
import { extensions } from "../../components/Editor/utils/editorExtensions";
import { ChapterBranchMenu } from "../../components/Chapters/branch/ChapterBranchMenu";
import { ChapterVersionMenu } from "../../components/Chapters/version/ChapterVersionMenu";
import { ChapterHistoryMenu } from "../../components/Chapters/history/ChapterHistoryMenu";
import { ChapterSettingsMenu } from "../../components/Chapters/settings/ChapterSettingsMenu";
import { Tooltip } from "@mantine/core";
import { tooltipStyles } from "../../styles/tooltipStyles";
import { IconGitBranch } from "@tabler/icons";
import { ChapterSidebar } from "../../components/Chapters/ChapterSidebar";
import { ChapterVersionButton } from "../../components/Chapters/version/ChapterVersionButton";
import { ChapterHistoryButton } from "../../components/Chapters/history/ChapterHistoryButton";
import { ChapterBranchButton } from "../../components/Chapters/branch/ChapterBranchButton";
import { useUpdateChapterContent } from "../../hooks/chapter/useUpdateChapterContent";
import { ChapterSettingsButton } from "../../components/Chapters/settings/ChapterSettingsButton";

export const Chapter = () => {
	const navigate = useNavigate();
	const { currentUser } = useAuthContext();
	const [text, setText] = useState("");
	const [searchParams, setSearchParams] = useSearchParams();
	const [opened, setOpened] = useState(false);
	const [branchName, setBranchName] = useState("");
	const [mergeOpened, setMergeOpened] = useState(false);
	const [versionModalOpen, setVersionModalOpen] = useState(false);
	const [UpdateContentModalOpen, setUpdateContentModalOpen] = useState(false);
	const [openDeleteBranch, setOpenDeleteBranch] = useState(false);
	const [position, setPosition] = useState<string | null>(null);
	const [version, setVersion] = useState({} as any);
	const [advancedMergeOpened, setAdvancedMergeOpened] = useState(false);
	const [title, setTitle] = useState("");
	const { chapter, project } = useParams();

	const queryClient = useQueryClient();
	const branch = searchParams.get("branch");
	const { data: chapterContent } = useQuery(
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

	const createBranchMutation = useMutation(createBranch, {
		onSuccess: () => {
			queryClient.invalidateQueries(["chapterBranches", chapter as string]);
			setOpened(false);
		},
	});
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

	const { mutate: updateChapterContentMutation } = useUpdateChapterContent(
		project as string,
		chapter as string,
		title
	);

	const updateBranchMutation = useMutation(
		() =>
			updateBranch(chapter as string, branch as string, {
				...currentBranch,
				content: text,
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
	const replaceMain = useMutation(
		(content: string) =>
			mergeReplaceMain(
				currentUser.uid,
				project as string,
				chapter as string,
				{ ...currentBranch, content: content },

				useAppendHistory(currentUser.uid, chapterContent, currentBranch.name),
				{ user: currentUser.uid, date: new Date() }
			),
		{
			onSuccess: () => {
				queryClient.invalidateQueries(["chapter", chapter as string]);
				queryClient.invalidateQueries(["versions", chapter as string]);
				setMergeOpened(false);
				setAdvancedMergeOpened(false);
				searchParams.delete("branch");
				setSearchParams(searchParams);
			},
		}
	);

	const ChapterSidebarHandler = (name: string) => {
		setSearchParams((prev) => {
			prev.set("sidebar", name);
			return prev;
		});
	};

	const deleteSidebarParam = () => {
		searchParams.delete("sidebar");
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
					createBranchMutation.mutate(
						branchCreator(chapterContent, branchName, currentUser.uid, text)
					)
				}
				setOpened={setOpened}
				opened={opened}
			/>
			{branch && currentBranch && (
				<AdvancedMergeModal
					setOpened={setAdvancedMergeOpened}
					opened={advancedMergeOpened}
					main={chapterContent?.content}
					setText={setText}
					currentContent={currentBranch}
					mergeBranch={replaceMain.mutate}
				/>
			)}
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
			<MergeBranchModal
				setMergeOpened={setMergeOpened}
				mergeOpened={mergeOpened}
				replaceMain={replaceMain.mutate}
				mergeBranch={mergePosition.mutate}
				currentBranch={currentBranch}
				setPosition={setPosition}
				position={position || ""}
				openAdvancedMerge={() => {
					setAdvancedMergeOpened(true), setMergeOpened(false);
				}}
			/>
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
						: () => updateChapterContentMutation(editor.getHTML())
				}
				content={currentBranch ? currentBranch : chapterContent?.content}
			>
				{editor && (
					<ChapterEditorController
						chapterContent={chapterContent}
						setText={setText}
						editor={editor}
						setOpen={setUpdateContentModalOpen}
						content={
							branch ? currentBranch.content : chapterContent?.content.content
						}
						setTitle={setTitle}
					/>
				)}
				<div className="border-l flex flex-row ">
					<ChapterSidebar active={Boolean(searchParams.get("sidebar"))}>
						<ChapterBranchButton
							setActive={() => ChapterSidebarHandler("branches")}
						/>
						<ChapterVersionButton
							setActive={() => ChapterSidebarHandler("versions")}
						/>
						<ChapterHistoryButton
							setActive={() => ChapterSidebarHandler("history")}
						/>
						<ChapterSettingsButton
							setActive={() => ChapterSidebarHandler("settings")}
						/>
					</ChapterSidebar>
					<div>
						<ChapterBranchMenu
							openMergeModal={() => setMergeOpened(true)}
							chapterBranches={chapterBranches}
							currentBranch={
								currentBranch
									? currentBranch
									: editor?.getHTML() || chapterContent
							}
							mainContent={chapterContent?.content}
							checkoutMain={() =>
								navigate(`/project/${project}/chapter/${chapter}`)
							}
							openDeleteBranch={setOpenDeleteBranch}
							openBranchModal={() => setOpened(true)}
							close={() => deleteSidebarParam()}
						/>

						<ChapterVersionMenu
							chapterVersions={chapterVersions}
							setOpen={setVersionModalOpen}
							setVersion={setVersion}
							text={editor.getHTML()}
							close={() => deleteSidebarParam()}
						/>
						<ChapterHistoryMenu
							history={chapterContent?.history}
							close={() => deleteSidebarParam()}
						/>
						<ChapterSettingsMenu close={() => deleteSidebarParam()} />
					</div>
				</div>
			</EditorWrapper>
		</>
	);
};
