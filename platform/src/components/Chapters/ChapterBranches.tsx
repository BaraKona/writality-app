import { FC, SetStateAction } from "react";
import { useTimeFromNow } from "../../hooks/useTimeFromNow";
import {
  VscGitPullRequestCreate,
  VscGitMerge,
  VscInfo,
  VscGitPullRequestClosed,
} from "react-icons/vsc";
import { IChapterVersion } from "../../interfaces/IChapterVersion";

import { IChapterContent } from "../../interfaces/IChapterContent";
import { ScrollArea } from "@mantine/core";
export const ChapterBranches: FC<{
  openMergeModal: () => void;
  setSearchParams: (params: any) => void;
  chapterBranches: IChapterVersion[];
  mainContent: IChapterContent;
  currentBranch: IChapterContent;
  checkoutMain: any;
  openDeleteBranch: React.Dispatch<SetStateAction<boolean>>;
}> = ({
  openMergeModal,
  chapterBranches,
  setSearchParams,
  mainContent,
  currentBranch,
  checkoutMain,
  openDeleteBranch,
}) => {
  if (!chapterBranches) {
    return null;
  }
  return (
    <div className="min-w-auto max-w-md">
      {chapterBranches?.length > 0 ? (
        <div className="border border-baseLight  hover:bg-base p-5">
          <h3 className="text-lg flex font-bold gap-2">
            Branches <VscInfo size={18} className="cursor-pointer my-auto" />
          </h3>
          <div className="flex justify-between gap-2 border-b border-stone-700">
            <div className="flex gap-1 transition-all ease-in-out duration-200">
              <button
                className={`hover:text-orange-200 ${
                  currentBranch?.uid === mainContent?.uid
                    ? "text-blue-300"
                    : "text-stone-300"
                }`}
                onClick={checkoutMain}
              >
                <VscGitPullRequestCreate size={18} />
              </button>
              <p className="text-purple-300 font-semibold">main</p>
            </div>
            {/* <p>{useTimeFromNow(chapter.createdAt)}</p> */}
          </div>
          <ScrollArea.Autosize
            maxHeight={128}
            offsetScrollbars
            scrollbarSize={6}
          >
            {chapterBranches?.map((branch: any) => (
              <div
                key={branch.uid}
                className="flex justify-between gap-2 border-b border-stone-700"
              >
                <div className="flex gap-1 transition-all ease-in-out duration-200">
                  <button
                    className={`hover:text-orange-200 ${
                      branch.uid === currentBranch?.uid
                        ? "text-blue-300"
                        : "text-stone-300"
                    }`}
                    onClick={() => setSearchParams({ branch: branch.uid })}
                  >
                    <VscGitPullRequestCreate size={18} />
                  </button>
                  {branch.uid === currentBranch?.uid ? (
                    <div className="mt-1 flex">
                      <button
                        onClick={openMergeModal}
                        className="flex gap-1 hover:text-green-300"
                      >
                        <VscGitMerge size={18} />
                      </button>
                      <button
                        onClick={() => openDeleteBranch(true)}
                        className="flex text-red-400"
                      >
                        <VscGitPullRequestClosed size={18} />
                      </button>
                    </div>
                  ) : (
                    ""
                  )}
                  <p className="text-purple-300 font-semibold">
                    {branch.name ? branch.name : "Branch"}:
                  </p>
                </div>
                <p>{useTimeFromNow(branch.dateCreated.date)}</p>
              </div>
            ))}
          </ScrollArea.Autosize>
        </div>
      ) : (
        <p className=" flex gap-2 text-center align-middle text-xs">
          <button className="text-stone-300">
            <VscGitMerge size={18} />
          </button>
          You do not have any branches for this chapter
        </p>
      )}
    </div>
  );
};
