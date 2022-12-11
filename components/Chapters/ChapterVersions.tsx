import { FC } from "react";
import { useDatabaseContext } from "../../contexts/DatabaseContext";
import { convertDate } from "../../scripts/convertDate";
import { VscRepoPull, VscRepo, VscInfo } from "react-icons/vsc";
export const ChapterVersions: FC<{
  checkoutBranch: (branch: any) => void;
  openMergeModal: () => void;
}> = ({ checkoutBranch, openMergeModal }) => {
  const {
    currentChapterBranches,
    currentChapterContent,
    setCurrentChapterContent,
    mainChapterContent,
    currentChapterVersions,
  } = useDatabaseContext();
  return (
    <div className="min-w-auto max-w-md flex-grow  border-l border-baseBorder px-5">
      {currentChapterVersions?.length > 0 ? (
        <div className="shadow-lg p-5 max-h-60 overflow-y-auto">
          <h3 className="text-lg flex font-bold gap-2">
            Versions <VscInfo size={18} className="cursor-pointer my-auto" />
          </h3>
          {currentChapterVersions.map((version: any) => (
            <div
              key={version.uid}
              className="flex justify-between gap-2 border-b border-stone-700"
            >
              <div>
                <div className="flex gap-1 transition-all ease-in-out duration-200">
                  <button
                    // onClick={() => checkoutBranch(version)}
                    className={`hover:text-orange-200 ${
                      currentChapterContent.uid === version.uid
                        ? "text-blue-300"
                        : "text-stone-300"
                    }`}
                  >
                    <VscRepo size={18} />
                  </button>
                  {/* {currentChapterContent.uid === version.uid ? (
                    <div className="mt-1 ">
                      <button
                        onClick={openMergeModal}
                        className="flex gap-1 hover:text-red-300"
                      >
                        <VscRepoPull size={18} />
                      </button>
                    </div>
                  ) : (
                    ""
                  )} */}
                  <p className="text-purple-300 font-semibold">
                    {version.name ? version.name : "Version"}:
                  </p>
                </div>
              </div>
              <p>{convertDate(version.createdAt)}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No Versions yet</p>
      )}
    </div>
  );
};
