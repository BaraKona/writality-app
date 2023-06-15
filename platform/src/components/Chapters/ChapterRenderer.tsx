import { FC, ReactNode, useEffect, useState } from "react";
import { ScrollArea } from "@mantine/core";

export const ChapterRenderer: FC<{ children: ReactNode }> = ({ children }) => {
	return (
		<ScrollArea
			className="flex-grow w-80 min-w-[20rem] mx-auto  border-r bg-white"
			offsetScrollbars
			h={"calc(100vh - 125px)"}
			scrollbarSize={6}
		>
			{children}
		</ScrollArea>
	);
};
