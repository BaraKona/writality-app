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
import { CreateChapterButton } from "../../../../components/buttons";
import { useDatabaseContext } from "../../../../contexts/DatabaseContext";
import { useAuthContext } from "../../../../contexts/AuthContext";
import { IProject } from "../../../../interfaces/Iproject";
import { IChapter } from "../../../../interfaces/IChapter";
import { toast } from "react-hot-toast";
import { CharacterWrapper } from "../../../../components/Characters/CharacterWrapper";

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
  const createNewChapter = async () => {
    const newChapter = createChapter(currentProject.uid);
    if (newChapter) {
      setProjectChapters(await getChaptersByProjectId(currentProject.uid));
      toast.success("Chapter created successfully", {
        style: {
          borderRadius: "10px",
          background: "#333350",
          color: "#fff",
        },
      });
    } else {
      toast.error("Chapter creation failed", {
        style: {
          borderRadius: "10px",
          background: "#333350",
          color: "#fff",
        },
      });
    }
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
      const doc = await getProjectById(router.query.project, currentUser.uid);
      setCurrentProject(doc);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    async function getProject() {
      if (!currentProject || currentProject.uid !== router?.query.project) {
        try {
          const doc = await getProjectById(
            router.query.project,
            currentUser.uid
          );
          setCurrentProject(doc);
          setTitle(doc.projectTitle);
          setError(false);
          console.log("doc", doc);
          await getChapters(doc.uid);
        } catch (error: any) {
          console.log(error);
          setError(error.message);
        }
      } else {
        setLoading(false);
      }
    }
    async function getChapters(id: string) {
      try {
        const chapters: [] = await getChaptersByProjectId(id);
        setProjectChapters(chapters);
        console.log(chapters);
        setLoading(false);
      } catch (error) {
        setError(true);
        console.log(error);
      }
    }
    getProject();
  }, [router, currentUser]);

  return (
    <div className="h-screen">
      <Header header="Project" />
      <Sidebar>
        {loading ? (
          <div>loading</div>
        ) : (
          <BaseProjectView
            setIsForm={setIsForm}
            setTitle={setTitle}
            isForm={isForm}
            title={title}
            changeTitle={changeTitle}
            project={currentProject}
          >
            {projectChapters?.length == 0 ? (
              <NoChapters createNewChapter={createNewChapter} />
            ) : (
              <ChapterWrapper
                createNewChapter={createNewChapter}
                chapterCount={projectChapters.length}
              >
                <div className="flex-grow overflow-y-auto h-[780px]">
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
            {/* <Editor /> */}
          </BaseProjectView>
        )}
      </Sidebar>
    </div>
  );
}
