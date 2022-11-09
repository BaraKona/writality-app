import React, { FC, useEffect, useState } from "react";
import { Header, Sidebar } from "../../../../../components/Navigation";
import { Editor, EditorWrapper } from "../../../../../components/Editor";
import { useRouter } from "next/router";
import { Modal } from "@mantine/core";
import { useDatabaseContext } from "../../../../../contexts/DatabaseContext";
import { ChapterBranches } from "../../../../../components/Chapters";
import { toast } from "react-hot-toast";
import { CreateBranchModal } from "../../../../../components/Modals/CreateBranchModal";
import { MergeBranchModal } from "../../../../../components/Modals/MergeBranchModal";
export default function chapter() {
  const router = useRouter();
  const [text, setText] = useState("");
  const [opened, setOpened] = useState(false);
  const [branchName, setBranchName] = useState("");
  const [mergeOpened, setMergeOpened] = useState(false);
  const {
    getChapterContent,
    currentChapter,
    currentChapterContent,
    setCurrentChapterContent,
    updateChapterContent,
    createChapterBranch,
    getChapterBranches,
    currentChapterBranches,
    setCurrentChapterBranches,
    updateChapterBranch,
    setMainChapterContent,
    mainChapterContent,
  } = useDatabaseContext();
  const backButton = () => {
    console.log("back");
    router.push(`/dashboard/project/${router.query.project}`);
  };
  const save = async () => {
    const projectId = router.query.project;
    const chapterId = router.query.chapter;
    const contentId = currentChapterContent.uid;
    if (projectId && chapterId && contentId) {
      if (currentChapterContent.type === "branch") {
        const branchId = currentChapterContent.uid;
        await updateChapterBranch(projectId, chapterId, branchId, text)
          .then(async () => {
            toast.success("Chapter branch content saved", {
              style: {
                borderRadius: "10px",
                background: "#333",
                color: "#fff",
              },
            });
          })
          .catch((error: any) => {
            toast.error("Chapter branch content not saved", {
              style: {
                borderRadius: "10px",
                background: "#333",
                color: "#fff",
              },
            });
          });
      } else if (currentChapterContent.type === "main") {
        await updateChapterContent(projectId, chapterId, contentId, text)
          .then(async () => {
            setCurrentChapterContent(
              await getChapterContent(projectId, chapterId)
            );
            toast.success("Chapter content saved", {
              style: {
                borderRadius: "10px",
                background: "#333",
                color: "#fff",
              },
            });
          })
          .catch((error: any) => {
            console.log(error);
            toast.error("Chapter content not saved", {
              style: {
                borderRadius: "10px",
                background: "#333",
                color: "#fff",
              },
            });
          });
      }
    }
  };
  const checkoutBranch = async (branch: any) => {
    console.log(branch);
    setCurrentChapterContent(branch);
  };
  const mergeBranch = async () => {};
  const createBranch = async () => {
    const projectId = router.query.project;
    const chapterId = router.query.chapter;
    const chapterContent = currentChapterContent;
    if (projectId && chapterId && chapterContent && branchName) {
      try {
        await createChapterBranch(
          projectId,
          chapterId,
          chapterContent,
          branchName
        );
        toast.success("Branch created", {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
        setCurrentChapterBranches(
          await getChapterBranches(projectId, chapterId)
        );
      } catch (err) {
        console.log(err);
      }
    }
  };
  const getContent = async () => {
    console.log(router);
    const projectId = router.query.project;
    const chapterId = router.query.chapter;
    if (projectId && chapterId) {
      try {
        setCurrentChapterContent(await getChapterContent(projectId, chapterId));
        setCurrentChapterBranches(
          await getChapterBranches(projectId, chapterId)
        );
        toast.success("Chapter content loaded", {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
        console.log(setCurrentChapterContent, chapterId, projectId);
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
    if (router.query) getContent();
  }, [currentChapter, router.query]);
  useEffect(() => {
    if (currentChapterContent !== text) setText(currentChapterContent.content);
  }, [currentChapterContent]);
  return (
    <div className="h-screen">
      <CreateBranchModal
        branchName={branchName}
        setBranchName={setBranchName}
        createBranch={createBranch}
        setOpened={setOpened}
        opened={opened}
      />
      <MergeBranchModal
        setMergeOpened={setMergeOpened}
        mergeOpened={mergeOpened}
        mergeBranch={mergeBranch}
      />
      <Header header="Chapter" />
      <Sidebar>
        <EditorWrapper
          backToProject={backButton}
          openBranchModal={() => setOpened(true)}
          save={save}
          chapter={currentChapter}
        >
          <Editor text={text} setText={setText} />
          <ChapterBranches
            openMergeModal={() => setMergeOpened(true)}
            checkoutBranch={checkoutBranch}
          />
        </EditorWrapper>
      </Sidebar>
    </div>
  );
}
