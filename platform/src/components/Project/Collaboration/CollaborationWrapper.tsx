import { FC, ReactNode } from "react";
import { CreateChapterButton } from "../../buttons";
import { FaBuffer } from "react-icons/fa";
import { IconFilePlus } from "@tabler/icons";

export const CollaborationWrapper: FC<{
	children: ReactNode;
	chapterCount: number;
	createNewChapter: () => void;
}> = ({ children, chapterCount, createNewChapter }) => {
	return (
		<div className=" flex flex-col bg-baseMid  gap-2 m-3 mx-3 shadow-lg border border-baseBorder rounded-md">
			<div className=" flex font-semibold py-2 px-4 bg-baseLight border-b border-baseBorder">
				<FaBuffer size={23} />
				<h3 className=" ml-2 flex">
					Chapters <span className=" ml-3 font-normal">{chapterCount}</span>
				</h3>
				<div className="ml-auto">
					<CreateChapterButton
						createNewChapter={createNewChapter}
						text="Create Chapter"
						icon={<IconFilePlus size={20} />}
					/>
				</div>
			</div>
			<div className="flex">{children}</div>
		</div>
	);
};
