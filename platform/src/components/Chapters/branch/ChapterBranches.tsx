import { FC, SetStateAction } from "react";
import { useTimeFromNow } from "../../../hooks/useTimeFromNow";
import { VscGitPullRequestCreate, VscGitMerge, VscGitPullRequestClosed } from "react-icons/vsc";

import { IChapterContent } from "../../../interfaces/IChapterContent";
import { Divider, ScrollArea, Skeleton, Text } from "@mantine/core";
import { IconGitBranch, IconPlus, IconX } from "@tabler/icons-react";
import { useSearchParams } from "react-router-dom";
import { ButtonWrapper } from "../../buttons/ButtonWrapper";
import { ChapterSidebarWrapper } from "../ChapterSidebarWrapper";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useQuery } from "react-query";
import { getAllBranches } from "../../../api/project/branches";
export const ChapterBranches: FC<{
  openMergeModal: (type: string) => void;
  chapterId: string;
  main: IChapterContent;
  currentBranch: IChapterContent;
  checkoutMain: any;
  openDeleteBranch: React.Dispatch<SetStateAction<boolean>>;
  openBranchModal: () => void;
  close: () => void;
}> = ({
  openMergeModal,
  chapterId,
  main,
  currentBranch,
  checkoutMain,
  openDeleteBranch,
  openBranchModal,
  close,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const merge = searchParams.get("merge");
  const { data: chapterBranches, isLoading } = useQuery(["chapterBranches", chapterId], () =>
    getAllBranches(chapterId as string),
  );
  const [parent] = useAutoAnimate();

  if (isLoading) {
    return (
      <ChapterSidebarWrapper>
        <div className="my-2 flex items-center gap-2 px-2  text-xs font-medium text-coolGrey-7 dark:text-coolGrey-4">
          Branches
          <ButtonWrapper onClick={openBranchModal} className="ml-auto">
            <IconPlus
              size={14}
              className="text-blueTextLight group-hover:text-black dark:hover:text-coolGrey-1"
            />
          </ButtonWrapper>
          <ButtonWrapper onClick={close}>
            <IconX
              size={14}
              className="text-blueTextLight group-hover:text-black dark:hover:text-coolGrey-1"
            />
          </ButtonWrapper>
        </div>
        <Divider className="!border-coolGrey-1 dark:!border-borderDark" />
        <div className="flex flex-col gap-2 p-2">
          <Skeleton height={30} width="100%" />
          <Skeleton height={30} width="100%" />
          <Skeleton height={30} width="100%" />
          <Skeleton height={30} width="100%" />
          <Skeleton height={30} width="100%" />
        </div>
      </ChapterSidebarWrapper>
    );
  }

  return (
    <ChapterSidebarWrapper>
      <div className="my-2 flex items-center gap-2 px-2 text-xs font-medium text-coolGrey-7 dark:text-coolGrey-4">
        Branches
        <ButtonWrapper onClick={openBranchModal} className="ml-auto">
          <IconPlus
            size={14}
            className="text-blueTextLight group-hover:text-black dark:hover:text-coolGrey-1"
          />
        </ButtonWrapper>
        <ButtonWrapper onClick={close}>
          <IconX
            size={14}
            className="text-blueTextLight group-hover:text-black dark:hover:text-coolGrey-1"
          />
        </ButtonWrapper>
      </div>
      <Divider className="!border-coolGrey-1 dark:!border-borderDark" />
      {chapterBranches?.length > 0 ? (
        <div className="my-2 px-1 text-coolGrey-7 dark:text-coolGrey-4" ref={parent}>
          <button
            className="flex w-full items-center justify-between gap-1 rounded-md p-1 px-2 text-xs font-semibold hover:bg-coolGrey-1 dark:hover:bg-hoverDark"
            onClick={checkoutMain}
          >
            <div className="flex items-center gap-1">
              <VscGitPullRequestCreate size={14} />
              <p className="max-w-[9rem] truncate text-xs font-medium text-coolGrey-7 dark:text-coolGrey-4">
                main:
              </p>
            </div>
            <Text size="xs" color="dimmed">
              {useTimeFromNow(main?.dateUpdated?.date)}
            </Text>
          </button>
          <ScrollArea.Autosize
            styles={{
              viewport: {
                maxHeight: "calc(100dvh - 156px)",
              },
            }}
            placeholder={<Skeleton height={30} width="100%" />}
            scrollbarSize={6}
          >
            {chapterBranches?.map((branch: any) => (
              <div key={branch.uid} className="flex flex-col gap-2 py-1" ref={parent}>
                <button
                  className={`flex items-center justify-between rounded-md p-1 px-2 text-xs hover:bg-coolGrey-1 dark:hover:bg-hoverDark ${
                    branch.uid === currentBranch?.uid
                      ? "bg-coolGrey-1 dark:bg-hoverDark"
                      : "text-blueTextLight dark:text-coolGrey-4"
                  }`}
                  onClick={() =>
                    setSearchParams((prev) => {
                      prev.set("branch", branch.uid);
                      return prev;
                    })
                  }
                >
                  <div className="flex gap-1">
                    <div>
                      <VscGitPullRequestCreate size={14} />
                    </div>
                    <p className="max-w-[9rem] truncate text-xs font-medium text-coolGrey-7 dark:text-coolGrey-4">
                      {branch.name ? branch.name : "Branch"}:
                    </p>
                  </div>
                  <Text size="xs" color="dimmed">
                    {useTimeFromNow(branch.dateUpdated.date)}
                  </Text>
                </button>
                {branch.uid === currentBranch?.uid ? (
                  <div className="flex flex-row gap-1 transition-all duration-200 ease-in-out">
                    <div className="ml-3 flex w-full flex-col gap-1 border-l border-border px-1 py-1 dark:border-borderDark">
                      <button
                        onClick={() => openMergeModal("replace")}
                        className={`group flex w-full items-center gap-1 rounded-md border-border p-1 px-2 text-xs font-medium text-coolGrey-7 hover:bg-coolGrey-1 dark:border-borderDark dark:text-coolGrey-4 dark:hover:bg-hoverDark ${
                          merge === "replace" ? "bg-coolGrey-1 dark:bg-hoverDark" : ""
                        }`}
                      >
                        <VscGitMerge size={14} /> Merge branch replace main
                      </button>
                      <button
                        onClick={() => openMergeModal("into")}
                        className={`flex w-full items-center gap-1 rounded-md p-1 px-2 text-xs font-medium text-coolGrey-7 hover:bg-coolGrey-1 dark:text-coolGrey-4 dark:hover:bg-hoverDark ${
                          merge === "into" ? "bg-coolGrey-1 dark:bg-hoverDark" : ""
                        }`}
                      >
                        <VscGitMerge size={14} />
                        Merge branch into main
                      </button>
                      <button
                        onClick={() => openDeleteBranch(true)}
                        className="flex w-full items-center gap-1 rounded-md p-1 px-2 text-xs font-medium text-coolGrey-7 hover:bg-coolGrey-1 dark:text-coolGrey-4 dark:hover:bg-hoverDark"
                      >
                        <VscGitPullRequestClosed size={14} />
                        Delete branch
                      </button>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            ))}
          </ScrollArea.Autosize>
        </div>
      ) : (
        <div className=" flex items-center  gap-2 p-2 text-xs">
          <div className="text-coolGrey-7 dark:text-coolGrey-4">
            <IconGitBranch size={18} />
          </div>
          You do not have any branches for this chapter
        </div>
      )}
    </ChapterSidebarWrapper>
  );
};
