import React from "react";
import { IProject } from "../interfaces/Iproject";
export default function ProjectListItem(project: IProject) {
  console.log(project);
  return (
    <li key={project?.uid} className="flex justify-between ">
      <a
        href="#"
        className="flex justify-between pr-3 text-sm font-normal text-stone-300 rounded-lg w-32 dark:text-white hover:text-stone-800 hover:bg-stone-400"
      >
        <span className="ml-3">{project.projectTitle}</span>
      </a>
    </li>
  );
}
