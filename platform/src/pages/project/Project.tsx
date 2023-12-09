import { ProjectDescription } from "../../components/Project";
import {
  IconAdjustmentsHorizontal,
  IconMessage,
  IconUsers,
} from "@tabler/icons-react";
import { NoChapters, ChapterRenderer } from "../../components/Chapters";
import { useAuthContext } from "../../contexts/AuthContext";
import { CharacterWrapper } from "../../components/Characters/CharacterWrapper";
import { Loading } from "../../components/Loading";
import { useMutation, useQueryClient } from "react-query";
import { DeleteModal } from "../../components/Modals";
import { updateProjectDescription } from "../../api/project/projects";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Tabs, Tooltip } from "@mantine/core";
import { ProjectSettings } from "../../components/Project/ProjectSettings";
import { useSingleProject } from "../../hooks/projects/useSingleProject";
import { ChatWrapper } from "../../components/Project/chatrooms/ChatWrapper";
import { tooltipStyles } from "../../styles/tooltipStyles";
import { useCreateChapter } from "../../hooks/projects/useCreateChapter";
import { FourOFour } from "../404";
import { ProjectAnalytics } from "../../components/Project/ProjectAnalytics";
import { useProjectBoard } from "../../hooks/projects/useProjectBoard";
import { ProjectHistory } from "../../components/Project/ProjectHistory";
import { useCreateFolder } from "../../hooks/projects/useCreateFolder";
import { useDeleteChapter } from "../../hooks/projects/useDeleteChapter";
import { ProjectChapters } from "../../components/Project/ProjectChapters";
import { DragAndDropWrapper } from "../../components/DragAndDrop/DragAndDropWrapper";
import { useMoveChapterToFolder } from "../../hooks/projects/useMoveChapterToFolder";
import { IProject } from "../../interfaces/IProject";
import { ProjectCollaborators } from "../../components/Project/collaborators/ProjectCollaborators";
import { ProjectBoard } from "../../components/Project/ProjectBoard";
import { ProjectWrapper } from "../../components/Chapters/ProjectWrapper";
import { useSocket } from "../../Providers/SocketProvider";
import { useNestFolder } from "../../hooks/projects/useNestFolder";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useProjectChapters } from "../../hooks/projects/useProjectChapters";

export function Project() {
  const queryClient = useQueryClient();
  const { currentUser } = useAuthContext();
  const { project, projectTab, chapter } = useParams();
  const [openModal, setOpenModal] = useState(false);
  const [chapterId, setChapterId] = useState("");
  const navigate = useNavigate();
  const [parent] = useAutoAnimate();
  const { pusher } = useSocket();

  const { data: currentProject, isLoading } = useSingleProject(
    project as string,
  );
  const { mutate: updateProjectBoard } = useProjectBoard(project as string);
  const { data: projectChapters } = useProjectChapters(project as string, true);

  const { mutateAsync: deleteChapter } = useDeleteChapter(
    project as string,
    chapterId,
    () => setOpenModal(false),
  );

  const updateDescription = useMutation(
    (description: string) =>
      updateProjectDescription(currentUser.uid, project as string, description),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["project", project]);
        queryClient.invalidateQueries("projects");
      },
    },
  );
  const openChapterModal = (chapterId: string) => {
    setChapterId(chapterId);
    setOpenModal(true);
  };

  const { mutate: createNewChapter } = useCreateChapter(project as string);
  const { mutate: createNewFolder } = useCreateFolder(project as string);
  const { mutate: moveChapterIntoFolder } = useMoveChapterToFolder(
    project as string,
  );
  const { mutate: moveFolderIntoFolder } = useNestFolder(project as string);

  function dropIntoFolder({ folderId, id }: { folderId: string; id: string }) {
    if (id.includes("folder")) {
      moveFolderIntoFolder({ parentId: folderId, folderId: id.split("_")[1] });
    }

    if (id.includes("chapter")) {
      moveChapterIntoFolder({ chapterId: id.split("_")[1], folderId });
    }
  }
  const openChapter = (projectId: string, chapterId: string) => {
    navigate(`/project/${projectId}/chapter/${chapterId}`);
  };

  if (currentProject === null) {
    return <FourOFour />;
  }

  const chapterCount =
    currentProject?.chapters.length +
    currentProject?.folders?.reduce(
      (acc: number, folder: IProject["folders"]) => {
        /** @ts-ignore */
        return acc + folder.chapters?.length;
      },
      0,
    );

  useEffect(() => {
    if (!pusher || !currentProject) return;

    pusher.subscribe(`project-${currentProject.uid}`);
    pusher.bind("update", () => {
      queryClient.invalidateQueries(["project", currentProject.uid]);
    });

    return () => {
      if (pusher) {
        pusher.unsubscribe(`project-${currentProject?.uid}`);
        pusher.unbind("update");
      }
    };
  }, [currentProject]);

  return (
    <section className="relative flex w-full gap-2" ref={parent}>
      <DeleteModal
        opened={openModal}
        setOpened={setOpenModal}
        deleteBranch={deleteChapter}
        type="chapter"
      />
      <ProjectWrapper tab={projectTab || "overview"}>
        <Tabs
          className="important:border-none w-full border-none "
          value={projectTab}
          onTabChange={(tab) => navigate(`/project/${project}/${tab}`)}
          defaultValue="overview"
          radius={"md"}
          keepMounted={false}
        >
          <Tabs.List className="flex !items-center !gap-2 !border-none">
            <div className="mr-auto cursor-pointer dark:text-coolGrey-4">
              <h2 className="my-3 mb-5 text-3xl font-semibold">
                {currentProject?.title}
              </h2>
            </div>
            <div className="flex gap-2 rounded-lg bg-coolGrey-1 p-1.5 dark:bg-hoverDark">
              <Tabs.Tab
                className="!rounded-lg !border-none !p-1.5 !px-3 font-semibold !text-coolGrey-6 transition-all duration-300 ease-in-out hover:!bg-coolGrey-7 hover:!text-coolGrey-1 data-[active]:!bg-coolGrey-7 data-[active]:!text-coolGrey-1 dark:!text-coolGrey-4 dark:hover:!bg-purple-800/50 dark:data-[active]:!bg-purple-800 dark:data-[active]:!text-coolGrey-1"
                value="overview"
              >
                Overview
              </Tabs.Tab>

              <Tabs.Tab
                className="!rounded-lg !border-none !p-1.5 !px-3 font-semibold !text-coolGrey-6 transition-all duration-300 ease-in-out hover:!bg-coolGrey-7 hover:!text-coolGrey-1 data-[active]:!bg-coolGrey-7 data-[active]:!text-coolGrey-1 dark:!text-coolGrey-4 dark:hover:!bg-purple-800/50 dark:data-[active]:!bg-purple-800 dark:data-[active]:!text-coolGrey-1"
                value="whiteboard"
              >
                Whiteboard
              </Tabs.Tab>

              <Tabs.Tab
                className="!rounded-lg !border-none !p-1.5 !px-3 font-semibold !text-coolGrey-6 transition-all duration-300 ease-in-out hover:!bg-coolGrey-7 hover:!text-coolGrey-1 data-[active]:!bg-coolGrey-7 data-[active]:!text-coolGrey-1 dark:!text-coolGrey-4 dark:hover:!bg-purple-800/50 dark:data-[active]:!bg-purple-800 dark:data-[active]:!text-coolGrey-1"
                value="world-info"
                disabled
              >
                World
              </Tabs.Tab>

              <Tabs.Tab
                className="!rounded-lg !border-none !p-1.5 !px-3 font-semibold !text-coolGrey-6 transition-all duration-300 ease-in-out hover:!bg-coolGrey-7 hover:!text-coolGrey-1 data-[active]:!bg-coolGrey-7 data-[active]:!text-coolGrey-1 dark:!text-coolGrey-4 dark:hover:!bg-purple-800/50 dark:data-[active]:!bg-purple-800 dark:data-[active]:!text-coolGrey-1"
                value="publish"
                disabled
              >
                Publish
              </Tabs.Tab>
            </div>
            {currentProject?.type === "collaboration" && (
              <>
                <Tooltip
                  label="Chat"
                  position="top"
                  withArrow
                  styles={tooltipStyles}
                >
                  <Tabs.Tab
                    className="!-mt-0.5 !rounded-lg !border-none !bg-coolGrey-1 !p-[9px] !text-coolGrey-6 transition-all duration-300 ease-in-out hover:!bg-coolGrey-7 hover:!text-coolGrey-1 data-[active]:!bg-coolGrey-7 data-[active]:!text-coolGrey-1 dark:!bg-hoverDark dark:!text-coolGrey-4 dark:hover:!bg-purple-800/50 dark:data-[active]:!bg-purple-800 dark:data-[active]:!text-coolGrey-1"
                    value="chat"
                  >
                    <IconMessage size={18} />
                  </Tabs.Tab>
                </Tooltip>
                <Tooltip
                  label="Collaborators"
                  position="top"
                  withArrow
                  styles={tooltipStyles}
                >
                  <Tabs.Tab
                    className="!-mt-0.5 !rounded-lg !border-none !bg-coolGrey-1 !p-[9px] !text-coolGrey-6 transition-all duration-300 ease-in-out hover:!bg-coolGrey-7 hover:!text-coolGrey-1 data-[active]:!bg-coolGrey-7 data-[active]:!text-coolGrey-1 dark:!bg-hoverDark dark:!text-coolGrey-4 dark:hover:!bg-purple-800/50 dark:data-[active]:!bg-purple-800 dark:data-[active]:!text-coolGrey-1"
                    value="collaborators"
                  >
                    <IconUsers size={18} />
                  </Tabs.Tab>
                </Tooltip>
              </>
            )}
            <Tooltip
              label="Settings"
              position="top"
              withArrow
              styles={tooltipStyles}
            >
              <Tabs.Tab
                className="!-mt-0.5 !rounded-lg !border-none !bg-coolGrey-1 !p-[9px] !text-coolGrey-6 transition-all duration-300 ease-in-out hover:!bg-coolGrey-7 hover:!text-coolGrey-1 data-[active]:!bg-coolGrey-7 data-[active]:!text-coolGrey-1 dark:!bg-hoverDark dark:!text-coolGrey-4 dark:hover:!bg-purple-800/50 dark:data-[active]:!bg-purple-800 dark:data-[active]:!text-coolGrey-1"
                value="settings"
              >
                <IconAdjustmentsHorizontal size={18} />
              </Tabs.Tab>
            </Tooltip>
          </Tabs.List>

          <Tabs.Panel value="overview" ref={parent}>
            <div className="mx-auto flex gap-2">
              <div className="grid h-[80vh] grid-cols-9 grid-rows-6 gap-2 gap-y-2">
                <ProjectAnalytics />
                <ChapterRenderer
                  chapterCount={chapterCount}
                  createNewChapter={createNewChapter}
                  createNewFolder={createNewFolder}
                  project={currentProject}
                  isLoading={isLoading}
                >
                  <>
                    {currentProject?.folders?.length === 0 &&
                    currentProject.chapters.length === 0 ? (
                      <NoChapters
                        createNewChapter={createNewChapter}
                        title="Chapters"
                        p1="You have no chapters currently. Chapters make up your project and
											can be collaborated on."
                        p2="Chapters are also versioned so you can always go back to previews
											versions if you decide to scrap your current work."
                      />
                    ) : (
                      <DragAndDropWrapper
                        items={currentProject?.chapters}
                        handleDrop={dropIntoFolder}
                      >
                        <ProjectChapters
                          project={currentProject}
                          chapters={projectChapters}
                          openChapter={openChapter}
                          openChapterModal={openChapterModal}
                          // folderChapters={openedFolderChapters}
                        />
                      </DragAndDropWrapper>
                    )}
                  </>
                </ChapterRenderer>
                <ProjectHistory project={currentProject} />
              </div>

              <div className="max-w-2xl">
                <ProjectDescription
                  project={currentProject}
                  updateDescription={updateDescription.mutate}
                />
              </div>

              {/* {currentProject?.type === "collaboration" ? (
								<ProjectBoard
									project={currentProject}
									updateBoard={updateProjectBoard}
								/>
							) : null} */}
            </div>
          </Tabs.Panel>

          <Tabs.Panel value="world-info" ref={parent}>
            <CharacterWrapper> - Protagonist </CharacterWrapper>
          </Tabs.Panel>

          <Tabs.Panel value="settings" ref={parent}>
            {currentProject ? (
              <ProjectSettings project={currentProject} />
            ) : (
              <Loading isLoading={true} />
            )}
          </Tabs.Panel>
          <Tabs.Panel value="chat" ref={parent}>
            <ChatWrapper />
          </Tabs.Panel>
          <Tabs.Panel value="collaborators" ref={parent}>
            {currentProject ? (
              <ProjectCollaborators project={currentProject} />
            ) : (
              <Loading isLoading={true} />
            )}
          </Tabs.Panel>
          <Tabs.Panel value="whiteboard" ref={parent}>
            <ProjectBoard
              project={currentProject}
              updateBoard={updateProjectBoard}
            />
          </Tabs.Panel>
        </Tabs>
      </ProjectWrapper>
    </section>
  );
}
