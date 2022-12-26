import { BaseProjectView } from "../../components/Project";
import { v4 as uuidv4 } from "uuid";
import { NoChapters, Chapter, ChapterWrapper } from "../../components/Chapters";
import { useAuthContext } from "../../contexts/AuthContext";
import { IChapter } from "../../interfaces/IChapter";
import { CharacterWrapper } from "../../components/Characters/CharacterWrapper";
import { Loading } from "../../components/Loading";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getProjectChapters, createChapter } from "../../api/chapters";
import { getSingleProject } from "../../api/projects";
import { useParams, useNavigate } from "react-router-dom";

export function Project() {
  const queryClient = useQueryClient();
  const { currentUser } = useAuthContext();
  const { project } = useParams();
  const navigate = useNavigate();
  const { data: currentProject } = useQuery(
    ["project", project],
    () => getSingleProject(currentUser.uid, project as string),
    { enabled: !!project }
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
        <BaseProjectView project={currentProject}>
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
