import { FC, ReactNode } from "react";
import { AiFillFolderOpen } from "react-icons/ai";
import { CreateChapterButton } from "../buttons";
import { FaBuffer } from "react-icons/fa";
import { ScrollArea } from "@mantine/core";

export const ChapterWrapper: FC<{
	children: ReactNode;
	chapterCount: number;
	createNewChapter: () => void;
}> = ({ children, chapterCount, createNewChapter }) => {
	return (
		<ScrollArea.Autosize
			offsetScrollbars
			scrollbarSize={6}
			className="flex flex-col bg-white  gap-2  overflow-y-auto h-[calc(100vh-48px)]"
		>
			<div className=" flex font-semibold py-2 px-4 bg-white ">
				<FaBuffer size={23} />
				<h3 className=" ml-2 flex">
					Chapters <span className=" ml-3 font-normal">{chapterCount}</span>
				</h3>
				<div className="ml-auto">
					<CreateChapterButton createNewChapter={createNewChapter} />
				</div>
			</div>
			<div className="flex">{children}</div>
		</ScrollArea.Autosize>
	);
};
