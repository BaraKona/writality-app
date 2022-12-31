import React, { FC } from "react";
import { AiFillFolder, AiFillFolderOpen } from "react-icons/ai";
import { useParams } from "react-router-dom";

export const ProjectListItem: FC<{
  name: string;
  projectId?: string;
  onClick?: () => void;
}> = ({ name, onClick, projectId }) => {
  const { project, collaborationId } = useParams();
  return (
    <li onClick={onClick} className=" w-fit cursor-default">
      <a className="  ml-3 flex pr-3 text-sm font-normal text-stone-300 rounded dark:text-white hover:text-baseBorder hover:bg-stone-400">
        {projectId === project || projectId === collaborationId ? (
          <>
            <AiFillFolderOpen size={20} color={"#b8a285"} />{" "}
            <span className="ml-3 text-purple-300">{name}</span>
          </>
        ) : (
          <>
            <AiFillFolder size={20} color={"#a8a29e"} />
            <span className="ml-3 ">{name}</span>
          </>
        )}
      </a>
    </li>
  );
};
