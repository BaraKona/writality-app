import React, { ReactNode, FC } from "react";

export const CommunityListItem: FC<{
  children: ReactNode;
  name: string;
  onClick?: () => void;
}> = ({ name, onClick, children }) => {
  return (
    <li onClick={onClick} className=" w-fit cursor-default">
      <a className="  ml-3 flex pr-3 text-sm font-normal text-stone-300 rounded dark:text-white hover:text-baseBorder hover:bg-stone-400">
        {children}
        <span className="ml-3">{name}</span>
      </a>
    </li>
  );
};
