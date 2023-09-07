import { IconX } from "@tabler/icons-react";
import { FC, useState } from "react";
import { useParams } from "react-router-dom";
import { IconRenderer } from "../IconRenderer";

export const ProjectListItem: FC<{
	name: string;
	projectId: string;
	description?: string;
	onClick?: () => void;
	removeFavourite?: () => void;
	type: "standard" | "collaboration";
}> = ({ name, onClick, projectId, type, removeFavourite, description }) => {
	const { project } = useParams();

	return (
		<>
			<li
				onClick={onClick}
				className={`px-1.5 py-1 transition-all ease-in-out duration-500 flex flex-col text-xs font-medium group hover:bg-coolGrey-2 bg-white rounded-normal cursor-default  ${
					projectId === project
						? "bg-coolGrey-2 text-coolGrey-7 border border-coolGrey-2"
						: "bg-transparent text-coolGrey-5 border border-border"
				}`}
			>
				<div className="gap-1 flex  items-center">
					<IconRenderer type={type} open={projectId === project} />
					<span className=" whitespace-nowrap w-[12rem] text-ellipsis overflow-hidden">
						{name}
					</span>
				</div>
			</li>
		</>
	);
};
