import { IconFilePlus } from "@tabler/icons";
import { FC } from "react";
import { AiFillPlusSquare, AiFillFileAdd } from "react-icons/ai";
import { TablerIcon } from "@tabler/icons";
export const CreateButton: FC<{
	createNewChapter: () => void;
	text: string;
	icon: JSX.Element;
}> = ({ createNewChapter, text, icon }) => {
	return (
		<button
			onClick={createNewChapter}
			className="text-blueText font-medium text-sm px-2 flex cursor-pointer items-center gap-1 group"
		>
			<span className="group-hover:text-black">{icon}</span>
			{text}
		</button>
	);
};
