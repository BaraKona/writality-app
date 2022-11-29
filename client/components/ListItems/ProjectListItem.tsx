import React, { ChangeEvent, FC } from "react";
import { AiFillFolder, AiFillFolderOpen } from "react-icons/ai";
import { useRouter } from "next/router";
import { cyclops6, cyclops5 } from "../../assets/icons";
import Image from "next/image";
export const ProjectListItem: FC<{
  name: string;
  projectId?: string;
  onClick?: () => void;
}> = ({ name, onClick, projectId }) => {
  const router = useRouter();
  const changeFolder = () => {
    if (
      projectId === router?.query.project ||
      projectId === router?.query.collaboration
    ) {
      return <AiFillFolderOpen size={20} color={"#b8a285"} />;
    } else {
      return <AiFillFolder size={20} color={"#a8a29e"} />;
    }
  };
  return (
    <li onClick={onClick} className=" w-fit cursor-default">
      <a className="  ml-3 flex pr-3 text-sm font-normal text-stone-300 rounded dark:text-white hover:text-baseBorder hover:bg-stone-400">
        {changeFolder()}
        <span className="ml-3">{name}</span>
      </a>
    </li>
  );
};
