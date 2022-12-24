import React, { FC, useEffect, useState } from "react";
import { Header, Sidebar } from "../../../../../components/Navigation";
import { EditorWrapper } from "../../../../../components/Editor";
import { useRouter } from "next/router";
import { useDatabaseContext } from "../../../../../contexts/DatabaseContext";
import { useToast } from "../../../../../hooks/useToast";
import { useQuery } from "react-query";
import {
  ChapterBranches,
  ChapterVersions,
} from "../../../../../components/Chapters";
import { CreateBranchModal } from "../../../../../components/Modals/CreateBranchModal";
import { MergeBranchModal } from "../../../../../components/Modals/MergeBranchModal";
import { getSingleChapter } from "../../../../../api/chapters";
import { useAuthContext } from "../../../../../contexts/AuthContext";
import { Loading } from "../../../../../components/Loading";
export default function chapter() {
  const router = useRouter();
  const { currentUser } = useAuthContext();
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
    mergeBranchIntoMain,
    mainChapterContent,
  } = useDatabaseContext();
  const backButton = () => {
    router.push(`/dashboard/project/${project}`);
  };
  const { chapter, project } = router.query;

  const { data: chapterContent, isLoading } = useQuery(
    ["chapter", chapter],
    () =>
      getSingleChapter(currentUser.uid, project as string, chapter as string)
  );

  const projectId = router.query.project;
  const chapterId = router.query.chapter;
  // const chapterContent = currentChapterContent;
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

  return (
    <Loading isLoading={isLoading}>
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
      <EditorWrapper
        backToProject={backButton}
        createVersion={createVersion}
        openBranchModal={() => setOpened(true)}
        save={save}
        chapter={chapterContent}
      >
        {/* <Editor text={text} setText={setText} /> */}
        <div className="min-w-[350px]  border-l border-baseBorder px-5">
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
    </Loading>
  );
}
