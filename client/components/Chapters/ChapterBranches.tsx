import { FC } from "react";
import { useTimeFromNow } from "../../hooks/useTimeFromNow";
import { VscGitPullRequestCreate, VscGitMerge, VscInfo } from "react-icons/vsc";
import { IChapterVersion } from "../../interfaces/IChapterVersion";
import { useRouter } from "next/router";
export const ChapterBranches: FC<{
  checkoutBranch?: (branch: any) => void;
  openMergeModal: () => void;
  chapterBranches: IChapterVersion[];
  currentVersion: IChapterVersion;
}> = ({ checkoutBranch, openMergeModal, chapterBranches, currentVersion }) => {
  const router = useRouter();

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
                {/* <button
                  className={`hover:text-orange-200 ${
                    chapterBranches.uid === chapterBranches.uid
                      ? "text-blue-300"
                      : "text-stone-300"
                  }`}
                >
                  <VscGitPullRequestCreate size={18} />
                </button> */}
                <p className="text-purple-300 font-semibold">main</p>
              </div>
            </div>
            {/* <p>{useTimeFromNow(chapter.createdAt)}</p> */}
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
                      branch.uid === currentVersion.uid
                        ? "text-blue-300"
                        : "text-stone-300"
                    }`}
                    onClick={() =>
                      router.push(
                        router.asPath.toString().split("?")[0] +
                          `?branch=${branch.uid}`
                      )
                    }
                  >
                    <VscGitPullRequestCreate size={18} />
                  </button>
                  {branch.uid === currentVersion.uid ? (
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
              <p>{useTimeFromNow(branch.dateCreated.date)}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className=" flex gap-2 text-center align-middle text-sm">
          <button className="text-stone-300">
            <VscGitMerge size={18} />
          </button>
          You do not have any branches for this chapter
        </p>
      )}
    </div>
  );
};
