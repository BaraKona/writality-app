import React, { FC, ReactNode } from "react";
import { AiFillPlusSquare } from "react-icons/ai";
import { Loading } from "../Loading";
export const CategoryListItem: FC<{
  children?: ReactNode;
  loading?: boolean;
  onClick?: () => void;
  name: string;
  button?: boolean;
}> = ({ children, onClick, name, button, loading }) => {
  return (
    <ul>
      <li>
        <h2 className="flex justify-between items-center ml-1 mt-3 font-semibold text-stone-500 text-sm rounded-lg">
          {name}
          <p
            onClick={onClick}
            className="text-purple-300 font-bold   cursor-pointer hover:text-purple-600 active:text-purple-500"
          >
            {button ? <AiFillPlusSquare size={20} /> : ""}
          </p>
        </h2>
      </li>
      <Loading isLoading={loading || false}>{children}</Loading>
    </ul>
  );
};
