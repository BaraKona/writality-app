import { Tooltip } from "@mantine/core";
import { FC, ReactNode } from "react";
import { tooltipStyles } from "../../../styles/tooltipStyles";

export const SidebarTopNavItem: FC<{
  children: ReactNode;
  sidebarNav: string;
  value: string;
  navigate: () => void;
}> = ({ children, sidebarNav, value, navigate }) => {
  return (
    <Tooltip
      label={<p className="capitalize">{value}</p>}
      position="top"
      withArrow
      styles={tooltipStyles}
    >
      <div
        onClick={navigate}
        className={`rounded-lg  p-1 transition-all duration-300 ease-in-out hover:bg-coolGrey-7 hover:text-coolGrey-1 dark:border-baseDark dark:text-coolGrey-4 dark:hover:border-hoverDark dark:hover:bg-sky-900/30 dark:hover:shadow-none ${
          sidebarNav === value
            ? "bg-coolGrey-7 text-coolGrey-1 hover:border-coolGrey-3  dark:border-hoverDark dark:bg-sky-500/20"
            : "dark:bg-baseDark "
        }`}
      >
        {children}
      </div>
    </Tooltip>
  );
};
