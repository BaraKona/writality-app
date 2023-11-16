import { FC, ReactNode } from "react";

export const ChapterSidebarWrapper: FC<{
	children: ReactNode;
}> = ({ children }) => {
	return (
		<div className="min-w-auto w-72 border border-border dark:border-borderDark rounded-lg h-[calc(100dvh-118px)]">
			{children}
		</div>
	);
};
