import React, { FC, ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDatabaseContext } from "../../contexts/DatabaseContext";
import { IProject } from "../../interfaces/Iproject";
import { useAuthContext } from "../../contexts/AuthContext";
import { AiFillSetting } from "react-icons/ai";

export const BaseProjectView: FC<{
  children: ReactNode;
  project: IProject;
}> = ({ children, project }) => {
  return (
    <div className=" w-full h-full drop-shadow  ">
      <div className=" py-4 px-8 border-b border-stone-800">
        <div className="relative flex w-full">
          <h2 className="text-md font-semibold">{project?.projectTitle}</h2>
          <div className="absolute right-0 cursor-pointer">
            <AiFillSetting size={23} color={"#a8a29e"} />
          </div>
        </div>
        {/* <h2>{error}</h2> */}
      </div>
      <div className="h-fill">{children}</div>
    </div>
  );
};
