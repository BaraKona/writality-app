import React, { FC, SetStateAction } from "react";
import { ChapterBranches } from "./ChapterBranches";
import { IChapterContent } from "../../../interfaces/IChapterContent";
import { useQuery } from "react-query";
import { getAllBranches } from "../../../api/project/branches";
export const ChapterBranchMenu: FC<{
  openMergeModal: (type: string) => void;
  chapterId: string;
  currentBranch: IChapterContent;
  mainContent: IChapterContent;
  checkoutMain: () => void;
  openDeleteBranch: React.Dispatch<SetStateAction<boolean>>;
  openBranchModal: () => void;
  close: () => void;
  active: boolean;
}> = ({
  openMergeModal,
  chapterId,
  currentBranch,
  mainContent,
  checkoutMain,
  openDeleteBranch,
  openBranchModal,
  close,
  active,
}) => {
  const { data: chapterBranches, isLoading } = useQuery(
    ["chapterBranches", chapterId],
    () => getAllBranches(chapterId),
  );

  return (
    <div className={`${active ? "flex grow" : " hidden "}`}>
      <ChapterBranches
        isLoading={isLoading}
        openMergeModal={openMergeModal}
        chapterBranches={chapterBranches}
        currentBranch={currentBranch}
        mainContent={mainContent}
        checkoutMain={checkoutMain}
        openDeleteBranch={openDeleteBranch}
        openBranchModal={openBranchModal}
        close={close}
      />
    </div>
  );
};
