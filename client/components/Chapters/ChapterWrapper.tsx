import { FC, ReactNode } from "react";
import { AiFillFolderOpen } from "react-icons/ai";
import { CreateChapterButton } from "../buttons";
import { FaBuffer } from "react-icons/fa";

export const ChapterWrapper: FC<{
  children: ReactNode;
  chapterCount: number;
  createNewChapter: () => void;
}> = ({ children, chapterCount, createNewChapter }) => {
  return (
    <div className="w-full flex flex-col gap-2 ">
      <div className=" flex font-semibold px-8 py-2 bg-baseLight">
        <FaBuffer size={23} />
        <h3 className=" ml-2 flex">
          Chapters <span className=" ml-3 font-normal">{chapterCount}</span>
        </h3>
        <div className="ml-auto">
          <CreateChapterButton createNewChapter={createNewChapter} />
        </div>
      </div>
      {children}
    </div>
  );
};
