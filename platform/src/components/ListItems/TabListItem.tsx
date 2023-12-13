import { IconBook2, IconUser, IconX } from "@tabler/icons-react";
import { FC } from "react";
import { useLocation } from "react-router-dom";
import { IconBooks, IconClipboard } from "@tabler/icons-react";
export const TabListItem: FC<{
  name: string;
  url: string;
  onClick?: () => void;
  removeFavourite?: () => void;
  type: "story" | "post" | "user" | "project";
}> = ({ name, onClick, url, type, removeFavourite }) => {
  const location = useLocation().pathname;

  const icons = {
    story: <IconBooks size={18} />,
    post: <IconClipboard size={18} className="dark:text-purple-600" />,
    user: <IconUser size={18} className="dark:text-lime-600" />,
    project: <IconBook2 size={18} />,
  };

  return (
    <li
      onClick={onClick}
      className={`group mb-0.5 flex w-full cursor-default rounded-md px-2 py-1 text-xs font-medium transition-all duration-500 ease-in-out hover:bg-coolGrey-1 dark:bg-baseDark dark:hover:bg-hoverDark ${
        url === location ? "bg-coolGrey-1 dark:bg-hoverDark" : ""
      }`}
    >
      <div className="flex w-full items-center justify-between gap-1">
        <div className="flex gap-1">
          {icons[type]}
          <span className=" w-[12.8rem] overflow-hidden text-ellipsis whitespace-nowrap">
            {name}
          </span>
        </div>
        <IconX
          onClick={(e) => {
            e.stopPropagation(), removeFavourite ? removeFavourite() : null;
          }}
          size={10}
          stroke={3}
          className={`hover:black ml-auto cursor-pointer text-coolGrey-4 dark:text-coolGrey-6 ${
            url === location ? "visible" : "invisible"
          }`}
        />
      </div>
    </li>
  );
};
