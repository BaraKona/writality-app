import { FC, useEffect, useState } from "react";
import { Editor, EditorWrapper } from "../../../components/Editor";
import { useNavigate, useParams } from "react-router-dom";
import {
  getSingleCollabChapter,
  createCollabChapter,
} from "../../../api/collaboration/collabChapters";
import {
  getAllCollabChapterVersions,
  createCollabVersion,
} from "../../../api/collaboration/collabVersions";
import {
  getAllCollabBranches,
  createCollabBranch,
} from "../../../api/collaboration/collabBranches";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { ChapterBranches, ChapterVersions } from "../../../components/Chapters";
import { versionCreator, branchCreator } from "../../../utils";
import { useAuthContext } from "../../../contexts/AuthContext";
import { useToast } from "../../../hooks/useToast";
import { CreateBranchModal } from "../../../components/Modals";

export const CollaborationChapter: FC<{ socket: any }> = ({ socket }) => {
  const { chapterId, collaborationId } = useParams();
  const [mergeOpened, setMergeOpened] = useState(false);
  const [versionModalOpen, setVersionModalOpen] = useState(false);
  const [branchName, setBranchName] = useState("");
  const [opened, setOpened] = useState(false);
  const [version, setVersion] = useState({} as any);
  const [updateContentModalOpen, setUpdateContentModalOpen] = useState(false);
  const [openDeleteBranch, setOpenDeleteBranch] = useState(false);
  const [text, setText] = useState("");
  const navigate = useNavigate();

  const { currentUser } = useAuthContext();
  const queryClient = useQueryClient();

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
  socket.on("create-col-branch", () => {
    queryClient.invalidateQueries(["branches", chapterId]);
  });
  socket.on("create-col-version", () => {
    queryClient.invalidateQueries(["versions", chapterId]);
  });

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
        save={() => {}}
        content={chapter?.content}
        title={chapter?.title}
      >
        <Editor
          text={text}
          setOpen={setUpdateContentModalOpen}
          setText={setText}
          chapterContent={chapter?.content}
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
            currentBranch={chapter?.content}
            mainContent={chapter?.content}
            setSearchParams={() => {}}
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
