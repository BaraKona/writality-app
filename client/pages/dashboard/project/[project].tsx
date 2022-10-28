import React, { FC, useEffect, useState } from "react";
import { Header, Sidebar } from "../../../components/Navigation";
import { BaseProjectView } from "../../../components/Project";
import { Editor } from "../../../components/Editor";
import { useRouter } from "next/router";
import {
  NoChapters,
  Chapter,
  ChapterWrapper,
} from "../../../components/Chapters";
import { CreateChapterButton } from "../../../components/buttons";
import { useDatabaseContext } from "../../../contexts/DatabaseContext";
import { useAuthContext } from "../../../contexts/AuthContext";
import { IProject } from "../../../interfaces/Iproject";
import { IChapter } from "../../../interfaces/IChapter";

export default function project() {
  const router = useRouter();
  const [error, setError] = useState(true);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuthContext();
  const { getProjectById, createChapter, getChaptersByProjectId } =
    useDatabaseContext();
  const [project, setProject] = useState<IProject>({} as IProject);
  const [chapters, setChapters] = useState<IChapter[]>([] as IChapter[]);

  const createNewChapter = async () => {
    try {
      const newChapter = await createChapter(project.uid);
      console.log(newChapter);
      setChapters(newChapter);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    async function getProject() {
      if (router?.query.project) {
        try {
          const doc = await getProjectById(
            router.query.project,
            currentUser.uid
          );
          setProject(doc);
          setError(false);
          console.log("doc", doc);
          await getChapters(doc.uid);
        } catch (error: any) {
          console.log(error);
          setError(error.message);
        }
      }
    }
    async function getChapters(id: string) {
      try {
        const chapters: [] = await getChaptersByProjectId(id);
        setChapters(chapters);
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
          <BaseProjectView project={project}>
            {chapters?.length == 0 ? (
              <NoChapters createNewChapter={createNewChapter} />
            ) : (
              <ChapterWrapper>
                {chapters?.map((chapter, index) => (
                  <Chapter key={index} chapter={chapter} />
                ))}
                <CreateChapterButton createNewChapter={createNewChapter} />
              </ChapterWrapper>
            )}
            {/* <Editor /> */}
          </BaseProjectView>
        )}
      </Sidebar>
    </div>
  );
}
