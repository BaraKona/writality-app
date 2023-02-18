import React, { FC, useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
	Chapter,
	ChapterWrapper,
	NoChapters,
	ChapterRenderer,
} from "../../../components/Chapters";
import {
	InviteUserDrawer,
	InviteUserModal,
	DeleteModal,
} from "../../../components/Modals";
import {
	BaseProjectView,
	CollaborationToolbar,
	ProjectDescription,
} from "../../../components/Project";
import { useAuthContext } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Loading } from "../../../components/Loading";
import { Button, Tabs } from "@mantine/core";
import {
	CollaboratorsList,
	CollaborationChat,
} from "../../../components/Project/Collaboration";
import { getProjectChat, commentOnChat } from "../../../api/chat/chats";
import { IconAffiliate } from "@tabler/icons";
import { useParams } from "react-router-dom";
import { chapterCreator } from "../../../hooks";
import {
	getSingleCollabProject,
	addCollaboratorToProject,
} from "../../../api/collaboration/collabProjects";
import {
	getCollabChapters,
	createCollabChapter,
	deleteCollabChapter,
} from "../../../api/collaboration/collabChapters";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getAllUsers } from "../../../api/user";
import { useToast } from "../../../hooks/useToast";
import { CharacterWrapper } from "../../../components/Characters/CharacterWrapper";
import { IChapter } from "../../../interfaces/IChapter";

export const Collaboration: FC<{ socket: any }> = ({ socket }) => {
	const [opened, setOpened] = useState(false);
	const [modalOpen, setModalOpen] = useState(false);
	const { collaborationId } = useParams();
	const { currentUser, users } = useAuthContext();
	const [deleteModal, setDeleteModal] = useState(false);
	const [chapterId, setChapterId] = useState("");
	const [comment, setComment] = useState("");
	const commentViewportRef = useRef(null);
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const { data: collaboration } = useQuery(
		["collaboration", collaborationId],
		() => getSingleCollabProject(currentUser.uid, collaborationId as string),
		{
			enabled: !!collaborationId && !!currentUser.uid,
		}
	);
	const { data: allUsers } = useQuery("users", getAllUsers, {
		enabled: !!currentUser.uid && !!collaboration,
	});
	const { data: chat } = useQuery(
		["chat", collaborationId],
		() => getProjectChat(collaborationId as string),
		{
			enabled: !!collaborationId,
		}
	);
	const addChapter = useMutation(createCollabChapter, {
		onSuccess: () => {
			queryClient.invalidateQueries(["chapters", collaborationId]);
			socket.emit("create-col-chapter", collaborationId);
		},
	});
	const deleteChapter = useMutation(
		() =>
			deleteCollabChapter(
				currentUser.uid,
				collaborationId as string,
				chapterId
			),
		{
			onSuccess: () => {
				queryClient.invalidateQueries(["chapters", collaborationId]);
				socket.emit("delete-col-chapter", collaborationId);
				setDeleteModal(false);
			},
		}
	);
	const { data: chapters, isLoading } = useQuery(
		["chapters", collaborationId],
		() => getCollabChapters(collaborationId as string),
		{
			enabled: !!collaboration,
		}
	);
	const createNewChapter = () => {
		addChapter.mutate(
			chapterCreator(currentUser.uid, collaborationId as string)
		);
	};
	socket
		.off("delete-col-chapter")
		.on("delete-col-chapter", (message: string) => {
			queryClient.invalidateQueries(["chapters", collaborationId]);
			useToast("success", "A chapter has been deleted");
		});
	socket
		.off("create-col-chapter")
		.on("create-col-chapter", (message: string) => {
			queryClient.invalidateQueries(["chapters", collaborationId]);
			useToast("success", "A chapter has been created");
		});
	socket.off("comment-col-chat").on("comment-col-chat", (message: string) => {
		queryClient.invalidateQueries(["chat", collaborationId]);
		// @ts-ignore
		if (commentViewportRef && commentViewportRef.current)
			// @ts-ignore
			console.log(commentViewportRef.current.scrollHeight);
		// @ts-ignore
		commentViewportRef.current.scrollTo({
			// @ts-ignore
			top: commentViewportRef.current.scrollHeight,
			behavior: "smooth",
		});
		useToast("success", "A comment has been added");
	});

	const addCollaborator = useMutation(
		(collaboratorId: string) =>
			addCollaboratorToProject(
				currentUser.uid,
				collaborationId as string,
				collaboratorId
			),
		{
			onSuccess: () => {
				queryClient.invalidateQueries(["collaboration", collaborationId]);
			},
		}
	);
	const addComment = useMutation(
		() =>
			commentOnChat(collaborationId as string, {
				content: comment,
				user: currentUser.uid,
				date: new Date(),
				uid: uuidv4(),
			}),
		{
			onSuccess: () => {
				queryClient.invalidateQueries(["chat", collaborationId]);
				socket.emit("comment-col-chat", collaborationId);
				setComment("");
			},
		}
	);

	const openChapter = (chapterId: string) => {
		navigate(
			`/dashboard/collaboration/${collaborationId}/chapter/${chapterId}`
		);
	};
	const openChapterModal = (chapterId: string) => {
		setChapterId(chapterId);
		setDeleteModal(true);
	};
	useEffect(() => {
		if (collaborationId) {
			socket.emit("join-collaboration", collaborationId, (message: string) => {
				useToast("success", message);
			});
		}
	}, [collaborationId]);
	useEffect(() => {
		if (chat && commentViewportRef && commentViewportRef.current) {
			// @ts-ignore
			commentViewportRef.current.scrollTo({
				// @ts-ignore
				top: commentViewportRef.current.scrollHeight,
				behavior: "smooth",
			});
		}
	}, [chat]);

	if (isLoading)
		return (
			<div className="w-full h-full grid place-items-center">
				<Loading isLoading={true}> </Loading>
			</div>
		);
	return (
		<>
			<InviteUserDrawer opened={opened} setOpened={setOpened}>
				<CollaboratorsList collaborators={collaboration?.collaborators} />
				<Button
					variant="default"
					onClick={() => setModalOpen(true)}
					className="flex ml-auto"
					leftIcon={<IconAffiliate size={14} />}
					disabled={collaboration?.owner !== currentUser.uid}
				>
					Invite Collaborator
				</Button>
			</InviteUserDrawer>
			<DeleteModal
				opened={deleteModal}
				setOpened={setDeleteModal}
				deleteBranch={deleteChapter.mutate}
				type="Chapter"
			/>
			<InviteUserModal
				opened={modalOpen}
				setOpened={setModalOpen}
				users={allUsers}
				addProjectCollaborator={addCollaborator}
			/>
			<BaseProjectView project={collaboration} openModal={() => {}}>
				<CollaborationToolbar setOpened={setOpened} />
				{!chapters || chapters.length == 0 ? (
					<NoChapters createNewChapter={createNewChapter} />
				) : (
					<ChapterWrapper
						createNewChapter={createNewChapter}
						chapterCount={chapters?.length}
					>
						<Tabs
							className="w-full"
							color="grape"
							defaultValue="home"
							orientation="vertical"
							variant="outline"
						>
							<Tabs.List>
								<Tabs.Tab value="home">Home</Tabs.Tab>
								<Tabs.Tab value="world-info">World</Tabs.Tab>
								<Tabs.Tab value="settings">Settings</Tabs.Tab>
							</Tabs.List>

							<Tabs.Panel value="home">
								<div className="flex flex-wrap">
									<ChapterRenderer>
										{chapters?.map((chapter: IChapter, index: number) => (
											<Chapter
												openChapter={() => openChapter(chapter.uid)}
												key={index}
												chapter={chapter}
												openChapterModal={() => openChapterModal(chapter.uid)}
												disabled={chapter.owner !== currentUser.uid}
											/>
										))}
									</ChapterRenderer>
									<ProjectDescription project={collaboration} />
									<Loading isLoading={chat ? false : true}>
										<CollaborationChat
											commentViewportRef={commentViewportRef}
											setComment={setComment}
											comment={comment}
											sendComment={addComment.mutate}
											comments={chat?.comments}
										/>
									</Loading>
								</div>
							</Tabs.Panel>

							<Tabs.Panel value="world-info">
								<CharacterWrapper> - Protagonist </CharacterWrapper>
							</Tabs.Panel>

							<Tabs.Panel value="settings">Settings tab content</Tabs.Panel>
						</Tabs>
					</ChapterWrapper>
				)}
			</BaseProjectView>
		</>
	);
};
