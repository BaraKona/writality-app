import { FC, ReactNode } from "react";
import { CgClose, CgChevronUpR, CgChevronDownR } from "react-icons/cg";

export const EditorWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="w-full flex flex-col bg-baseMid  gap-2 m-3 mx-6 shadow-lg border border-stone-800 rounded">
      <div className=" flex font-semibold py-2  bg-baseLight border-b border-stone-800">
        <button className="p-2 rounded hover:bg-baseLighter ml-2 mr-1">
          <CgClose size={18} color={"#d8b4fe"} />
        </button>
        <button className="p-2 rounded bg-baseLight hover:bg-baseLighter ml-2 mr-1">
          <CgChevronUpR size={18} color={"#d8b4fe"} />
        </button>
        <button className="p-2 rounded bg-baseLight hover:bg-baseLighter ">
          <CgChevronDownR size={18} color={"#d8b4fe"} />
        </button>

        <h3 className=" ml-2 flex">
          {/* Chapters <span className=" ml-3 font-normal">{chapterCount}</span> */}
        </h3>
        <div className="ml-auto">
          {/* <CreateChapterButton createNewChapter={createNewChapter} /> */}
        </div>
      </div>
      <div className="py-3 px-5">{children}</div>
    </div>
  );
};
