import { FC, ReactNode } from "react";

export const ChapterSidebarWrapper: FC<{
	children: ReactNode;
}> = ({ children }) => {
	return (
		<div className="min-w-auto w-72 border border-border dark:border-borderDark rounded-md h-[calc(100vh-118px)]">
			{children}
		</div>
	);
};
