import { FC, ReactNode } from "react";
import { CreateChapterButton } from "../buttons";
import { Divider } from "@mantine/core";
import { IconFilePlus, IconFiles } from "@tabler/icons";

export const ChapterWrapper: FC<{
	children: ReactNode;
	chapterCount: number;
	createNewChapter: () => void;
}> = ({ children, chapterCount, createNewChapter }) => {
	return (
		<div className="flex flex-col bg-white px-7 h-[calc(100vh-48px)] gap-2 rounded-t-md">
			<div className=" flex font-medium gap-2 bg-white text-blueText pt-6 items-center">
				<IconFiles size={20} />
				<h3 className=" flex text-sm gap-2">
					Chapters <span className=" ml-2">{chapterCount}</span>
				</h3>
				<div className="ml-auto">
					<CreateChapterButton
						createNewChapter={createNewChapter}
						text="New Chapter"
						icon={<IconFilePlus size={20} />}
					/>
				</div>
			</div>
			<Divider className=" border-gray-200" />
			<div className="flex">{children}</div>
		</div>
	);
};
