import React, { FC, ReactNode, useEffect, useState } from "react";
import { IProject } from "../../interfaces/IProject";
import { AiFillSetting } from "react-icons/ai";

export const BaseProjectView: FC<{
  children: ReactNode;
  project: IProject;
}> = ({ children, project }) => {
  return (
    <div className=" w-full h-full drop-shadow  ">
      <div className=" py-4 px-8 border-b border-baseBorder">
        <div className="relative flex w-full">
          <h2> {project?.title} </h2>
          <div className="absolute right-0 cursor-pointer">
            <AiFillSetting size={23} color={"#a8a29e"} />
          </div>
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
};
