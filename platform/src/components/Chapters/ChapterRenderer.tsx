import { FC, ReactNode, useEffect, useState } from "react";
import { Divider, ScrollArea } from "@mantine/core";
import { IconFiles } from "@tabler/icons";

export const ChapterRenderer: FC<{
	children: ReactNode;
	chapterCount: number;
}> = ({ children, chapterCount }) => {
	return (
		<div className="flex-grow w-80 min-w-[20rem] mx-auto  border-r bg-white">
			<div className="flex gap-2 ml-2 font-medium">
				<IconFiles size={20} />
				<h3 className=" flex text-xs gap-1">
					Chapters <span className=" ml-2">{chapterCount}</span>
				</h3>
			</div>
			<Divider className=" border-gray-200 mt-2" />
			<ScrollArea
				className=""
				offsetScrollbars
				h={"calc(100vh - 146px)"}
				scrollbarSize={6}
			>
				{children}
			</ScrollArea>
		</div>
	);
};
