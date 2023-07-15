import { Tooltip } from "@mantine/core";
import { tooltipStyles } from "../../styles/tooltipStyles";
import { FC } from "react";
import { ProjectWrapperHeights } from "../../styles/ProjectWrapperHeights";

export const ChapterSidebar: FC<{
	children: React.ReactNode;
	active: boolean;
}> = ({ children, active }) => {
	return (
		<div
			className={`flex flex-col pl-2 ${
				active && "border-r border-gray-200 pr-2"
			} gap-0.5 ${ProjectWrapperHeights}`}
		>
			{children}
		</div>
	);
};
