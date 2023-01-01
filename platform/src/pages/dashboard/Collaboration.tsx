import React, { useEffect, useState } from "react";
import { Chapter, ChapterWrapper, NoChapters } from "../../components/Chapters";
import { InviteUserDrawer, InviteUserModal } from "../../components/Modals";
import {
  BaseProjectView,
  CollaborationToolbar,
} from "../../components/Project";
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
} from "../../api/collabProjects";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getAllUsers } from "../../api/user";
import { CharacterWrapper } from "../../components/Characters/CharacterWrapper";
import { IChapter } from "../../interfaces/IChapter";
import { useToast } from "../../hooks/useToast";

const socket = io("http://localhost:5000");
socket.on("connect", () => {});

export const Collaboration = () => {
  const [opened, setOpened] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const { collaborationId } = useParams();
  const { currentUser, users } = useAuthContext();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [isForm, setIsForm] = useState(false);

  const { data: collaboration } = useQuery(
    ["collaboration", collaborationId],
    () => getSingleCollabProject(currentUser.uid, collaborationId as string),
    { enabled: !!collaborationId && !!currentUser.uid }
  );
  const { data: allUsers, isLoading } = useQuery("users", getAllUsers, {
    enabled: !!currentUser.uid && !!collaboration,
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
        <BaseProjectView project={collaboration}>
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
          <InviteUserModal
            opened={modalOpen}
            setOpened={setModalOpen}
            users={allUsers}
            addProjectCollaborator={addCollaborator}
          />
          {/* {collaboration?.length == 0 ? (
            <NoChapters createNewChapter={() => console.log("")} />
          ) : (
            <ChapterWrapper
              createNewChapter={() => console.log("")}
              chapterCount={collaboration.length}
            >
              <div className="flex-grow overflow-y-auto h-[calc(100vh-190px)]">
                {collaboration?.map((chapter: IChapter, index: number) => (
                  <Chapter
                    openChapter={() => console.log("open chapter")}
                    key={index}
                    chapter={chapter}
                  />
                ))}
              </div>
              <CharacterWrapper> - Protagonist </CharacterWrapper>
            </ChapterWrapper>
          )} */}
        </BaseProjectView>
        {/* <NoChapters
              createNewChapter={() =>
                createCollabChapter(router.query.collaboration)
              }
            /> */}
      </Loading>
    </div>
  );
};

export default Collaboration;
