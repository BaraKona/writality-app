import React, { FC, useEffect, useState } from "react";
import { Header, Sidebar } from "../../../../../components/Navigation";
import { EditorWrapper } from "../../../../../components/Editor";
import { useRouter } from "next/router";
import { useDatabaseContext } from "../../../../../contexts/DatabaseContext";
import { useToast } from "../../../../../hooks/useToast";
import {
  ChapterBranches,
  ChapterVersions,
} from "../../../../../components/Chapters";
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
    setCurrentChapterVersions,
    getChapterVersions,
    setCurrentChapterBranches,
    updateChapterBranch,
    createChapterVersion,
    mergeBranchReplaceMain,
    mainChapterContent,
    mergeBranchIntoMain,
  } = useDatabaseContext();
  const backButton = () => {
    router.push(`/dashboard/project/${router.query.project}`);
  };
  const projectId = router.query.project;
  const chapterId = router.query.chapter;
  const chapterContent = currentChapterContent;
  const contentId = currentChapterContent.uid;
  const save = async () => {
    if (projectId && chapterId && contentId) {
      if (currentChapterContent.type === "branch") {
        const branchId = currentChapterContent.uid;
        await updateChapterBranch(projectId, chapterId, branchId, text);
      } else if (currentChapterContent.type === "main") {
        await updateChapterContent(projectId, chapterId, contentId, text);
      }
    }
  };
  const checkoutBranch = async (branch: any) => {
    setCurrentChapterContent(branch);
  };
  const mergeBranch = async (position: string | null) => {
    if (!position) return;
    if (projectId && chapterId && currentChapterContent) {
      await mergeBranchIntoMain(
        projectId,
        chapterId,
        mainChapterContent.uid,
        currentChapterContent,
        position
      );
      setMergeOpened(false);
    }
  };
  const replaceMain = async () => {
    if (projectId && chapterId && currentChapterContent) {
      await mergeBranchReplaceMain(
        projectId,
        chapterId,
        mainChapterContent.uid,
        currentChapterContent
      );
      setMergeOpened(false);
    }
  };
  const createBranch = async () => {
    if (projectId && chapterId && chapterContent && branchName) {
      try {
        await createChapterBranch(
          projectId,
          chapterId,
          chapterContent,
          branchName
        );
        useToast("success", "Branch created");
        setCurrentChapterBranches(
          await getChapterBranches(projectId, chapterId)
        );
      } catch (err) {
        console.log(err);
      }
    }
  };
  const createVersion = async () => {
    if (projectId && chapterId && chapterContent) {
      try {
        await createChapterVersion(projectId, chapterId, chapterContent);
        useToast("success", "Version created");
      } catch (err) {
        console.log(err);
      }
    }
  };
  const getContent = async () => {
    if (projectId && chapterId) {
      try {
        setCurrentChapterContent(await getChapterContent(projectId, chapterId));
        setCurrentChapterBranches(
          await getChapterBranches(projectId, chapterId)
        );
        setCurrentChapterVersions(
          await getChapterVersions(projectId, chapterId)
        );
        useToast("success", "Chapter content loaded");
      } catch (error) {
        useToast("error", "Chapter content not loaded");
        console.log(error);
      }
    }
  };
  useEffect(() => {
    if (router.query) getContent();
  }, [currentChapter, router.query]);
  useEffect(() => {
    if (currentChapterContent !== text) setText(currentChapterContent.content);
    console.log(currentChapterContent);
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
        replaceMain={replaceMain}
        mergeBranch={mergeBranch}
      />
      <Header header="Chapter" />
      <Sidebar>
        <EditorWrapper
          backToProject={backButton}
          createVersion={createVersion}
          openBranchModal={() => setOpened(true)}
          save={save}
          chapter={currentChapter}
        >
          {/* <Editor text={text} setText={setText} /> */}
          <div className="min-w-[350px] h-[calc(100vh-100px)] border-l border-baseBorder px-5">
            <ChapterBranches
              openMergeModal={() => setMergeOpened(true)}
              checkoutBranch={checkoutBranch}
            />
            <ChapterVersions
              openMergeModal={() => setMergeOpened(true)}
              checkoutBranch={checkoutBranch}
            />
          </div>
        </EditorWrapper>
      </Sidebar>
    </div>
  );
}
