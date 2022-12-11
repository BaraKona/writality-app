import { FC } from "react";
import { useDatabaseContext } from "../../contexts/DatabaseContext";
import { convertDate } from "../../scripts/convertDate";
import { VscGitPullRequestCreate, VscGitMerge, VscInfo } from "react-icons/vsc";
export const ChapterBranches: FC<{
  checkoutBranch: (branch: any) => void;
  openMergeModal: () => void;
}> = ({ checkoutBranch, openMergeModal }) => {
  const {
    currentChapterBranches,
    currentChapterContent,
    setCurrentChapterContent,
    mainChapterContent,
  } = useDatabaseContext();
  return (
    <div className="min-w-auto max-w-md flex-grow  border-l border-baseBorder px-5">
      {currentChapterBranches?.length > 0 ? (
        <div className="shadow-lg p-5 max-h-60 overflow-y-auto">
          <h3 className="text-lg flex font-bold gap-2">
            Versions <VscInfo size={18} className="cursor-pointer my-auto" />
          </h3>
          <div className="flex justify-between gap-2 border-b border-stone-700">
            <div>
              <div className="flex gap-1 transition-all ease-in-out duration-200">
                <button
                  onClick={() => setCurrentChapterContent(mainChapterContent)}
                  className={`hover:text-orange-200 ${
                    currentChapterContent.uid === mainChapterContent.uid
                      ? "text-blue-300"
                      : "text-stone-300"
                  }`}
                >
                  <VscGitPullRequestCreate size={18} />
                </button>
                <p className="text-purple-300 font-semibold">main</p>
              </div>
            </div>
            <p>{convertDate(mainChapterContent.createdAt)}</p>
          </div>
          {currentChapterBranches.map((branch: any) => (
            <div
              key={branch.uid}
              className="flex justify-between gap-2 border-b border-stone-700"
            >
              <div>
                <div className="flex gap-1 transition-all ease-in-out duration-200">
                  <button
                    onClick={() => checkoutBranch(branch)}
                    className={`hover:text-orange-200 ${
                      currentChapterContent.uid === branch.uid
                        ? "text-blue-300"
                        : "text-stone-300"
                    }`}
                  >
                    <VscGitPullRequestCreate size={18} />
                  </button>
                  {currentChapterContent.uid === branch.uid ? (
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
              <p>{convertDate(branch.createdAt)}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No branches yet</p>
      )}
    </div>
  );
};
