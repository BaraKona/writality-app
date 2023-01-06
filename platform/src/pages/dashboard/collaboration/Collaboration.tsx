import React, { FC, useEffect, useMemo, useState } from "react";
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
} from "../../../components/Project";
import { useAuthContext } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Loading } from "../../../components/Loading";
import { Button } from "@mantine/core";
import { CollaboratorsList } from "../../../components/Collaboration/CollaboratorsList";
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

  const queryClient = useQueryClient();
  // const socket = useMemo(() => io("http://localhost:5000"), []);
  const navigate = useNavigate();
  const [isForm, setIsForm] = useState(false);

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
  socket
    .off("delete-col-chapter")
    .on("delete-col-chapter", (message: string) => {
      queryClient.invalidateQueries(["chapters", collaborationId]);
      useToast("success", "A chapter has been deleted");
    });
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
    .off("create-col-chapter")
    .on("create-col-chapter", (message: string) => {
      queryClient.invalidateQueries(["chapters", collaborationId]);
      useToast("success", "A chapter has been created");
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

  return (
    <>
      <Loading isLoading={isLoading}>
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
              <CharacterWrapper> - Protagonist </CharacterWrapper>
            </ChapterWrapper>
          )}
        </BaseProjectView>
      </Loading>
    </>
  );
};
