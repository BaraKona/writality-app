import { IconX } from "@tabler/icons-react";
import { FC } from "react";
import { useParams } from "react-router-dom";
import { IconRenderer } from "../IconRenderer";

export const ProjectListItem: FC<{
	name: string;
	projectId: string;
	onClick?: () => void;
	removeFavourite?: () => void;
	type: "standard" | "collaboration";
}> = ({ name, onClick, projectId, type, removeFavourite }) => {
	const { project } = useParams();

	return (
		<li
			onClick={onClick}
			className={`px-1.5 py-1 transition-all ease-in-out duration-500 flex text-xs font-medium mb-1 group hover:bg-coolGrey-2 rounded-normal cursor-default ${
				projectId === project
					? "bg-coolGrey-2 text-coolGrey-7"
					: "bg-transparent text-coolGrey-5"
			}`}
		>
			<div className="gap-1 flex  items-center">
				<IconRenderer type={type} open={projectId === project} />
				<span className=" whitespace-nowrap w-[11rem] text-ellipsis overflow-hidden">
					{name}
				</span>
				{/* <IconX
						onClick={(e) => {
							e.stopPropagation(), removeFavourite ? removeFavourite() : null;
						}}
						size={10}
						stroke={3}
						className="group-hover:visible cursor-pointer invisible hover:black ml-auto text-gray-400"
					/> */}
			</div>
		</li>
	);
};
