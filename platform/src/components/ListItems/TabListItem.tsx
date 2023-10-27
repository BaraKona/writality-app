import { IconBook2, IconNotes, IconX } from "@tabler/icons-react";
import { FC } from "react";
import { useLocation, useParams } from "react-router-dom";
import { IconBooks, IconTemplate } from "@tabler/icons-react";
export const TabListItem: FC<{
	name: string;
	url: string;
	onClick?: () => void;
	removeFavourite?: () => void;
	type: "story" | "post" | "user" | "project";
}> = ({ name, onClick, url, type, removeFavourite }) => {
	const location = useLocation().pathname;

	const icons = {
		story: <IconBooks size={18} />,
		post: <IconNotes size={18} />,
		user: <IconTemplate size={18} />,
		project: (
			<IconBook2 size={18} className="text-neutral-600 dark:text-stone-500" />
		),
	};

	return (
		<li
			onClick={onClick}
			className={`px-1.5 py-1 transition-all ease-in-out duration-500 flex text-xs font-medium mb-0.5 group hover:bg-base border border-border dark:border-borderDark  rounded-normal hover:shadow cursor-default ${
				url === location
					? "bg-base text-black shadow"
					: "bg-transparent text-coolGrey-7"
			}`}
		>
			<div className="gap-1 flex  items-center">
				{icons[type]}
				<span className=" whitespace-nowrap w-[7rem] text-ellipsis overflow-hidden">
					{name}
				</span>
				<IconX
					onClick={(e) => {
						e.stopPropagation(), removeFavourite ? removeFavourite() : null;
					}}
					size={10}
					stroke={3}
					className={`cursor-pointer hover:black ml-auto text-gray-400 ${
						url === location ? "visible" : "invisible"
					}`}
				/>
			</div>
		</li>
	);
};
