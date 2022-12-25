import React, { useState, useEffect } from "react";
import { Header } from "../../../../../components/Navigation";
import { EditorWrapper, Editor } from "../../../../../components/Editor";
import { useRouter } from "next/router";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { v4 as uuidv4 } from "uuid";
import {
  ChapterBranches,
  ChapterVersions,
} from "../../../../../components/Chapters";
import { CreateBranchModal } from "../../../../../components/Modals/CreateBranchModal";
import {
  getSingleChapter,
  updateChapterContent,
} from "../../../../../api/chapters";
import { useAuthContext } from "../../../../../contexts/AuthContext";
import { Loading } from "../../../../../components/Loading";
import {
  createVersion,
  getAllChapterVersions,
} from "../../../../../api/versions";
import {
  createBranch,
  getAllBranches,
  getSingleBranch,
} from "../../../../../api/branches";
export default function chapter() {
  const router = useRouter();
  const { currentUser } = useAuthContext();
  const [text, setText] = useState("");
  const [opened, setOpened] = useState(false);
  const [branchName, setBranchName] = useState("");
  const [mergeOpened, setMergeOpened] = useState(false);
  const backButton = () => {
    router.push(`/dashboard/project/${project}`);
  };
  const queryClient = useQueryClient();
  const { chapter, project, branch } = router.query;
  const branchId = branch?.toString().split("=")[0];
  const enabled = branchId ? true : false;
  const {
    data: chapterContent,
    isLoading,
    isSuccess,
  } = useQuery(["chapter", chapter], () =>
    getSingleChapter(currentUser.uid, project as string, chapter as string)
  );
  const { data: chapterVersions } = useQuery(
    ["chapterVersions", chapter as string],
    () => getAllChapterVersions(chapter as string)
  );
  const { data: chapterBranches } = useQuery(
    ["chapterBranches", chapter as string],
    () => getAllBranches(chapter as string)
  );
  const { data: currentBranch } = useQuery(
    "currentBranch",
    () => getSingleBranch(chapter as string, branchId as string),
    { enabled }
  );

  const createBranchMutation = useMutation(createBranch, {
    onSuccess: () => {
      queryClient.invalidateQueries(["chapterBranches", chapter as string]);
      setOpened(false);
    },
  });

  const createChapterVersion = useMutation(createVersion, {
    onSuccess: () => {
      queryClient.invalidateQueries(["chapterVersions", chapter as string]);
    },
  });

  const updateChapterContentMutation = useMutation(
    () =>
      updateChapterContent(
        currentUser.uid,
        project as string,
        chapter as string,
        {
          ...chapterContent,
          content: {
            ...chapterContent.content,
            content: text,
            dateUpdated: {
              user: currentUser.uid,
              date: new Date(),
            },
          },
          dateUpdated: {
            user: currentUser.uid,
            date: new Date(),
          },
        }
      ),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["chapter", chapter as string]);
      },
    }
  );
  useEffect(() => {
    if (isSuccess) {
      setText(chapterContent.content.content);
    }
  }, [chapterContent, isSuccess]);
  return (
    <Loading isLoading={isLoading}>
      <CreateBranchModal
        branchName={branchName}
        setBranchName={setBranchName}
        createBranch={() =>
          createBranchMutation.mutate({
            ...chapterContent.content,
            name: branchName,
            uid: uuidv4(),
            type: "branch",
            dateCreated: {
              user: currentUser.uid,
              date: new Date(),
            },
            dateUpdated: {
              user: currentUser.uid,
              date: new Date(),
            },
            content: text || chapterContent.content.content,
          })
        }
        setOpened={setOpened}
        opened={opened}
      />
      {/* <MergeBranchModal
        setMergeOpened={setMergeOpened}
        mergeOpened={mergeOpened}
        replaceMain={replaceMain}
        mergeBranch={mergeBranch}
      /> */}
      <Header header="Chapter" />
      <EditorWrapper
        backToProject={backButton}
        createVersion={() =>
          createChapterVersion.mutate({
            ...chapterContent.content,
            type: "version",
            name: "version " + (chapterVersions.length + 1),
            uid: uuidv4(),
            dateCreated: {
              user: currentUser.uid,
              date: new Date(),
            },
            dateUpdated: {
              user: currentUser.uid,
              date: new Date(),
            },
            content: text || chapterContent.content.content,
          })
        }
        openBranchModal={() => setOpened(true)}
        save={updateChapterContentMutation.mutate}
        chapter={chapterContent}
      >
        <Editor text={text} setText={setText} chapterContent={chapterContent} />
        <div className="min-w-[350px]  border-l border-baseBorder px-5">
          <ChapterBranches
            openMergeModal={() => setMergeOpened(true)}
            chapterBranches={chapterBranches}
            currentVersion={chapterContent?.content}
          />
          <ChapterVersions
            openMergeModal={() => setMergeOpened(true)}
            chapterVersions={chapterVersions}
          />
        </div>
      </EditorWrapper>
    </Loading>
  );
}
