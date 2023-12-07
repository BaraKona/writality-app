import { ReactNode, FC } from "react";
import { useLocation } from "react-router-dom";
import { Tooltip } from "@mantine/core";
import { tooltipStyles } from "../../styles/tooltipStyles";

export const CommunityListItem: FC<{
  children: ReactNode;
  name: string;
  type?: "event" | "standard";
  onClick?: () => void;
}> = ({ name, onClick, children, type }) => {
  const { pathname } = useLocation();
  const path = pathname?.split("/")[1];

  return (
    <Tooltip label={name} position="right" withArrow styles={tooltipStyles}>
      <li onClick={onClick} className="cursor-default list-none">
        <div
          className={`mb-0.5 flex items-center rounded-lg p-2 text-xs font-medium transition-all duration-500 ease-in-out hover:bg-base dark:text-coolGrey-4 dark:hover:bg-baseDark ${
            type === "event"
              ? "bg-orange-100 dark:bg-amber-900/60 dark:hover:bg-amber-900/90"
              : ""
          } ${
            path.includes(name.toLowerCase()) ? "bg-base dark:bg-hoverDark" : ""
          }`}
        >
          {children}
        </div>
      </li>
    </Tooltip>
  );
};
