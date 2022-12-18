import React, { FC, ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDatabaseContext } from "../../contexts/DatabaseContext";
import { IProject } from "../../interfaces/IProject";
import { useAuthContext } from "../../contexts/AuthContext";
import { AiFillSetting } from "react-icons/ai";

export const BaseProjectView: FC<{
  children: ReactNode;
  project: IProject;
  setIsForm: React.Dispatch<React.SetStateAction<boolean>>;
  isForm: boolean;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  changeTitle?: React.FormEventHandler<HTMLFormElement>;
}> = ({
  children,
  project,
  changeTitle,
  isForm,
  setIsForm,
  title,
  setTitle,
}) => {
  return (
    <div className=" w-full h-full drop-shadow  ">
      <div className=" py-4 px-8 border-b border-baseBorder">
        <form className="relative flex w-full" onSubmit={changeTitle}>
          <input
            className="bg-transparent border-0 focus:ring-0 p-0 font-semibold text-white"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></input>

          <div className="absolute right-0 cursor-pointer">
            <AiFillSetting size={23} color={"#a8a29e"} />
          </div>
        </form>
        {/* <h2>{error}</h2> */}
      </div>
      <div>{children}</div>
    </div>
  );
};
