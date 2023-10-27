import React, { ReactNode, FC } from "react";
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
					className={`p-1.5 flex mb-0.5 text-xs font-medium rounded-normal items-center transition-all ease-in-out duration-500 border-border dark:border-baseDark border dark:text-coolGrey-4 hover:shadow-md dark:hover:shadow-none hover:bg-coolGrey-1 dark:hover:bg-hoverDark ${
						type === "event"
							? "bg-orange-100 dark:bg-amber-900/60 dark:hover:bg-amber-900/90"
							: ""
					} ${
						path.includes(name.toLowerCase())
							? "border-border dark:border-hoverDark hover:border-coolGrey-3 dark:hover:border-hoverDark bg-coolGrey-1 dark:bg-hoverDark dark:shadow-none shadow-md"
							: ""
					}`}
				>
					{children}
				</div>
			</li>
		</Tooltip>
	);
};
