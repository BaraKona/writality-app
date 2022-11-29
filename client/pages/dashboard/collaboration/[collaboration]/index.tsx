import React, { useState } from "react";
import type { NextPage } from "next";
import { Header, Sidebar } from "../../../../components/Navigation";
import { NoChapters } from "../../../../components/Chapters";
import { InviteUserDrawer } from "../../../../components/Modals/InviteUserDrawer";
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

const Collaboration: NextPage = () => {
  const { getCollaborativeProjectById } = useDatabaseContext();
  const [opened, setOpened] = useState(false);
  const { currentUser, users } = useAuthContext();
  const router = useRouter();
  const [isForm, setIsForm] = useState(false);
  const changeTitle = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsForm(false);
  };
  const collaboration = getCollaborativeProjectById(
    router.query.collaboration,
    currentUser.uid
  );
  const [title, setTitle] = useState(
    collaboration?.projectTitle
      ? collaboration.projectTitle
      : "New Collaboration"
  );
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
              <CollaboratorsList collaborators={[{ email: "hi" }]} />

              <Button
                variant="default"
                onClick={() => setOpened(true)}
                className="flex ml-auto"
              >
                Invite Collaborator
              </Button>
            </InviteUserDrawer>
            <NoChapters createNewChapter={() => {}} />
            {/* {loading ? <Loading /> :  */}
          </BaseProjectView>
        </Loading>
      </Sidebar>
    </div>
  );
};

export default Collaboration;
