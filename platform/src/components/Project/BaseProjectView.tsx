import { FC, ReactNode } from "react";
import { IProject } from "../../interfaces/IProject";
import { AiFillSetting } from "react-icons/ai";
import { IconTrash } from "@tabler/icons";

export const BaseProjectView: FC<{
  children: ReactNode;
  project: IProject;
  openModal: () => void;
}> = ({ children, project, openModal }) => {
  return (
    <div className=" w-full h-full drop-shadow ">
      <div className=" py-4 px-8 border-b border-baseBorder ">
        <div className="relative flex w-full">
          <h2 className="mr-auto"> {project?.title} </h2>
          <div className=" flex cursor-pointer">
            {/* <AiFillSetting size={23} color={"#a8a29e"} /> */}
            <IconTrash size={23} color="pink" onClick={openModal} />
          </div>
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
};
