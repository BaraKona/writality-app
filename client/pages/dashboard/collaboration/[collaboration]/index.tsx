import React, { useEffect, useState } from "react";
import type { NextPage } from "next";
import { Header, Sidebar } from "../../../../components/Navigation";
import { NoChapters } from "../../../../components/Chapters";
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
import { CollaboratorsList } from "../../../../components/Project/CollaboratorsList";
import { IconAffiliate } from "@tabler/icons";
import { IProject } from "../../../../interfaces/Iproject";
const Collaboration: NextPage = () => {
  const {
    getCollaborativeProjectById,
    addACollaborativeProjectCollaborator,
    currentProject,
    getASingleCollaborativeProjectByIdForCollaborator,
  } = useDatabaseContext();
  const [opened, setOpened] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [collaboration, setCollaboration] = useState({} as IProject);

  const { currentUser, users } = useAuthContext();
  const router = useRouter();
  const [isForm, setIsForm] = useState(false);
  const changeTitle = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsForm(false);
  };
  // const collaboration = getCollaborativeProjectById(
  //   router.query.collaboration,
  //   currentUser.uid
  // );
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
      setCollaboration(collaboration);
    };
    getCollaboration();
  }, []);
  return (
    <div className="h-screen">
      <Header header="Collaboration" />
      <Sidebar>
        <Loading isLoading={collaboration ? false : true}>
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
            <NoChapters createNewChapter={() => {}} />
            {/* {loading ? <Loading /> :  */}
          </BaseProjectView>
        </Loading>
      </Sidebar>
    </div>
  );
};

export default Collaboration;
