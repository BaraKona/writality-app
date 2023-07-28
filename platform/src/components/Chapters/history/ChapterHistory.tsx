import { FC } from "react";
import { VscInfo } from "react-icons/vsc";
import { Timeline, Text, ScrollArea, Divider } from "@mantine/core";
import { useTimeFromNow } from "../../../hooks/useTimeFromNow";
import {
	IconGitCommit,
	IconMessageDots,
	IconFilePlus,
	IconGitMerge,
	IconRefresh,
	IconX,
} from "@tabler/icons";
import { IChapter } from "../../../interfaces/IChapter";
import { ButtonWrapper } from "../../buttons/ButtonWrapper";
import { inputStyles } from "../../../styles/inputStyles";
import { ChapterSidebarWrapper } from "../ChapterSidebarWrapper";

export const ChapterHistory: FC<{
	history: IChapter["history"];
	close: () => void;
}> = ({ history, close }) => {
	if (!history) {
		return null;
	}
	// const active = history.length <= 1 ? history.length : history.length - 2;

	const historyAction = {
		created: <IconFilePlus size={12} />,
		merged: <IconGitMerge size={12} />,
		updated: <IconRefresh size={12} />,
	};

	return (
		<ChapterSidebarWrapper>
			<div>
				<div className="flex font-medium my-2 px-2 text-blueText gap-2 text-xs items-center">
					History
					<ButtonWrapper className="ml-auto" onClick={close}>
						<IconX size={14} className="text-gray-400 group-hover:text-black" />
					</ButtonWrapper>
				</div>
				<Divider color="grey.0" />
				<ScrollArea.Autosize
					scrollbarSize={6}
					className="px-2"
					styles={{
						viewport: {
							maxHeight: "calc(100vh - 156px)",
						},
					}}
				>
					<Timeline
						active={0}
						bulletSize={24}
						lineWidth={2}
						className="py-2"
						radius="md"
					>
						{history?.map((item, index) => (
							<Timeline.Item
								lineActive={index === 0}
								key={index}
								bullet={
									// @ts-ignore
									historyAction[item.action] || <IconMessageDots size={12} />
								}
								title={`Chapter ${item.action}`}
								className="text-blueText text-xs font-medium pt-1"
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
		</ChapterSidebarWrapper>
	);
};
