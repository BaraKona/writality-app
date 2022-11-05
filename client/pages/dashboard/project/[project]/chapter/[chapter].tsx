import React, { FC, useEffect, useState } from "react";
import { Header, Sidebar } from "../../../../../components/Navigation";
import { Editor, EditorWrapper } from "../../../../../components/Editor";
import { useRouter } from "next/router";

import { useDatabaseContext } from "../../../../../contexts/DatabaseContext";
import { useAuthContext } from "../../../../../contexts/AuthContext";
import { IChapterContent } from "../../../../../interfaces/IChapterContent";
import { toast } from "react-hot-toast";

export default function chapter() {
  const router = useRouter();
  const [error, setError] = useState(true);
  // const [loading, setLoading] = useState(false);
  const { currentUser } = useAuthContext();
  const {
    getChapterContent,
    currentChapter,
    createChapter,
    getChaptersByProjectId,
    currentChapterContent,
    setCurrentChapterContent,
  } = useDatabaseContext();
  const backButton = () => {
    router.push(`/dashboard/project/${router.query.project}`);
  };
  const getContent = async () => {
    const projectId = router.asPath.split("/")[3];
    const chapterId = router.asPath.split("/")[5];
    if (projectId && chapterId) {
      try {
        setCurrentChapterContent(await getChapterContent(projectId, chapterId));
        console.log(currentChapterContent);
      } catch (error) {
        toast.error("Chapter content could not be loaded", {
          style: {
            borderRadius: "10px",
            background: "#333350",
            color: "#fff",
          },
        });
        console.log(error);
      }
    }
  };
  useEffect(() => {
    getContent();
  }, [currentChapter, router]);
  return (
    <div className="h-screen">
      <Header header="Chapter" />
      <Sidebar>
        <EditorWrapper backToProject={backButton} chapter={currentChapter}>
          <Editor />
        </EditorWrapper>
      </Sidebar>
    </div>
  );
}
