import { FC } from "react";
import { IProject } from "../../interfaces/IProject";
import { Divider, Text } from "@mantine/core";
import {
	IconCirclePlus,
	IconDragDrop,
	IconHistory,
	IconRefresh,
	IconTrashX,
} from "@tabler/icons-react";
import { useTimeFromNow } from "../../hooks/useTimeFromNow";
import { useNavigate } from "react-router-dom";

export const ProjectHistory: FC<{ project: IProject }> = ({ project }) => {
	const navigate = useNavigate();
	if (!project?.history || project?.history?.length === 0) {
		return (
			<div className="col-span-3 items-center row-span-4 flex justify-center rounded-lg border border-border dark:border-borderDark p-2 overflow-y-auto">
				<Text color="dimmed" size="xs" className="flex gap-2">
					<IconHistory size={18} />
					No history yet
				</Text>
			</div>
		);
	}

	return (
		<div className="col-span-3 row-span-4 items-start justify-center rounded-lg border border-border dark:border-borderDark py-2">
			<h3 className=" text-coolGrey-7 dark:text-coolGrey-4 font-medium text-xs flex py-1 gap-2 px-4 items-center">
				<IconHistory size={18} />
				Recent Activity
			</h3>
			<Divider className="!border-coolGrey-1 dark:!border-borderDark !my-2" />
			<div className="flex gap-2 flex-col items-center w-full h-[28.5rem] overflow-y-auto px-4 pb-4">
				{project?.history?.map((history, index) => {
					return (
						<div
							className="flex flex-col gap-4 w-full justify-between"
							key={index}
						>
							<div className="flex gap-2 items-center">
								{history.action.includes("created") && (
									<IconCirclePlus
										size={20}
										className="text-lime-600 dark:text-lime:700"
									/>
								)}
								{history.action.includes("updated") && (
									<IconRefresh
										size={20}
										className="text-slate-600 dark:text-slate:700"
									/>
								)}
								{history.action.includes("moved") && (
									<IconDragDrop
										size={20}
										className="text-cyan-600 dark:text-cyan:700"
									/>
								)}
								{history.action.includes("deleted") && (
									<IconTrashX
										size={20}
										className="text-rose-600 dark:text-rose:700"
									/>
								)}

								<div className="text-xs">
									<Text
										variant="link"
										component="span"
										inherit
										className="hover:underline cursor-pointer"
										onClick={() => navigate(`/users/${history.user.uid}`)}
									>
										{history.user.name}{" "}
									</Text>
									{history.action}
									<Text size="xs" color="dimmed">
										{useTimeFromNow(history.date.toString())}
									</Text>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};
