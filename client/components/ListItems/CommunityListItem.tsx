import React, { ReactNode, FC } from "react";
import { useRouter } from "next/router";

export const CommunityListItem: FC<{
  children: ReactNode;
  name: string;
  onClick?: () => void;
}> = ({ name, onClick, children }) => {
  const router = useRouter();
  const highlight = () => {
    if (router?.pathname.includes(name.toLowerCase())) {
      console.log("true");
      return "text-purple-300";
    } else {
      return "text-stone-300";
    }
  };
  return (
    <li onClick={onClick} className=" w-fit cursor-default">
      <a className="  ml-3 flex pr-3 text-sm font-normal text-stone-300 rounded dark:text-white hover:text-baseBorder hover:bg-stone-400">
        {children}
        <span className={`ml-3 ${highlight()}`}>{name}</span>
      </a>
    </li>
  );
};
