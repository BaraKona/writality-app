import { IconX } from "@tabler/icons";
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
		<>
			<li
				onClick={onClick}
				className={`p-1.5 transition-all ease-in-out duration-500 flex text-xs font-medium mb-0.5 group rounded-normal hover:bg-white cursor-default ${
					projectId === project
						? "bg-white text-black"
						: "bg-transparent text-blueText"
				}`}
			>
				<div className="gap-1 flex  items-center">
					<IconRenderer type={type} open={projectId === project} />
					<span className=" whitespace-nowrap w-[7rem] text-ellipsis overflow-hidden">
						{name}
					</span>

					<IconX
						onClick={(e) => {
							e.stopPropagation(), removeFavourite ? removeFavourite() : null;
						}}
						size={10}
						stroke={3}
						className="group-hover:block hidden cursor-pointer hover:black ml-auto"
					/>
				</div>
			</li>
		</>
	);
};
