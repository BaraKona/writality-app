import React, { useEffect, useState } from "react";
import { Chapter, ChapterWrapper, NoChapters } from "../../components/Chapters";
import {
  InviteUserDrawer,
  InviteUserModal,
  DeleteModal,
} from "../../components/Modals";
import {
  BaseProjectView,
  CollaborationToolbar,
} from "../../components/Project";
import { v4 as uuidv4 } from "uuid";
import { io } from "socket.io-client";
import { useAuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Loading } from "../../components/Loading";
import { Button } from "@mantine/core";
import { CollaboratorsList } from "../../components/Collaboration/CollaboratorsList";
import { IconAffiliate } from "@tabler/icons";
import { useParams } from "react-router-dom";

import {
  getSingleCollabProject,
  addCollaboratorToProject,
} from "../../api/collaboration/collabProjects";
import {
  getCollabChapters,
  createCollabChapter,
  deleteCollabChapter,
} from "../../api/collaboration/collabChapters";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getAllUsers } from "../../api/user";
import { useToast } from "../../hooks/useToast";
import { CharacterWrapper } from "../../components/Characters/CharacterWrapper";
import { IChapter } from "../../interfaces/IChapter";

const socket = io("http://localhost:5000");
socket.on("connect", () => {});

export const Collaboration = () => {
  const [opened, setOpened] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const { collaborationId } = useParams();
  const { currentUser, users } = useAuthContext();
  const [deleteModal, setDeleteModal] = useState(false);
  const [chapterId, setChapterId] = useState("");

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [isForm, setIsForm] = useState(false);

  const { data: collaboration } = useQuery(
    ["collaboration", collaborationId],
    () => getSingleCollabProject(currentUser.uid, collaborationId as string),
    { enabled: !!collaborationId && !!currentUser.uid }
  );
  const { data: allUsers } = useQuery("users", getAllUsers, {
    enabled: !!currentUser.uid && !!collaboration,
  });
  const addChapter = useMutation(createCollabChapter, {
    onSuccess: () => {
      queryClient.invalidateQueries(["chapters", collaborationId]);
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
        socket.on("delete-col-chapter", (chapterId: string) => {
          queryClient.invalidateQueries(["chapters", collaborationId]);
        });
        setDeleteModal(false);
      },
    }
  );
  const { data: chapters, isLoading } = useQuery(
    ["chapters", collaborationId],
    () => getCollabChapters(collaborationId as string),
    { enabled: !!collaboration }
  );
  const createNewChapter = () => {
    // socket and api call to create new chapter
    socket.emit("create-col-chapter", collaborationId, (message: string) => {
      useToast("success", "Chapter created successfully 😇");
    });
    const chapterId = uuidv4();
    addChapter.mutate({
      uid: chapterId as string,
      owner: currentUser.uid,
      projectId: collaborationId as string,
      type: "main",
      title: "New Chapter",
      dateCreated: {
        user: currentUser.uid,
        date: new Date(),
      },
      dateUpdated: {
        user: currentUser.uid,
        date: new Date(),
      },
      content: {
        uid: uuidv4(),
        type: "main",
        content: "Lets start writing...",
        dateCreated: {
          user: currentUser.uid,
          date: new Date(),
        },
        dateUpdated: {
          user: currentUser.uid,
          date: new Date(),
        },
        projectId: collaborationId as string,
        chapterId: chapterId as string,
      },
    });
  };
  socket.on("create-col-chapter", () => {
    queryClient.invalidateQueries(["chapters", collaborationId]);
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

  if (!collaboration || !allUsers) {
    return (
      <div className="w-full grid place-items-center">
        <Loading isLoading={true}> </Loading>
      </div>
    );
  }
  return (
    <div className="h-screen w-full">
      <Loading isLoading={isLoading}>
        <BaseProjectView project={collaboration} openModal={() => {}}>
          <CollaborationToolbar users={users} setOpened={setOpened} />
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
          {!chapters || chapters.length == 0 ? (
            <NoChapters createNewChapter={createNewChapter} />
          ) : (
            <ChapterWrapper
              createNewChapter={createNewChapter}
              chapterCount={chapters?.length}
            >
              <div className="flex-grow overflow-y-auto h-[calc(100vh-190px)]">
                {chapters?.map((chapter: IChapter, index: number) => (
                  <Chapter
                    openChapter={() => openChapter(chapter.uid)}
                    key={index}
                    chapter={chapter}
                    openChapterModal={() => openChapterModal(chapter.uid)}
                    disabled={chapter.owner !== currentUser.uid}
                  />
                ))}
              </div>
              <CharacterWrapper> - Protagonist </CharacterWrapper>
            </ChapterWrapper>
          )}
        </BaseProjectView>
      </Loading>
    </div>
  );
};
