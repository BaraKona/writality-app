import React, { useEffect, useState } from "react";
import type { NextPage } from "next";
import { Header, Sidebar } from "../../../../components/Navigation";
import {
  Chapter,
  ChapterWrapper,
  NoChapters,
} from "../../../../components/Chapters";
import {
  InviteUserDrawer,
  InviteUserModal,
} from "../../../../components/Modals";
import {
  BaseProjectView,
  CollaborationToolbar,
} from "../../../../components/Project";
import { useDatabaseContext } from "../../../../contexts/DatabaseContext";
import { useAuthContext } from "../../../../contexts/AuthContext";
import { useRouter } from "next/router";
import { Loading } from "../../../../components/Loading";
import { Button } from "@mantine/core";
import { CollaboratorsList } from "../../../../components/Collaboration/CollaboratorsList";
import { IconAffiliate } from "@tabler/icons";
import { IProject } from "../../../../interfaces/IProject";
import { CharacterWrapper } from "../../../../components/Characters/CharacterWrapper";
import { IChapter } from "../../../../interfaces/IChapter";
const Collaboration: NextPage = () => {
  const {
    getCollaborativeProjectById,
    addACollaborativeProjectCollaborator,
    projectChapters,
    getASingleCollaborativeProjectByIdForCollaborator,
    getAllCollabChaptersByProjectId,
    createCollabChapter,
    collaboration,
    setCollaboration,
  } = useDatabaseContext();
  const [opened, setOpened] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const { currentUser, users } = useAuthContext();
  const router = useRouter();
  const [isForm, setIsForm] = useState(false);
  const changeTitle = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsForm(false);
  };
  const [title, setTitle] = useState(
    collaboration?.projectTitle
      ? collaboration.projectTitle
      : "New Collaboration"
  );
  const addProjectCollaborator = async (collaboratorId: any) => {
    await addACollaborativeProjectCollaborator(
      router.query.collaboration,
      collaboratorId
    );
  };
  useEffect(() => {
    const getCollaboration = async () => {
      const collaboration = await getCollaborativeProjectById(
        router.query.collaboration,
        currentUser.uid
      );
      if (!collaboration) {
        await getASingleCollaborativeProjectByIdForCollaborator(
          router.query.collaboration,
          currentUser.uid
        );
      }
    };
    getCollaboration();
  }, [router.query.collaboration]);
  useEffect(() => {
    const getChapters = async () => {
      console.log(router.query.collaboration);
      await getAllCollabChaptersByProjectId(router.query.collaboration);
      setLoading(false);
    };
    getChapters();
  }, [collaboration, router.query.collaboration]);
  return (
    <div className="h-screen">
      <Header header="Collaboration" />
      <Sidebar>
        <Loading isLoading={loading}>
          <BaseProjectView
            setIsForm={setIsForm}
            setTitle={setTitle}
            isForm={isForm}
            title={title}
            changeTitle={changeTitle}
            project={collaboration}
          >
            <CollaborationToolbar users={users} setOpened={setOpened} />
            <InviteUserDrawer opened={opened} setOpened={setOpened}>
              <CollaboratorsList collaborators={collaboration?.collaborators} />

              <Button
                variant="default"
                onClick={() => setModalOpen(true)}
                className="flex ml-auto"
                leftIcon={<IconAffiliate size={14} />}
                disabled={collaboration.projectOwner !== currentUser.uid}
              >
                Invite Collaborator
              </Button>
            </InviteUserDrawer>
            <InviteUserModal
              opened={modalOpen}
              setOpened={setModalOpen}
              users={users}
              addProjectCollaborator={addProjectCollaborator}
            />
            {projectChapters?.length == 0 ? (
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
            )}
          </BaseProjectView>
          {/* <NoChapters
              createNewChapter={() =>
                createCollabChapter(router.query.collaboration)
              }
            /> */}
        </Loading>
      </Sidebar>
    </div>
  );
};

export default Collaboration;
