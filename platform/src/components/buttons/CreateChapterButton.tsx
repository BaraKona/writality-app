import { FC } from "react";
export const CreateButton: FC<{
	createNewChapter: () => void;
	text?: string;
	icon?: JSX.Element;
	iconColour?: string;
}> = ({ createNewChapter, text, icon, iconColour }) => {
	return (
		<button
			onClick={createNewChapter}
			className="text-coolGrey-7 dark:text-coolGrey-4 font-medium text-xs py-1 flex cursor-pointer items-center gap-1 group hover:text-black dark:hover:text-coolGrey-4 dark:hover:bg-hoverDark hover:bg-gray-100 p-1.5 rounded-lg "
		>
			<span>{icon}</span>
			{text}
		</button>
	);
};
