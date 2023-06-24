// import { FC, useEffect, useState } from "react";
// import {
// 	ChapterEditorController,
// 	EditorWrapper,
// } from "../../../components/Editor";
// import { useNavigate, useParams } from "react-router-dom";
// import {
// 	getSingleCollabChapter,
// 	updateCollabChapterContent,
// 	mergeReplaceMain,
// } from "../../../api/collaboration/collabChapters";
// import {
// 	getAllCollabChapterVersions,
// 	createCollabVersion,
// 	deleteSingleCollabChapterVersion,
// } from "../../../api/collaboration/collabVersions";
// import {
// 	getAllCollabBranches,
// 	createCollabBranch,
// 	getSingleCollabBranch,
// 	updateCollabBranch,
// 	deleteCollabBranch,
// } from "../../../api/collaboration/collabBranches";
// import { useMutation, useQuery, useQueryClient } from "react-query";
// import {
// 	ChapterBranches,
// 	ChapterVersions,
// 	ChapterHistory,
// } from "../../../components/Chapters";
// import {
// 	versionCreator,
// 	branchCreator,
// 	useToast,
// 	useUpdateChapter,
// 	useAppendHistory,
// } from "../../../hooks";
// import { useAuthContext } from "../../../contexts/AuthContext";
// import {
// 	CreateBranchModal,
// 	DeleteModal,
// 	MergeBranchModal,
// 	AdvancedMergeModal,
// 	VersionModal,
// } from "../../../components/Modals";
// import { useSearchParams } from "react-router-dom";

// import { RichTextEditor, Link } from "@mantine/tiptap";
// import { useEditor } from "@tiptap/react";
// import Highlight from "@tiptap/extension-highlight";
// import StarterKit from "@tiptap/starter-kit";
// import Underline from "@tiptap/extension-underline";
// import TextAlign from "@tiptap/extension-text-align";
// import Superscript from "@tiptap/extension-superscript";
// import SubScript from "@tiptap/extension-subscript";
// import TextStyle from "@tiptap/extension-text-style";
// import Color from "@tiptap/extension-color";
// import CharacterCount from "@tiptap/extension-character-count";
// import { extensions } from "../../../components/Editor/utils/editorExtensions";
// import { ChapterBranchMenu } from "../../../components/Chapters/branch/ChapterBranchMenu";
// import { ChapterVersionMenu } from "../../../components/Chapters/version/ChapterVersionMenu";
// import { ChapterHistoryMenu } from "../../../components/Chapters/history/ChapterHistoryMenu";

// export const CollaborationChapter: FC<{ socket: any }> = ({ socket }) => {
// 	const [mergeOpened, setMergeOpened] = useState(false);
// 	const [versionModalOpen, setVersionModalOpen] = useState(false);
// 	const [branchName, setBranchName] = useState("");
// 	const [opened, setOpened] = useState(false);
// 	const [version, setVersion] = useState({} as any);
// 	const [advancedMergeModalOpen, setAdvancedMergeModalOpen] = useState(false);
// 	const [updateContentModalOpen, setUpdateContentModalOpen] = useState(false);
// 	const [position, setPosition] = useState<string | null>(null);
// 	const [openDeleteBranch, setOpenDeleteBranch] = useState(false);
// 	const [searchParams, setSearchParams] = useSearchParams();
// 	const [text, setText] = useState("");

// 	const navigate = useNavigate();
// 	const { chapterId, collaborationId } = useParams();
// 	const { currentUser } = useAuthContext();
// 	const queryClient = useQueryClient();
// 	const branchId = searchParams.get("branch");

// 	const { data: chapter } = useQuery(
// 		["chapter", chapterId],
// 		() =>
// 			getSingleCollabChapter(collaborationId as string, chapterId as string),
// 		{ enabled: !!collaborationId }
// 	);

// 	const { data: versions } = useQuery(
// 		["versions", chapterId],
// 		() => getAllCollabChapterVersions(chapterId as string),
// 		{ enabled: !!collaborationId }
// 	);

// 	const { data: branch, isSuccess: branchSuccess } = useQuery(
// 		["branch", branchId as string],
// 		() => getSingleCollabBranch(chapterId as string, branchId as string),
// 		{ enabled: !!chapter && !!branchId }
// 	);

// 	const { data: branches } = useQuery(
// 		["branches", chapterId],
// 		() => getAllCollabBranches(chapterId as string),
// 		{ enabled: !!collaborationId }
// 	);

// 	const createVersion = useMutation((data: any) => createCollabVersion(data), {
// 		onSuccess: () => {
// 			queryClient.invalidateQueries(["versions", chapterId]),
// 				socket.emit("create-col-version", chapterId);
// 		},
// 	});

// 	const createBranch = useMutation((data: any) => createCollabBranch(data), {
// 		onSuccess: () => {
// 			queryClient.invalidateQueries(["branches", chapterId]),
// 				socket.emit("create-col-branch", chapterId);
// 			setOpened(false);
// 		},
// 	});

// 	const deleteBranch = useMutation(
// 		() => deleteCollabBranch(chapterId as string, branchId as string),
// 		{
// 			onSuccess: () => {
// 				queryClient.invalidateQueries(["branches", chapterId]),
// 					socket.emit("delete-col-branch", chapterId, branch.name);
// 				setOpenDeleteBranch(false);
// 			},
// 		}
// 	);

// 	const deleteVersion = useMutation(
// 		() => deleteSingleCollabChapterVersion(chapterId as string, version.uid),
// 		{
// 			onSuccess: () => {
// 				queryClient.invalidateQueries(["versions", chapterId]),
// 					socket.emit("delete-col-version", chapterId, version.uid);
// 				setVersionModalOpen(false);
// 			},
// 		}
// 	);
// 	const replaceMain = useMutation(
// 		(content: string) =>
// 			mergeReplaceMain(
// 				currentUser.uid,
// 				collaborationId as string,
// 				chapterId as string,
// 				{ ...branch, content: content },

// 				useAppendHistory(currentUser.uid, chapter, branch.name),
// 				{ user: currentUser.uid, date: new Date() }
// 			),
// 		{
// 			onSuccess: () => {
// 				queryClient.invalidateQueries(["chapter", chapterId as string]);
// 				queryClient.invalidateQueries(["versions", chapterId as string]);
// 				socket.emit("merge-col-branch", chapterId, branch.name);
// 				setMergeOpened(false);
// 				setAdvancedMergeModalOpen(false);
// 				searchParams.delete("branch");
// 				setSearchParams(searchParams);
// 			},
// 		}
// 	);

// 	socket.off("create-col-branch").on("create-col-branch", () => {
// 		queryClient.invalidateQueries(["branches", chapterId]);
// 		useToast("success", "New Branch created");
// 	});
// 	socket.off("save").on("save", () => {
// 		queryClient.invalidateQueries(["chapter", chapterId]);
// 		useToast("success", "Main has been updated");
// 	});
// 	socket.off("create-col-version").on("create-col-version", () => {
// 		queryClient.invalidateQueries(["versions", chapterId]);
// 		useToast("success", "New Version created");
// 	});
// 	socket.off("update-col-branch").on("update-col-branch", (name: string) => {
// 		console.log("update");
// 		useToast("success", `[Branch] ${name} updated`);
// 	});
// 	socket.off("delete-col-branch").on("delete-col-branch", (name: string) => {
// 		queryClient.invalidateQueries(["branches", chapterId]);
// 		useToast("success", `[Branch] ${name} deleted`);
// 	});
// 	socket
// 		.off("delete-col-version")
// 		.on("delete-col-version", (deletedVersion: string) => {
// 			queryClient.invalidateQueries(["versions", chapterId]);
// 			useToast("success", "Version deleted");

// 			if (deletedVersion === version.uid) {
// 				setVersionModalOpen(false);
// 				alert("This version has been deleted");
// 			}
// 		});
// 	socket
// 		.off("merge-col-branch")
// 		.on("merge-col-branch", (branchName: string) => {
// 			queryClient.invalidateQueries(["chapter", chapterId]);
// 			queryClient.invalidateQueries(["versions", chapterId as string]);
// 			useToast("success", `[Branch] ${branchName} merged to main`);
// 		});

// 	const updateChapterContentMutation = useMutation(
// 		() =>
// 			updateCollabChapterContent(
// 				collaborationId as string,
// 				chapterId as string,
// 				useUpdateChapter(chapter, text, currentUser.uid)
// 			),
// 		{
// 			onSuccess: () => {
// 				queryClient.invalidateQueries(["chapter", chapterId]);
// 				socket.emit("save", chapterId);
// 			},
// 		}
// 	);
// 	const updateBranchMutation = useMutation(
// 		() =>
// 			updateCollabBranch(chapterId as string, branchId as string, {
// 				...branch,
// 				content: text,
// 				dateUpdated: {
// 					user: currentUser.uid,
// 					date: new Date(),
// 				},
// 			}),
// 		{
// 			onSuccess: () => {
// 				queryClient.invalidateQueries(["branch", branchId]);
// 			},
// 			onSettled: () => {
// 				socket.emit("update-col-branch", chapterId, branch.name);
// 			},
// 		}
// 	);

// 	const editor = useEditor({
// 		extensions,
// 	});

// 	useEffect(() => {
// 		if (collaborationId) {
// 			socket.emit("join-chapter", chapterId);
// 		}
// 	}, [collaborationId]);

// 	return (
// 		<>
// 			<CreateBranchModal
// 				branchName={branchName}
// 				setBranchName={setBranchName}
// 				createBranch={() =>
// 					createBranch.mutate(
// 						branchCreator(chapter, branchName, currentUser.uid, text)
// 					)
// 				}
// 				setOpened={setOpened}
// 				opened={opened}
// 			/>
// 			<DeleteModal
// 				setOpened={setOpenDeleteBranch}
// 				opened={openDeleteBranch}
// 				deleteBranch={deleteBranch.mutate}
// 				type="branch"
// 			/>
// 			<VersionModal
// 				setOpened={setVersionModalOpen}
// 				opened={versionModalOpen}
// 				deleteVersion={deleteVersion.mutate}
// 				version={version}
// 				currentContent={branch || chapter?.content}
// 				setText={setText}
// 				editor={editor}
// 			/>
// 			{branchId && branch && (
// 				<AdvancedMergeModal
// 					setOpened={setAdvancedMergeModalOpen}
// 					opened={advancedMergeModalOpen}
// 					mergeBranch={replaceMain.mutate}
// 					setText={setText}
// 					main={chapter?.content}
// 					currentContent={branch}
// 				/>
// 			)}
// 			<MergeBranchModal
// 				setMergeOpened={setMergeOpened}
// 				mergeOpened={mergeOpened}
// 				replaceMain={replaceMain.mutate}
// 				mergeBranch={() => {}}
// 				setPosition={setPosition}
// 				position={position || ""}
// 				currentBranch={branch}
// 				openAdvancedMerge={() => setAdvancedMergeModalOpen(true)}
// 			/>
// 			<EditorWrapper
// 				backToProject={() => navigate(`/collaboration/${collaborationId}`)}
// 				save={
// 					branch
// 						? updateBranchMutation.mutate
// 						: updateChapterContentMutation.mutate
// 				}
// 				content={branch || chapter?.content}
// 				title={chapter?.title}
// 				updateChapterTitle={() => {}}
// 			>
// 				{editor && (
// 					<ChapterEditorController
// 						setText={setText}
// 						setOpen={setUpdateContentModalOpen}
// 						editor={editor}
// 						content={branchId ? branch?.content : chapter?.content.content}
// 					/>
// 				)}
// 				<div className="border-l flex flex-col gap-3 pl-3">
// 					<ChapterBranchMenu
// 						openMergeModal={() => setMergeOpened(true)}
// 						chapterBranches={branches}
// 						currentBranch={branch || chapter?.content}
// 						mainContent={chapter?.content}
// 						setSearchParams={setSearchParams}
// 						checkoutMain={() =>
// 							navigate(`/collaboration/${collaborationId}/chapter/${chapterId}`)
// 						}
// 						openDeleteBranch={setOpenDeleteBranch}
// 						openBranchModal={() => setOpened(true)}
// 					/>
// 					<ChapterVersionMenu
// 						createVersion={() =>
// 							createVersion.mutate(
// 								versionCreator(chapter, currentUser.uid, versions, text)
// 							)
// 						}
// 						chapterVersions={versions}
// 						setOpen={setVersionModalOpen}
// 						setVersion={setVersion}
// 					/>
// 					<ChapterHistoryMenu history={chapter?.history} />
// 				</div>
// 			</EditorWrapper>
// 		</>
// 	);
// };
