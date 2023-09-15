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
					className={`p-1.5 flex mb-0.5 text-xs font-medium rounded-normal items-center transition-all ease-in-out duration-500 ${
						type === "event" ? "bg-orange-100" : ""
					} ${
						path.includes(name.toLowerCase())
							? "bg-coolGrey-2 font-medium text-coolGrey-8"
							: "text-coolGrey-5"
					} hover:bg-slate-100-0  `}
				>
					{children}
				</div>
			</li>
		</Tooltip>
	);
};
