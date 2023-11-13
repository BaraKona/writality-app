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
				className={`p-1 rounded-md dark:text-coolGrey-4 border border-border dark:border-baseDark dark:hover:shadow-none dark:hover:bg-hoverDark dark:hover:border-hoverDark hover:shadow-md ${
					sidebarNav === value
						? "shadow dark:shadow-none border border-border dark:border-hoverDark hover:border-coolGrey-3 dark:hover:bg-hoverDark bg-coolGrey-1 dark:bg-hoverDark"
						: ""
				}`}
			>
				{children}
			</div>
		</Tooltip>
	);
};
