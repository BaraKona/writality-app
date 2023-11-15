import { Tooltip } from "@mantine/core";
import { FC, ReactNode } from "react";
import { tooltipStyles } from "../../../styles/tooltipStyles";

export const SidebarTopNav: FC<{
	children: ReactNode;
	sidebarNav: string;
	value: string;
	navigate: () => void;
}> = ({ children, sidebarNav, value, navigate }) => {
	return (
		<Tooltip label={value} position="top" withArrow styles={tooltipStyles}>
			<div
				onClick={navigate}
				className={`p-1 rounded-lg dark:text-coolGrey-4 bg-coolGrey-1 dark:border-baseDark dark:hover:shadow-none dark:hover:bg-hoverDark dark:hover:border-hoverDark hover:bg-coolGrey-7 hover:text-coolGrey-1 transition-all ease-in-out duration-300 ${
					sidebarNav === value
						? "bg-coolGrey-7 dark:border-hoverDark hover:border-coolGrey-3 dark:hover:bg-hoverDark text-coolGrey-1 dark:bg-sky-900"
						: "dark:bg-hoverDark "
				}`}
			>
				{children}
			</div>
		</Tooltip>
	);
};
