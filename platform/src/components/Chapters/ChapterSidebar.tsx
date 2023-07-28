import { FC } from "react";
import { ProjectWrapperHeights } from "../../styles/ProjectWrapperHeights";

export const ChapterSidebar: FC<{
	children: React.ReactNode;
	active: boolean;
}> = ({ children, active }) => {
	return (
		<div
			className={`flex flex-col pl-2 ${
				active && "mr-2"
			} gap-1 ${ProjectWrapperHeights}`}
		>
			{children}
		</div>
	);
};
