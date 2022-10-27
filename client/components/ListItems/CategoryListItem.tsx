import React, { FC, ReactNode } from "react";
import { AiFillPlusSquare } from "react-icons/ai";
export const CategoryListItem: FC<{
  children?: ReactNode;
  onClick?: () => void;
  name: string;
  button?: boolean;
}> = ({ children, onClick, name, button }) => {
  return (
    <ul>
      <li>
        <h2 className="flex justify-between items-center ml-1 mt-3 font-semibold text-stone-500 text-sm rounded-lg">
          {name}
          <p
            onClick={onClick}
            className="text-purple-300 font-bold px-2  cursor-pointer hover:text-purple-600 active:text-purple-500"
          >
            {button ? <AiFillPlusSquare size={20} /> : ""}
          </p>
        </h2>
      </li>
      {children}
    </ul>
  );
};
