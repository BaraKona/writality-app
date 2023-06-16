import { IconBook, IconBook2 } from "@tabler/icons";
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
					className="p-1.5 flex mb-1 text-sm font-medium bg-white hover:bg-white cursor-default rounded-md "
				>
					<a className=" flex text-black">
						<IconBook size={23} />
						<span className="ml-2 whitespace-nowrap w-28 text-ellipsis overflow-hidden">
							{name}
						</span>
					</a>
				</li>
			) : (
				<li
					onClick={onClick}
					className="p-1.5 flex mb-1 text-sm font-medium rounded-md hover:bg-white cursor-default "
				>
					<a className=" flex text-blueText">
						<IconBook2 size={23} />
						<span className="ml-2 whitespace-nowrap w-28 text-ellipsis overflow-hidden">
							{name}
						</span>
					</a>
				</li>
			)}
		</>
	);
};
