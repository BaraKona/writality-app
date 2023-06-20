import { FC, ReactNode } from "react";
import { CreateChapterButton } from "../buttons";
import { Divider } from "@mantine/core";
import { IconBook, IconFilePlus, IconFiles } from "@tabler/icons";

export const ChapterWrapper: FC<{
	children: ReactNode;
	title: string;
	createNewChapter: () => void;
}> = ({ children, createNewChapter, title }) => {
	return (
		<div className="flex flex-col bg-white px-7 h-[calc(100vh-48px)] gap-2 rounded-t-md">
			<div className=" flex font-medium gap-2 bg-white text-blueText pt-6 items-center">
				<IconBook size={20} />
				<h3 className=" flex text-sm gap-2">{title}</h3>
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
