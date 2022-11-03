import { FC, ReactNode } from "react";
import { CgClose, CgChevronUpR, CgChevronDownR } from "react-icons/cg";
import { AiFillSave } from "react-icons/ai";

export const EditorWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="w-full flex flex-col bg-baseMid  gap-2 m-3 mx-3 shadow-lg border border-baseBorder rounded-md">
      <div className=" flex font-semibold py-2  bg-baseLight border-b border-baseBorder">
        <button className="p-2 rounded hover:bg-baseLighter ml-2 mr-1">
          <CgClose size={18} color={"#d8b4fe"} />
        </button>
        <button className="p-2 rounded bg-baseLight hover:bg-baseLighter ml-2 mr-1">
          <CgChevronUpR size={18} color={"#d8b4fe"} />
        </button>
        <button className="p-2 rounded bg-baseLight hover:bg-baseLighter ">
          <CgChevronDownR size={18} color={"#d8b4fe"} />
        </button>
        <button className="ml-auto p-2 mr-2 ">
          <AiFillSave size={18} color={"#d8b4fe"} />
        </button>
      </div>
      <div className="py-3 px-5">{children}</div>
    </div>
  );
};
