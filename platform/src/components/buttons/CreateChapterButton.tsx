import { IconFilePlus } from "@tabler/icons";
import { FC } from "react";
import { AiFillPlusSquare, AiFillFileAdd } from "react-icons/ai";
import { TablerIcon } from "@tabler/icons";
export const CreateButton: FC<{
	createNewChapter: () => void;
	text: string;
	icon?: JSX.Element;
	iconColour?: string;
}> = ({ createNewChapter, text, icon, iconColour }) => {
	return (
		<button
			onClick={createNewChapter}
			className="text-blueText font-medium text-xs py-1 flex cursor-pointer items-center gap-1 group hover:text-black hover:bg-gray-100 rounded-normal px-3"
		>
			<span className="group-hover:text-black">{icon}</span>
			{text}
		</button>
	);
};
