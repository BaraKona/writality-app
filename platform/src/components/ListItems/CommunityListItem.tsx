import React, { ReactNode, FC } from "react";
import { useLocation } from "react-router-dom";
import { Tooltip } from "@mantine/core";
import { tooltipStyles } from "../../styles/tooltipStyles";

export const CommunityListItem: FC<{
	children: ReactNode;
	name: string;
	onClick?: () => void;
}> = ({ name, onClick, children }) => {
	const { pathname } = useLocation();
	const path = pathname?.split("/")[1];

	return (
		<Tooltip label={name} position="right" withArrow styles={tooltipStyles}>
			<li onClick={onClick} className="cursor-default list-none">
				<div
					className={`px-1.5 py-1 flex mb-0.5 text-xs font-medium rounded-normal items-center transition-all ease-in-out duration-500 ${
						path.includes(name.toLowerCase())
							? "text-black bg-base shadow font-medium"
							: "text-blueText"
					} hover:bg-base `}
				>
					{children}
				</div>
			</li>
		</Tooltip>
	);
};
