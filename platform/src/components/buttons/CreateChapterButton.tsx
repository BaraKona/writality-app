import { IconFilePlus } from "@tabler/icons";
import { FC } from "react";
import { AiFillPlusSquare, AiFillFileAdd } from "react-icons/ai";

export const CreateChapterButton: FC<{ createNewChapter: () => void }> = ({
	createNewChapter,
}) => {
	return (
		<button
			onClick={createNewChapter}
			className="text-blueText font-medium text-sm px-2 flex cursor-pointer hover:underline "
		>
			<IconFilePlus size={20} className="cursor-pointer" />
			New Chapters
		</button>
	);
};
