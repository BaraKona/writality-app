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
				className={`p-1 rounded-normal border-border border ${
					sidebarNav === value ? "shadow bg-base" : ""
				}`}
			>
				{children}
			</div>
		</Tooltip>
	);
};
