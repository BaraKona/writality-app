import React, { FC } from "react";

export const ProjectListItem: FC<{ name?: string }> = ({ name }) => {
  return (
    <li className="flex justify-between ">
      <a
        href="#"
        className="flex justify-between pr-3 text-sm font-normal text-stone-300 rounded-lg w-32 dark:text-white hover:text-stone-800 hover:bg-stone-400"
      >
        <span className="ml-3">{name}</span>
      </a>
    </li>
  );
};
