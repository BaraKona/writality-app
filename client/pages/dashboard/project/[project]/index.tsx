import React from "react";
import { Header, Sidebar } from "../../../../components/Navigation";
import { BaseProjectView } from "../../../../components/Project";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";
import {
  NoChapters,
  Chapter,
  ChapterWrapper,
} from "../../../../components/Chapters";
import { useAuthContext } from "../../../../contexts/AuthContext";
import { IChapter } from "../../../../interfaces/IChapter";
import { CharacterWrapper } from "../../../../components/Characters/CharacterWrapper";
import { Loading } from "../../../../components/Loading";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getProjectChapters, createChapter } from "../../../../api/chapters";
import { getSingleProject } from "../../../../api/projects";

export default function project() {
  const router = useRouter();
  const { currentUser } = useAuthContext();
  const { project } = router.query;

  if (!project) {
    return <Loading isLoading={true}> </Loading>;
  }
  const queryClient = useQueryClient();

  const { data: chapters } = useQuery(["chapters", project], () =>
    getProjectChapters(currentUser.uid, project as string)
  );
  const { data: currentProject, isLoading } = useQuery(
    ["project", project],
    () => getSingleProject(currentUser.uid, project as string)
  );
  const addChapter = useMutation(createChapter, {
    onSuccess: () => {
      queryClient.invalidateQueries("chapters");
    },
  });

  const createNewChapter = () => {
    addChapter.mutate({
      uid: uuidv4(),
      owner: currentUser.uid,
      projectId: project as string,
      type: "main",
      title: "New Chapter",
      dateCreated: {
        user: currentUser.uid,
        date: new Date(),
      },
    });
  };

  const openChapter = (
    projectId: string,
    chapterId: string,
    chapter: IChapter
  ) => {
    router.push(`/dashboard/project/${projectId}/chapter/${chapterId}`);
  };

  return (
    <div className="h-screen">
      <Header header="Project" />
      <Sidebar>
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
                        openChapter(chapter.projectId, chapter.uid, chapter)
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
      </Sidebar>
    </div>
  );
}
