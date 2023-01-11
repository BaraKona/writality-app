import { FC, useEffect, useState } from "react";
import { Editor, EditorWrapper } from "../../../components/Editor";
import { useNavigate, useParams } from "react-router-dom";
import {
  getSingleCollabChapter,
  updateCollabChapterContent,
} from "../../../api/collaboration/collabChapters";
import {
  getAllCollabChapterVersions,
  createCollabVersion,
  deleteSingleCollabChapterVersion,
} from "../../../api/collaboration/collabVersions";
import {
  getAllCollabBranches,
  createCollabBranch,
  getSingleCollabBranch,
  updateCollabBranch,
  deleteCollabBranch,
} from "../../../api/collaboration/collabBranches";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  ChapterBranches,
  ChapterVersions,
  ChapterHistory,
} from "../../../components/Chapters";
import {
  versionCreator,
  branchCreator,
  useToast,
  useUpdateChapter,
} from "../../../hooks";
import { useAuthContext } from "../../../contexts/AuthContext";
import {
  CreateBranchModal,
  DeleteModal,
  MergeBranchModal,
  VersionModal,
} from "../../../components/Modals";
import { useSearchParams } from "react-router-dom";

export const CollaborationChapter: FC<{ socket: any }> = ({ socket }) => {
  const [mergeOpened, setMergeOpened] = useState(false);
  const [versionModalOpen, setVersionModalOpen] = useState(false);
  const [branchName, setBranchName] = useState("");
  const [opened, setOpened] = useState(false);
  const [version, setVersion] = useState({} as any);
  const [updateContentModalOpen, setUpdateContentModalOpen] = useState(false);
  const [position, setPosition] = useState<string | null>(null);
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

  const { data: branch, isSuccess: branchSuccess } = useQuery(
    ["branch", branchId as string],
    () => getSingleCollabBranch(chapterId as string, branchId as string),
    { enabled: !!chapter && !!branchId }
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
      setOpened(false);
    },
  });

  const deleteBranch = useMutation(
    () => deleteCollabBranch(chapterId as string, branchId as string),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["branches", chapterId]),
          socket.emit("delete-col-branch", chapterId, branch.name);
        setOpenDeleteBranch(false);
      },
    }
  );

  const deleteVersion = useMutation(
    () => deleteSingleCollabChapterVersion(chapterId as string, version.uid),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["versions", chapterId]),
          socket.emit("delete-col-version", chapterId, version.uid);
        setVersionModalOpen(false);
      },
    }
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
  socket.off("delete-col-branch").on("delete-col-branch", (name: string) => {
    queryClient.invalidateQueries(["branches", chapterId]);
    useToast("success", `[Branch] ${name} deleted`);
  });
  socket
    .off("delete-col-version")
    .on("delete-col-version", (deletedVersion: string) => {
      queryClient.invalidateQueries(["versions", chapterId]);
      useToast("success", "Version deleted");

      if (deletedVersion === version.uid) {
        setVersionModalOpen(false);
        alert("This version has been deleted");
      }
    });

  const updateChapterContentMutation = useMutation(
    () =>
      updateCollabChapterContent(
        collaborationId as string,
        chapterId as string,
        useUpdateChapter(chapter, text, currentUser.uid)
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
      <DeleteModal
        setOpened={setOpenDeleteBranch}
        opened={openDeleteBranch}
        deleteBranch={deleteBranch.mutate}
        type="branch"
      />
      <VersionModal
        setOpened={setVersionModalOpen}
        opened={versionModalOpen}
        deleteVersion={deleteVersion.mutate}
        version={version}
        currentContent={branch || chapter?.content}
        setText={setText}
      />
      <MergeBranchModal
        setMergeOpened={setMergeOpened}
        mergeOpened={mergeOpened}
        replaceMain={() => {}}
        mergeBranch={() => {}}
        setPosition={setPosition}
        position={position || ""}
        currentBranch={branch}
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
        <div className="w-[350px] flex flex-col gap-5 border-l border-baseBorder px-5">
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
          <ChapterVersions
            openMergeModal={() => setMergeOpened(true)}
            chapterVersions={versions}
            setOpen={setVersionModalOpen}
            setVersion={setVersion}
          />
          <ChapterHistory history={chapter?.history} />
        </div>
      </EditorWrapper>
    </>
  );
};
