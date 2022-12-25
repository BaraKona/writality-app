import React, { FC, useEffect, useState } from "react";
import { Header, Sidebar } from "../../../../../components/Navigation";
import { EditorWrapper } from "../../../../../components/Editor";
import { useRouter } from "next/router";
import { useDatabaseContext } from "../../../../../contexts/DatabaseContext";
import { useToast } from "../../../../../hooks/useToast";
import {
  useQuery,
  useMutation,
  QueryClient,
  useQueryClient,
} from "react-query";
import { v4 as uuidv4 } from "uuid";
import {
  ChapterBranches,
  ChapterVersions,
} from "../../../../../components/Chapters";
import { CreateBranchModal } from "../../../../../components/Modals/CreateBranchModal";
import { MergeBranchModal } from "../../../../../components/Modals/MergeBranchModal";
import { getSingleChapter } from "../../../../../api/chapters";
import { useAuthContext } from "../../../../../contexts/AuthContext";
import { Loading } from "../../../../../components/Loading";
import { Editor } from "../../../../../components/Editor";
import { useSearchParams } from "next/navigation";
import {
  createVersion,
  getAllChapterVersions,
} from "../../../../../api/versions";
import { createBranch, getAllBranches } from "../../../../../api/branches";
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
  const { chapter, project } = router.query;

  const { data: chapterContent, isLoading } = useQuery(
    ["chapter", chapter],
    () =>
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
  const createBranchMutation = useMutation(createBranch, {
    onSuccess: () => {
      queryClient.invalidateQueries(["chapterBranches", chapter as string]);
    },
  });

  const createChapterVersion = useMutation(createVersion, {
    onSuccess: () => {
      queryClient.invalidateQueries(["chapterVersions", chapter as string]);
    },
  });

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
          })
        }
        openBranchModal={() => setOpened(true)}
        save={() => console.log("save")}
        chapter={chapterContent}
      >
        {/* <Editor text={text} setText={setText} /> */}
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
