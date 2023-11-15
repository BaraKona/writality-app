import { FC } from "react";
import { IProject } from "../../interfaces/IProject";
import { Timeline, Text } from "@mantine/core";
import {
	IconCirclePlus,
	IconDragDrop,
	IconHistory,
	IconRefresh,
	IconTrashX,
} from "@tabler/icons-react";
import { useTimeFromNow } from "../../hooks/useTimeFromNow";

export const ProjectHistory: FC<{ project: IProject }> = ({ project }) => {
	if (!project?.history || project?.history?.length === 0) {
		return (
			<div className="col-span-3 items-center row-span-4 flex justify-center rounded-md border border-border dark:border-borderDark p-2 overflow-y-auto">
				<Text color="dimmed" size="xs" className="flex gap-2">
					<IconHistory size={18} />
					No history yet
				</Text>
			</div>
		);
	}

	return (
		<div className="col-span-3 row-span-4 items-start justify-centerl rounded-md border border-border dark:border-borderDark py-4">
			<div className="flex gap-2 items-center mb-3 px-4">
				<IconHistory size={18} />
				Recent Activity
			</div>
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
									<Text variant="link" component="span" inherit>
										{history.user.name.substring(0, 5)}{" "}
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
