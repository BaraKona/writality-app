import React, { useEffect, useState } from "react";
import { Chapter, ChapterWrapper, NoChapters } from "../../components/Chapters";
import { InviteUserDrawer, InviteUserModal } from "../../components/Modals";
import {
  BaseProjectView,
  CollaborationToolbar,
} from "../../components/Project";

import { useAuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Loading } from "../../components/Loading";
import { Button } from "@mantine/core";
import { CollaboratorsList } from "../../components/Collaboration/CollaboratorsList";
import { IconAffiliate } from "@tabler/icons";
import { useParams } from "react-router-dom";
import { getSingleCollabProject } from "../../api/collabProjects";
import { useQuery, useMutation, useQueryClient } from "react-query";
export const Collaboration = () => {
  const [opened, setOpened] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const { collaborationId } = useParams();
  const { currentUser, users } = useAuthContext();
  const navigate = useNavigate();
  const [isForm, setIsForm] = useState(false);

  const { data: collaboration, isLoading } = useQuery(
    ["collaboration", collaborationId],
    () => getSingleCollabProject(currentUser.uid, collaborationId as string),
    { enabled: !!collaborationId && !!currentUser.uid }
  );

  // if (!collaboration) {
  //   return (
  //     <div className="w-full grid place-items-center">
  //       <Loading isLoading={true}> </Loading>
  //     </div>
  //   );
  // }
  return (
    <div className="h-screen w-full">
      <Loading isLoading={isLoading}>
        <BaseProjectView project={collaboration}>
          <CollaborationToolbar users={users} setOpened={setOpened} />
          <InviteUserDrawer opened={opened} setOpened={setOpened}>
            {/* <CollaboratorsList collaborators={collaboration?.collaborators} /> */}

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
            users={users}
            addProjectCollaborator={() => {}}
          />
          {/* {projectChapters?.length == 0 ? (
            <NoChapters
              createNewChapter={() =>
                createCollabChapter(router.query.collaboration)
              }
            />
          ) : (
            <ChapterWrapper
              createNewChapter={() =>
                createCollabChapter(router.query.collaboration)
              }
              chapterCount={projectChapters.length}
            >
              <div className="flex-grow overflow-y-auto h-[calc(100vh-190px)]">
                {projectChapters?.map((chapter: IChapter, index: number) => (
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
