import { useState } from "react";
import { EditorWrapper } from "../../components/Editor";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useAuthContext } from "../../contexts/AuthContext";
import { CreateBranchModal } from "../../components/Modals/CreateBranchModal";
import { getSingleChapter } from "../../api/project/chapters";
import { deleteSingleChapterVersion } from "../../api/project/versions";
import { useNavigate, useParams } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { getSingleBranch, deleteBranch } from "../../api/project/branches";
import {
  UpdateContentModal,
  DeleteModal,
  VersionModal,
} from "../../components/Modals";
import { useMergeReplace } from "../../hooks/chapter/useMergeReplace";
import { ChapterBranchMenu } from "../../components/Chapters/branch/ChapterBranchMenu";
import { ChapterVersionMenu } from "../../components/Chapters/version/ChapterVersionMenu";
import { ChapterHistoryMenu } from "../../components/Chapters/history/ChapterHistoryMenu";
import { ChapterSidebar } from "../../components/Chapters/ChapterSidebar";
import { ChapterVersionButton } from "../../components/Chapters/version/ChapterVersionButton";
import { ChapterHistoryButton } from "../../components/Chapters/history/ChapterHistoryButton";
import { ChapterBranchButton } from "../../components/Chapters/branch/ChapterBranchButton";
import { useUpdateChapterContent } from "../../hooks/chapter/useUpdateChapterContent";
import { useLocalStorage } from "@mantine/hooks";
import { BlockEditor } from "../../components/Editor/BlockEditor";
import { useCreateChapterBranch } from "../../hooks/chapter/useCreateChapterBranch";
import { MergeBlockEditor } from "../../components/Editor/MergeBlockEditor";
import { useSingleProject } from "../../hooks/projects/useSingleProject";
import { ChapterMergeButton } from "../../components/Chapters/merge/ChapterMergeButton";
import { MergeBranchModal } from "../../components/Chapters/merge/MergeChapterMondal";
import { Divider } from "@mantine/core";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useUpdateBranchContent } from "../../hooks/chapter/useUpdateBranchContent";

export const Chapter = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuthContext();
  const [text, setText] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [opened, setOpened] = useState(false);
  const [branchName, setBranchName] = useState("chapter-v1");
  const [mergeOpened, setMergeOpened] = useState(false);
  const [versionModalOpen, setVersionModalOpen] = useState(false);
  const [UpdateContentModalOpen, setUpdateContentModalOpen] = useState(false);
  const [openDeleteBranch, setOpenDeleteBranch] = useState(false);
  const [version, setVersion] = useState({} as any);
  const [title, setTitle] = useState("");
  const { chapter, project } = useParams();
  const [editorContent, setEditorContent] = useState("");
  const [branchTitle, setBranchTitle] = useState("");
  const [wordCount, setWordCount] = useState(0);

  const [sidebar, setSidebar] = useLocalStorage({
    key: "chapter-sidebar",
    defaultValue: "",
  });

  const queryClient = useQueryClient();
  const branch = searchParams.get("branch");
  const merge = searchParams.get("merge");

  const { data: currentProject, isLoading: projectLoading } = useSingleProject(
    project as string,
  );

  const { data: chapterContent, isLoading } = useQuery(
    ["chapter", chapter],
    () => getSingleChapter(project as string, chapter as string),
    { enabled: !!chapter && !!project && !!currentUser.uid },
  );
  const { data: currentBranch, isSuccess: branchSuccess } = useQuery(
    ["currentBranch", branch as string],
    () => getSingleBranch(chapter as string, branch as string),
    { enabled: !!chapterContent && !!branch },
  );

  const { mutate: createBranchMutation } = useCreateChapterBranch(setOpened);
  const deleteBranchMutation = useMutation(
    () => deleteBranch(chapter as string, branch as string),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["chapterBranches", chapter as string]);
        setOpenDeleteBranch(false);
        navigate(`/project/${project}/chapter/${chapter}`);
      },
    },
  );

  const { mutate: replaceMain } = useMergeReplace(
    project as string,
    chapter as string,
  );

  const { mutate: updateChapterContentMutation } = useUpdateChapterContent(
    project as string,
    chapter as string,
    title || chapterContent?.content.title,
  );

  const { mutate: updateBranchMutation } = useUpdateBranchContent(
    chapter as string,
    branch as string,
    branchTitle || currentBranch?.title,
  );

  const closeSidebar = () => {
    setSidebar("");
  };

  const navigateToMain = () => {
    searchParams.delete("branch");
    searchParams.delete("merge");
    setSearchParams(searchParams);
  };

  const openMerge = (type: string) => {
    searchParams.set("merge", type);
    setSearchParams(searchParams);
  };

  const [parent] = useAutoAnimate();

  return (
    <section className="flex h-full grow rounded-lg ">
      <CreateBranchModal
        branchName={branchName}
        setBranchName={setBranchName}
        createBranch={() =>
          createBranchMutation({
            chapterId: chapter as string,
            name: branchName,
            title: title || chapterContent?.content.title,
            projectId: project as string,
            content: editorContent,
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
                  .text,
              )
            : setText(
                JSON.parse(
                  localStorage.getItem(chapterContent?.content.uid) as string,
                ).text,
              );
          setUpdateContentModalOpen(false);
        }}
      />
      <MergeBranchModal
        opened={mergeOpened}
        setMergeOpened={setMergeOpened}
        currentBranch={currentBranch}
        mergeBranch={
          merge === "replace"
            ? () => replaceMain(currentBranch)
            : () => console.log("ff")
        }
      />
      <VersionModal
        setOpened={setVersionModalOpen}
        opened={versionModalOpen}
        deleteVersion={() =>
          deleteSingleChapterVersion(chapter as string, version.uid)
        }
        version={version}
        currentContent={branch ? currentBranch : chapterContent?.content}
        setText={setText}
      />
      <EditorWrapper
        branchContent={currentBranch}
        mainContent={chapterContent?.content}
      >
        {!merge && (
          <BlockEditor
            key={(chapter as string) + branch}
            /* @ts-ignore */
            save={branch ? updateBranchMutation : updateChapterContentMutation}
            content={
              branch ? currentBranch?.content : chapterContent?.content?.content
            }
            isLoading={isLoading}
            setTitle={branch ? setBranchTitle : setTitle}
            isEditable={Boolean(branch) || currentProject?.type === "standard"}
            setContent={setEditorContent}
            editorContent={editorContent}
            setWordCount={setWordCount}
            wordCount={wordCount}
            createBranch={() => setOpened(true)}
            title={
              branch ? currentBranch?.title : chapterContent?.content.title
            }
          />
        )}
        {merge && currentBranch && (
          <MergeBlockEditor
            branch={currentBranch}
            main={chapterContent.content}
          />
        )}
        <div className="flex flex-row" ref={parent}>
          <ChapterSidebar active={Boolean(sidebar)}>
            <ChapterBranchButton
              setActive={() => setSidebar("branches")}
              active={sidebar === "branches"}
            />
            <ChapterVersionButton
              setActive={() => setSidebar("versions")}
              active={sidebar === "versions"}
            />
            <ChapterHistoryButton
              setActive={() => setSidebar("history")}
              active={sidebar === "history"}
            />
            {merge === "replace" && (
              <>
                <Divider
                  my={2}
                  className="!border-coolGrey-1 dark:!border-borderDark"
                />
                <ChapterMergeButton setOpen={() => setMergeOpened(true)} />
              </>
            )}
          </ChapterSidebar>
          <div className="flex grow" ref={parent}>
            {sidebar === "branches" && (
              <ChapterBranchMenu
                chapterId={chapter as string}
                openMergeModal={openMerge}
                currentBranch={branch ? currentBranch : chapterContent}
                mainContent={chapterContent?.content}
                checkoutMain={() => navigateToMain()}
                openDeleteBranch={setOpenDeleteBranch}
                openBranchModal={() => setOpened(true)}
                close={() => closeSidebar()}
                active={sidebar === "branches"}
              />
            )}
            <ChapterVersionMenu
              setOpen={setVersionModalOpen}
              setVersion={setVersion}
              close={() => closeSidebar()}
              active={sidebar === "versions"}
            />

            <ChapterHistoryMenu
              history={chapterContent?.history}
              close={() => closeSidebar()}
              active={sidebar === "history"}
            />
          </div>
        </div>
      </EditorWrapper>
    </section>
  );
};
