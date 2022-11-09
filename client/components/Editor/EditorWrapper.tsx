import { FC, ReactNode, useEffect, useState } from "react";
import { CgClose, CgChevronUpR, CgChevronDownR } from "react-icons/cg";
import { VscSourceControl } from "react-icons/vsc";
import { AiFillSave } from "react-icons/ai";
import { IChapter } from "../../interfaces/IChapter";
import { useDatabaseContext } from "../../contexts/DatabaseContext";
import { convertDate } from "../scripts/convertDate";

export const EditorWrapper: FC<{
  children: ReactNode;
  backToProject: () => void;
  chapter: IChapter;
  save: () => void;
  openBranchModal: () => void;
}> = ({ children, backToProject, chapter, save, openBranchModal }) => {
  const [date, setDate] = useState("");
  const { currentChapterContent } = useDatabaseContext();

  useEffect(() => {
    if (currentChapterContent && currentChapterContent.lastUpdated) {
      setDate(convertDate(currentChapterContent?.lastUpdated));
    }
  }, [currentChapterContent]);
  return (
    <div className="w-full flex flex-col bg-baseMid  gap-2 m-3 mx-3 shadow-lg border border-baseBorder rounded-md">
      <div className=" flex font-semibold py-2  bg-baseLight border-b border-baseBorder">
        <button
          onClick={backToProject}
          className="p-2 rounded hover:bg-baseLighter ml-2 mr-1"
        >
          <CgClose size={18} color={"#d8b4fe"} />
        </button>
        <button className="p-2 rounded bg-baseLight hover:bg-baseLighter ml-2 mr-1">
          <CgChevronUpR size={18} color={"#d8b4fe"} />
        </button>
        <button className="p-2 rounded bg-baseLight hover:bg-baseLighter ">
          <CgChevronDownR size={18} color={"#d8b4fe"} />
        </button>
        <p className="align-middle mx-2 my-auto">
          {currentChapterContent?.type === "main" ? (
            <abbr title="You are on the main branch" className="text-blue-300">
              [Main]
            </abbr>
          ) : (
            <abbr title="You are on the main branch" className="text-blue-300">
              [Branch]
            </abbr>
          )}
          &nbsp;
          {currentChapterContent?.type === "main"
            ? chapter?.chapterTitle
            : currentChapterContent?.name}
        </p>
        <p className="text-center my-auto font-medium text-sm ml-auto ">
          {date ? "Last updated: " + date : "No updates yet"}
        </p>
        <button
          className="p-2 ml-2 hover:bg-baseLighter rounded-sm"
          onClick={openBranchModal}
        >
          <abbr title="Create Branch">
            <VscSourceControl size={18} color={"#d8b4fe"} />
          </abbr>
        </button>
        <button
          onClick={save}
          className=" p-2 mr-2 hover:bg-baseLighter rounded-sm"
        >
          <AiFillSave size={18} color={"#d8b4fe"} />
        </button>
      </div>
      <div className="py-3 px-5 overflow-y-hidden">
        <div className="text-editor flex w-full">{children}</div>
      </div>
    </div>
  );
};
