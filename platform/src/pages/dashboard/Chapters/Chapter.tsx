import React, { useState, useEffect } from "react";
import { EditorWrapper, Editor } from "../../../components/Editor";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { v4 as uuidv4 } from "uuid";
import { useAuthContext } from "../../../contexts/AuthContext";
import { Loading } from "../../../components/Loading";
import { CreateBranchModal } from "../../../components/Modals/CreateBranchModal";
import { ChapterBranches, ChapterVersions } from "../../../components/Chapters";
import { getSingleChapter, updateChapterContent } from "../../../api/chapters";
import {
  createVersion,
  getAllChapterVersions,
  deleteSingleChapterVersion,
} from "../../../api/versions";
import { useNavigate, useParams } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import {
  createBranch,
  getAllBranches,
  getSingleBranch,
  updateBranch,
  deleteBranch,
} from "../../../api/branches";
import {
  MergeBranchModal,
  UpdateContentModal,
  DeleteModal,
  VersionModal,
} from "../../../components/Modals";

export const Chapter = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuthContext();
  const [text, setText] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [opened, setOpened] = useState(false);
  const [branchName, setBranchName] = useState("");
  const [mergeOpened, setMergeOpened] = useState(false);
  const [versionModalOpen, setVersionModalOpen] = useState(false);
  const [UpdateContentModalOpen, setUpdateContentModalOpen] = useState(false);
  const [openDeleteBranch, setOpenDeleteBranch] = useState(false);
  const [version, setVersion] = useState({} as any);
  const { chapter, project } = useParams();

  const queryClient = useQueryClient();
  const branch = searchParams.get("branch");

  const backButton = () => {
    navigate(`/dashboard/project/${project}`);
  };
  const {
    data: chapterContent,
    isLoading,
    isSuccess,
    isFetched,
  } = useQuery(
    ["chapter", chapter],
    () =>
      getSingleChapter(currentUser.uid, project as string, chapter as string),
    { enabled: !!chapter && !!project && !!currentUser.uid }
  );
  const { data: chapterVersions } = useQuery(
    ["chapterVersions", chapter as string],
    () => getAllChapterVersions(chapter as string),
    { enabled: !!chapterContent }
  );
  const { data: chapterBranches } = useQuery(
    ["chapterBranches", chapter as string],
    () => getAllBranches(chapter as string),
    { enabled: !!chapterContent }
  );
  const { data: currentBranch, isSuccess: branchSuccess } = useQuery(
    ["currentBranch", branch as string],
    () => getSingleBranch(chapter as string, branch as string),
    { enabled: !!chapterContent && !!branch }
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
  const deleteBranchMutation = useMutation(
    () => deleteBranch(chapter as string, branch as string),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["chapterBranches", chapter as string]);
        setOpenDeleteBranch(false);
        navigate(`/dashboard/project/${project}/chapter/${chapter}`);
      },
    }
  );
  const deleteChapterVersionMutation = useMutation(
    () => deleteSingleChapterVersion(chapter as string, version.uid),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["chapterVersions", chapter as string]);
        setVersionModalOpen(false);
      },
    }
  );

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
  const updateBranchMutation = useMutation(
    () =>
      updateBranch(chapter as string, branch as string, {
        ...currentBranch,
        content: text,
        dateUpdated: {
          user: currentUser.uid,
          date: new Date(),
        },
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["currentBranch", branch as string]);
      },
    }
  );

  if (isLoading)
    return (
      <div className="w-full h-full grid place-items-center">
        <Loading isLoading={true}> </Loading>
      </div>
    );

  if (isFetched && !chapterContent)
    return (
      <div className="w-full h-full grid place-items-center">
        <Loading isLoading={true}> </Loading>
      </div>
    );

  if (!chapterContent)
    return (
      <div className="w-full h-full grid place-items-center">
        <Loading isLoading={true}> </Loading>
      </div>
    );
  if (branch && !currentBranch)
    return (
      <div className="w-full h-full grid place-items-center">
        <Loading isLoading={true}> </Loading>
      </div>
    );

  return (
    <>
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
      <DeleteModal
        setOpened={setOpenDeleteBranch}
        opened={openDeleteBranch}
        deleteBranch={deleteBranchMutation.mutate}
        type="branch"
      />
      <UpdateContentModal
        setOpened={setUpdateContentModalOpen}
        opened={UpdateContentModalOpen}
        setText={() => {
          currentBranch
            ? setText(
                JSON.parse(localStorage.getItem(currentBranch?.uid) as string)
                  .text
              )
            : setText(
                JSON.parse(
                  localStorage.getItem(chapterContent?.content.uid) as string
                ).text
              );
          setUpdateContentModalOpen(false);
        }}
      />
      <MergeBranchModal
        setMergeOpened={setMergeOpened}
        mergeOpened={mergeOpened}
        replaceMain={() => {}}
        mergeBranch={() => {}}
        currentBranch={currentBranch}
      />
      <VersionModal
        setOpened={setVersionModalOpen}
        opened={versionModalOpen}
        deleteVersion={deleteChapterVersionMutation.mutate}
        version={version}
        currentContent={branch ? currentBranch : chapterContent.content}
        setText={setText}
      />
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
        save={
          currentBranch
            ? updateBranchMutation.mutate
            : updateChapterContentMutation.mutate
        }
        content={currentBranch ? currentBranch : chapterContent.content}
        title={chapterContent.title}
      >
        <Editor
          text={text}
          setOpen={setUpdateContentModalOpen}
          setText={setText}
          chapterContent={
            currentBranch ? currentBranch : chapterContent.content
          }
        />
        <div className="min-w-[350px]  border-l border-baseBorder px-5">
          <ChapterBranches
            openMergeModal={() => setMergeOpened(true)}
            chapterBranches={chapterBranches}
            currentBranch={
              currentBranch ? currentBranch : chapterContent.content
            }
            mainContent={chapterContent?.content}
            setSearchParams={setSearchParams}
            checkoutMain={() =>
              navigate(`/dashboard/project/${project}/chapter/${chapter}`)
            }
            openDeleteBranch={setOpenDeleteBranch}
          />
          <ChapterVersions
            openMergeModal={() => setMergeOpened(true)}
            chapterVersions={chapterVersions}
            setOpen={setVersionModalOpen}
            setVersion={setVersion}
          />
        </div>
      </EditorWrapper>
    </>
  );
};
