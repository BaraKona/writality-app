import React, { FC } from "react";
import { AiFillFolder, AiFillFolderOpen } from "react-icons/ai";
import { useParams } from "react-router-dom";

export const ProjectListItem: FC<{
	name: string;
	projectId?: string;
	onClick?: () => void;
}> = ({ name, onClick, projectId }) => {
	const { project, collaborationId } = useParams();
	return (
		<>
			{projectId === project || projectId === collaborationId ? (
				<li
					onClick={onClick}
					className="py-1 px-[0.1rem] bg-white hover:bg-white cursor-default rounded-md"
				>
					<a className="ml-3 flex text-md font-normal">
						<AiFillFolderOpen size={20} color={"#000"} />{" "}
						<span className="ml-3 text-black">{name}</span>
					</a>
				</li>
			) : (
				<li
					onClick={onClick}
					className="py-1 px-[0.1rem] hover:bg-white rounded-md cursor-default "
				>
					<a className="ml-3 flex text-md font-normal">
						<AiFillFolder size={20} color={"#a8a29e"} />
						<span className="ml-3">{name}</span>
					</a>
				</li>
			)}
		</>
	);
};
