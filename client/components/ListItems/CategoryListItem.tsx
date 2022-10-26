import React, { FC, ReactNode } from "react";

export const CategoryListItem: FC<{
  children?: ReactNode;
  onClick?: () => void;
  name: string;
  button?: string;
}> = ({ children, onClick, name, button }) => {
  return (
    <ul>
      <li>
        <h2 className="flex justify-between items-center ml-1 mt-3 font-semibold text-stone-500 text-sm rounded-lg">
          {name}
          <p
            onClick={onClick}
            className="text-red-500 font-bold px-2 rounded cursor-pointer hover:bg-stone-500"
          >
            {button}
          </p>
        </h2>
      </li>
      {children}
    </ul>
  );
};
