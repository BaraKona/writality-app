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
		<div className="col-span-3 row-span-4 items-start justify-center flex rounded-md border border-border dark:border-borderDark p-4 overflow-y-auto">
			<div className="flex gap-2 flex-col items-center w-full">
				{project?.history?.map((history, index) => {
					return (
						<div
							className="flex gap-2 items-center w-full justify-between"
							key={index}
						>
							<div className="flex gap-2 items-center">
								{history.action.includes("created") && (
									<IconCirclePlus
										size={18}
										className="text-lime-600 dark:text-lime:700"
									/>
								)}
								{history.action.includes("updated") && (
									<IconRefresh
										size={18}
										className="text-slate-600 dark:text-slate:700"
									/>
								)}
								{history.action.includes("moved") && (
									<IconDragDrop
										size={18}
										className="text-cyan-600 dark:text-cyan:700"
									/>
								)}
								{history.action.includes("deleted") && (
									<IconTrashX
										size={18}
										className="text-rose-600 dark:text-rose:700"
									/>
								)}

								<Text color="dimmed" size="xs">
									<Text variant="link" component="span" inherit>
										{history.user.name.substring(0, 5)}{" "}
									</Text>
									{history.action}
								</Text>
							</div>
							<Text size="xs">{useTimeFromNow(history.date.toString())}</Text>
						</div>
					);
				})}
			</div>
		</div>
	);
};
