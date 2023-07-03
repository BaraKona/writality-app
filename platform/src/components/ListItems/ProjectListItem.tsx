import { IconBook, IconBook2, IconUsers } from "@tabler/icons";
import React, { FC } from "react";
import { HiOutlineUserGroup, HiUserGroup } from "react-icons/hi";
import { useParams } from "react-router-dom";
import { IconRenderer } from "../IconRenderer";

export const ProjectListItem: FC<{
	name: string;
	projectId?: string;
	onClick?: () => void;
	type: "standard" | "collaboration";
}> = ({ name, onClick, projectId, type }) => {
	const { project } = useParams();

	return (
		<>
			{projectId === project ? (
				<li
					onClick={onClick}
					className="p-1.5 flex mb-1 text-xs font-medium bg-white hover:bg-white cursor-default rounded-md "
				>
					<a className=" flex text-black items-center">
						<IconRenderer type={type} open={true} />
						<span className="ml-2 whitespace-nowrap w-32 text-ellipsis overflow-hidden">
							{name}
						</span>
					</a>
				</li>
			) : (
				<li
					onClick={onClick}
					className="p-1.5 flex mb-1 text-xs font-medium rounded-md hover:bg-white cursor-default "
				>
					<a className=" flex text-blueText items-center">
						<IconRenderer type={type} open={false} />
						<span className="ml-2 whitespace-nowrap w-32 text-ellipsis overflow-hidden">
							{name}
						</span>
					</a>
				</li>
			)}
		</>
	);
};
