import { FC } from "react";
import { convertDate } from "../../scripts/convertDate";
import { VscGitPullRequestCreate, VscGitMerge, VscInfo } from "react-icons/vsc";
import { IChapterVersion } from "../../interfaces/IChapterVersion";
import { useNavigate, useLocation } from "react-router-dom";
import { IChapterContent } from "../../interfaces/IChapterContent";
export const ChapterBranches: FC<{
  openMergeModal: () => void;
  setSearchParams: (params: any) => void;
  chapterBranches: IChapterVersion[];
  currentContent: IChapterContent;
  mainContent: IChapterContent;
  currentBranch: IChapterContent;
  checkoutMain: any;
}> = ({
  openMergeModal,
  chapterBranches,
  setSearchParams,
  currentContent,
  mainContent,
  currentBranch,
  checkoutMain,
}) => {
  if (!chapterBranches) {
    return null;
  }
  return (
    <div className="min-w-auto max-w-md flex-grow">
      {chapterBranches.length > 0 ? (
        <div className="shadow-lg p-5 max-h-60 overflow-y-auto">
          <h3 className="text-lg flex font-bold gap-2">
            Branches <VscInfo size={18} className="cursor-pointer my-auto" />
          </h3>
          <div className="flex justify-between gap-2 border-b border-stone-700">
            <div>
              <div className="flex gap-1 transition-all ease-in-out duration-200">
                <button
                  className={`hover:text-orange-200 ${
                    currentBranch.uid === mainContent.uid
                      ? "text-blue-300"
                      : "text-stone-300"
                  }`}
                  onClick={checkoutMain}
                >
                  <VscGitPullRequestCreate size={18} />
                </button>
                <p className="text-purple-300 font-semibold">main</p>
              </div>
            </div>
            {/* <p>{convertDate(chapter.createdAt)}</p> */}
          </div>
          {chapterBranches.map((branch: any) => (
            <div
              key={branch.uid}
              className="flex justify-between gap-2 border-b border-stone-700"
            >
              <div>
                <div className="flex gap-1 transition-all ease-in-out duration-200">
                  <button
                    className={`hover:text-orange-200 ${
                      branch.uid === currentBranch.uid
                        ? "text-blue-300"
                        : "text-stone-300"
                    }`}
                    onClick={() => setSearchParams({ branch: branch.uid })}
                  >
                    <VscGitPullRequestCreate size={18} />
                  </button>
                  {branch.uid === currentBranch.uid ? (
                    <div className="mt-1 ">
                      <button
                        onClick={openMergeModal}
                        className="flex gap-1 hover:text-red-300"
                      >
                        <VscGitMerge size={18} />
                      </button>
                    </div>
                  ) : (
                    ""
                  )}
                  <p className="text-purple-300 font-semibold">
                    {branch.name ? branch.name : "Branch"}:
                  </p>
                </div>
              </div>
              <p>{convertDate(branch.dateCreated.date)}</p>
            </div>
          ))}
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
