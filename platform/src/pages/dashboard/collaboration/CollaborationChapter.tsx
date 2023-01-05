import { FC, useEffect, useState } from "react";
import { Editor, EditorWrapper } from "../../../components/Editor";
import { useNavigate, useParams } from "react-router-dom";
import {
  getSingleCollabChapter,
  createCollabChapter,
  updateCollabChapterContent,
} from "../../../api/collaboration/collabChapters";
import {
  getAllCollabChapterVersions,
  createCollabVersion,
} from "../../../api/collaboration/collabVersions";
import {
  getAllCollabBranches,
  createCollabBranch,
  getSingleCollabBranch,
  updateCollabBranch,
} from "../../../api/collaboration/collabBranches";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { ChapterBranches, ChapterVersions } from "../../../components/Chapters";
import { versionCreator, branchCreator } from "../../../utils";
import { useAuthContext } from "../../../contexts/AuthContext";
import { useToast } from "../../../hooks/useToast";
import { CreateBranchModal } from "../../../components/Modals";
import { useSearchParams } from "react-router-dom";

export const CollaborationChapter: FC<{ socket: any }> = ({ socket }) => {
  const [mergeOpened, setMergeOpened] = useState(false);
  const [versionModalOpen, setVersionModalOpen] = useState(false);
  const [branchName, setBranchName] = useState("");
  const [opened, setOpened] = useState(false);
  const [version, setVersion] = useState({} as any);
  const [updateContentModalOpen, setUpdateContentModalOpen] = useState(false);
  const [openDeleteBranch, setOpenDeleteBranch] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [text, setText] = useState("");

  const navigate = useNavigate();
  const { chapterId, collaborationId } = useParams();
  const { currentUser } = useAuthContext();
  const queryClient = useQueryClient();
  const branchId = searchParams.get("branch");

  const { data: chapter } = useQuery(
    ["chapter", chapterId],
    () =>
      getSingleCollabChapter(collaborationId as string, chapterId as string),
    { enabled: !!collaborationId }
  );

  const { data: versions } = useQuery(
    ["versions", chapterId],
    () => getAllCollabChapterVersions(chapterId as string),
    { enabled: !!collaborationId }
  );

  const { data: branches } = useQuery(
    ["branches", chapterId],
    () => getAllCollabBranches(chapterId as string),
    { enabled: !!collaborationId }
  );

  const createVersion = useMutation((data: any) => createCollabVersion(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(["versions", chapterId]),
        socket.emit("create-col-version", chapterId);
    },
  });

  const createBranch = useMutation((data: any) => createCollabBranch(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(["branches", chapterId]),
        socket.emit("create-col-branch", chapterId);
    },
  });

  const { data: branch, isSuccess: branchSuccess } = useQuery(
    ["branch", branchId as string],
    () => getSingleCollabBranch(chapterId as string, branchId as string),
    { enabled: !!chapter && !!branchId }
  );

  socket.off("create-col-branch").on("create-col-branch", () => {
    queryClient.invalidateQueries(["branches", chapterId]);
    useToast("success", "New Branch created");
  });
  socket.off("create-col-version").on("create-col-version", () => {
    queryClient.invalidateQueries(["versions", chapterId]);
    useToast("success", "New Version created");
  });
  socket.off("update-col-branch").on("update-col-branch", (name: string) => {
    console.log("update");
    useToast("success", `[Branch] ${name} updated`);
  });
  const updateChapterContentMutation = useMutation(
    () =>
      updateCollabChapterContent(
        collaborationId as string,
        chapterId as string,
        {
          ...chapter,
          content: {
            ...chapter.content,
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
        queryClient.invalidateQueries(["chapter", chapterId]);
      },
    }
  );
  const updateBranchMutation = useMutation(
    () =>
      updateCollabBranch(chapterId as string, branchId as string, {
        ...branch,
        content: text,
        dateUpdated: {
          user: currentUser.uid,
          date: new Date(),
        },
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["branch", branchId]);
      },
      onSettled: () => {
        socket.emit("update-col-branch", chapterId, branch.name);
      },
    }
  );

  useEffect(() => {
    if (collaborationId) {
      socket.emit("join-chapter", chapterId);
    }
  }, [collaborationId]);

  return (
    <>
      <CreateBranchModal
        branchName={branchName}
        setBranchName={setBranchName}
        createBranch={() =>
          createBranch.mutate(
            branchCreator(chapter, branchName, currentUser.uid, text)
          )
        }
        setOpened={setOpened}
        opened={opened}
      />
      <EditorWrapper
        backToProject={() =>
          navigate(`/dashboard/collaboration/${collaborationId}`)
        }
        createVersion={() =>
          createVersion.mutate(
            versionCreator(chapter, currentUser.uid, versions, text)
          )
        }
        openBranchModal={() => setOpened(true)}
        save={
          branch
            ? updateBranchMutation.mutate
            : updateChapterContentMutation.mutate
        }
        content={branch || chapter?.content}
        title={chapter?.title}
      >
        <Editor
          text={text}
          setOpen={setUpdateContentModalOpen}
          setText={setText}
          chapterContent={branch || chapter?.content}
        />
        <div className="min-w-[350px]  border-l border-baseBorder px-5">
          <ChapterVersions
            openMergeModal={() => setMergeOpened(true)}
            chapterVersions={versions}
            setOpen={setVersionModalOpen}
            setVersion={setVersion}
          />
          <ChapterBranches
            openMergeModal={() => setMergeOpened(true)}
            chapterBranches={branches}
            currentBranch={branch || chapter?.content}
            mainContent={chapter?.content}
            setSearchParams={setSearchParams}
            checkoutMain={() =>
              navigate(
                `/dashboard/collaboration/${collaborationId}/chapter/${chapterId}`
              )
            }
            openDeleteBranch={setOpenDeleteBranch}
          />
        </div>
      </EditorWrapper>
    </>
  );
};
