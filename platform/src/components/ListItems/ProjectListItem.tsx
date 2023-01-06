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
    <>
      {projectId === project || projectId === collaborationId ? (
        <li
          onClick={onClick}
          className="p-[0.1rem] hover:bg-base bg-base cursor-default"
        >
          <a className="ml-3 flex text-sm font-normal">
            <AiFillFolderOpen size={20} color={"#b8a285"} />{" "}
            <span className="ml-3 text-purple-300">{name}</span>
          </a>
        </li>
      ) : (
        <li
          onClick={onClick}
          className="p-[0.1rem] hover:bg-base cursor-default"
        >
          <a className="ml-3 flex text-sm font-normal">
            <AiFillFolder size={20} color={"#a8a29e"} />
            <span className="ml-3">{name}</span>
          </a>
        </li>
      )}
    </>
  );
};
