import React, { FC, useEffect, useState } from "react";
import { Header, Sidebar } from "../../../../components/Navigation";
import { BaseProjectView } from "../../../../components/Project";
import { Editor } from "../../../../components/Editor";
import { useRouter } from "next/router";
import {
  NoChapters,
  Chapter,
  ChapterWrapper,
} from "../../../../components/Chapters";
import { useDatabaseContext } from "../../../../contexts/DatabaseContext";
import { useAuthContext } from "../../../../contexts/AuthContext";
import { IChapter } from "../../../../interfaces/IChapter";
import { toast } from "react-hot-toast";
import { CharacterWrapper } from "../../../../components/Characters/CharacterWrapper";
import { Loading } from "../../../../components/Loading";

export default function project() {
  const router = useRouter();
  const [error, setError] = useState(true);
  const [loading, setLoading] = useState(true);
  const [isForm, setIsForm] = useState(false);
  const { currentUser } = useAuthContext();
  const [title, setTitle] = useState("");
  const {
    getProjectById,
    createChapter,
    getChaptersByProjectId,
    currentProject,
    setCurrentProject,
    projectChapters,
    setProjectChapters,
    updateProjectTitle,
    setCurrentChapter,
  } = useDatabaseContext();

  const openChapter = (
    projectId: string,
    chapterId: string,
    chapter: IChapter
  ) => {
    setCurrentChapter(chapter);
    router.push(`/dashboard/project/${projectId}/chapter/${chapterId}`);
  };
  const changeTitle = async (e: any) => {
    e.preventDefault();
    try {
      await updateProjectTitle(currentProject.uid, title);
      toast.success("Title updated successfully", {
        style: {
          borderRadius: "10px",
          background: "#333350",
          color: "#fff",
        },
      });
      setIsForm(false);
      await getProjectById(router.query.project, currentUser.uid);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    console.log(projectChapters);
    async function getProject() {
      await getProjectById(router.query.project, currentUser.uid).then(() => {
        setLoading(false);
      });
    }
    if (!currentProject) {
      getProject();
    }
  }, [router.query.project, currentUser]);

  useEffect(() => {
    const chapters = async () => {
      await getChaptersByProjectId(router.query.project, currentUser.uid);
      setLoading(false);
    };
    setTitle(
      currentProject?.projectTitle ? currentProject.projectTitle : "New Project"
    );
    if (currentProject) chapters();
  }, [currentProject, router.query.project]);

  return (
    <div className="h-screen">
      <Header header="Project" />
      <Sidebar>
        <Loading isLoading={loading}>
          <BaseProjectView
            setIsForm={setIsForm}
            setTitle={setTitle}
            isForm={isForm}
            title={title}
            changeTitle={changeTitle}
            project={currentProject}
          >
            {projectChapters?.length == 0 ? (
              <NoChapters
                createNewChapter={() =>
                  createChapter(router.query.project, currentUser.uid)
                }
              />
            ) : (
              <ChapterWrapper
                createNewChapter={() =>
                  createChapter(router.query.project, currentUser.uid)
                }
                chapterCount={projectChapters?.length}
              >
                <div className="flex-grow overflow-y-auto h-[calc(100vh-140px)]">
                  {projectChapters?.map((chapter: IChapter, index: number) => (
                    <Chapter
                      openChapter={() =>
                        openChapter(chapter.projectID, chapter.uid, chapter)
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
