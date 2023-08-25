import { FC } from "react";
import { IProject } from "../../interfaces/IProject";
import { Timeline, Text } from "@mantine/core";
import {
	IconGitBranch,
	IconGitCommit,
	IconGitPullRequest,
	IconHistory,
	IconMessageDots,
} from "@tabler/icons-react";
import { useTimeFromNow } from "../../hooks/useTimeFromNow";

export const ProjectHistory: FC<{ project: IProject }> = ({ project }) => {
	if (!project?.history || project?.history?.length === 0) {
		return (
			<div className="col-span-3 items-center row-span-2 flex justify-center rounded-normal border border-border p-2 overflow-y-auto">
				<Text color="dimmed" size="xs" className="flex gap-2">
					<IconHistory size={18} />
					No history yet
				</Text>
			</div>
		);
	}

	return (
		<div className="col-span-3 row-span-2 items-center justify-center flex rounded-normal border border-border p-4 overflow-y-auto">
			<Timeline active={1} bulletSize={24} lineWidth={2}>
				{project?.history?.map((history, index) => {
					return (
						<Timeline.Item
							lineActive={index === 0}
							key={index}
							bullet={<IconMessageDots size={12} />}
							title={`Project updated`}
							className="text-coolGrey-7 text-xs font-medium w-56"
						>
							<Text color="dimmed" size="xs">
								<Text variant="link" component="span" inherit>
									{history.user.substring(0, 5)}{" "}
								</Text>
								{history.action}
							</Text>
							<Text size="xs" mt={4}>
								{useTimeFromNow(history.date.toString())}
							</Text>
						</Timeline.Item>
					);
				})}
			</Timeline>
		</div>
	);
};
