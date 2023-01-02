import { BaseProjectView } from "../../components/Project";
import { v4 as uuidv4 } from "uuid";
import { NoChapters, Chapter, ChapterWrapper } from "../../components/Chapters";
import { useAuthContext } from "../../contexts/AuthContext";
import { IChapter } from "../../interfaces/IChapter";
import { CharacterWrapper } from "../../components/Characters/CharacterWrapper";
import { Loading } from "../../components/Loading";
import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  getProjectChapters,
  createChapter,
  deleteSingleChapter,
} from "../../api/chapters";
import { DeleteModal } from "../../components/Modals";
import { getSingleProject, deleteSingleProject } from "../../api/projects";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

export function Project() {
  const queryClient = useQueryClient();
  const { currentUser } = useAuthContext();
  const { project } = useParams();
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteProject, setOpenDeleteProject] = useState(false);
  const [chapterId, setChapterId] = useState("");
  const navigate = useNavigate();

  const { data: currentProject } = useQuery(
    ["project", project],
    () => getSingleProject(currentUser.uid, project as string),
    { enabled: !!project && !!currentUser.uid }
  );
  const { data: chapters, isLoading } = useQuery(
    ["chapters", project],
    () => getProjectChapters(currentUser.uid, project as string),
    { enabled: !!currentProject }
  );
  const addChapter = useMutation(createChapter, {
    onSuccess: () => {
      queryClient.invalidateQueries("chapters");
    },
  });
  const deleteProject = useMutation(
    () => deleteSingleProject(currentUser.uid, project as string),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["projects", currentUser.uid]);
        navigate("/dashboard");
      },
    }
  );
  const deleteChapter = useMutation(
    () => deleteSingleChapter(currentUser.uid, project as string, chapterId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("chapters");
        setOpenModal(false);
      },
    }
  );
  const openChapterModal = (chapterId: string) => {
    setChapterId(chapterId);
    setOpenModal(true);
  };
  const createNewChapter = () => {
    const chapterId = uuidv4();
    addChapter.mutate({
      uid: chapterId,
      owner: currentUser.uid,
      projectId: project as string,
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
        projectId: project as string,
        chapterId: chapterId as string,
      },
    });
  };

  const openChapter = (projectId: string, chapterId: string) => {
    navigate(`/dashboard/project/${projectId}/chapter/${chapterId}`);
  };

  return (
    <div className="h-screen w-full">
      <Loading isLoading={isLoading}>
        <BaseProjectView
          project={currentProject}
          openModal={() => setOpenDeleteProject(true)}
        >
          <DeleteModal
            opened={openDeleteProject}
            setOpened={setOpenDeleteProject}
            deleteBranch={deleteProject.mutate}
            type="project"
          />
          <DeleteModal
            opened={openModal}
            setOpened={setOpenModal}
            deleteBranch={deleteChapter.mutate}
            type="chapter"
          />
          {chapters?.length == 0 ? (
            <NoChapters createNewChapter={createNewChapter} />
          ) : (
            <ChapterWrapper
              createNewChapter={createNewChapter}
              chapterCount={chapters?.length}
            >
              <div className="flex-grow overflow-y-auto h-[calc(100vh-140px)]">
                {chapters?.map((chapter: IChapter, index: number) => (
                  <Chapter
                    openChapter={() =>
                      openChapter(chapter.projectId, chapter.uid)
                    }
                    key={index}
                    chapter={chapter}
                    openChapterModal={() => openChapterModal(chapter.uid)}
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
}
