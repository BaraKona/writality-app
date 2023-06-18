import { FC } from "react";
import { VscInfo } from "react-icons/vsc";
import { Timeline, Text, ScrollArea, Divider } from "@mantine/core";
import { useTimeFromNow } from "../../../hooks/useTimeFromNow";
import {
	IconGitBranch,
	IconGitPullRequest,
	IconGitCommit,
	IconMessageDots,
	IconFilePlus,
	IconGitMerge,
} from "@tabler/icons";
import { IChapter } from "../../../interfaces/IChapter";

export const ChapterHistory: FC<{ history: IChapter["history"] }> = ({
	history,
}) => {
	if (!history) {
		return null;
	}
	// const active = history.length <= 1 ? history.length : history.length - 2;

	const historyAction = {
		created: <IconFilePlus size={12} />,
		merged: <IconGitMerge size={12} />,
		updated: <IconGitCommit size={12} />,
	};
	const dateSortedHistory = history.sort((a, b) => {
		return new Date(b.date).getTime() - new Date(a.date).getTime();
	});
	return (
		<div className="min-w-auto w-56">
			<div>
				<div className="flex font-bold my-2 px-2 text-blueText text-sm">
					History <VscInfo size={14} className="cursor-pointer my-auto" />
				</div>
				<Divider className="border-gray-200" />
				<ScrollArea.Autosize
					mah={400}
					offsetScrollbars
					scrollbarSize={6}
					className="px-2"
				>
					<Timeline
						active={1}
						bulletSize={24}
						lineWidth={2}
						color="violet"
						className="py-2"
					>
						{dateSortedHistory?.map((item, index) => (
							<Timeline.Item
								key={index}
								bullet={
									// @ts-ignore
									historyAction[item.action] || <IconMessageDots size={12} />
								}
								title={`Chapter ${item.action}`}
								className="text-blueText text-sm font-medium pt-1"
							>
								<Text color="dimmed" size="xs">
									Chapter was {item.action} by{" "}
									<Text variant="link" component="span" inherit>
										{item.user.substring(0, 5)}
									</Text>
								</Text>
								<Text size="xs" mt={4}>
									{useTimeFromNow(item.date.toString())}
								</Text>
							</Timeline.Item>
						))}
					</Timeline>
				</ScrollArea.Autosize>
			</div>
		</div>
	);
};
