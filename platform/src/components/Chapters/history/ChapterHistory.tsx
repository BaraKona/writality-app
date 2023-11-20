import { FC } from "react";
import { Text, ScrollArea, Divider } from "@mantine/core";
import { useTimeFromNow } from "../../../hooks/useTimeFromNow";
import {
	IconMessageDots,
	IconFilePlus,
	IconGitMerge,
	IconRefresh,
	IconX,
} from "@tabler/icons-react";
import { IChapter } from "../../../interfaces/IChapter";
import { ButtonWrapper } from "../../buttons/ButtonWrapper";
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
		created: <IconFilePlus size={16} />,
		merged: <IconGitMerge size={16} />,
		updated: <IconRefresh size={16} />,
	};

	return (
		<ChapterSidebarWrapper>
			<div>
				<div className="flex font-medium my-2 px-2 text-coolGrey-7 gap-2 text-xs items-center dark:text-coolGrey-4">
					History
					<ButtonWrapper className="ml-auto" onClick={close}>
						<IconX
							size={14}
							className="text-gray-400 group-hover:text-black dark:hover:text-coolGrey-1"
						/>
					</ButtonWrapper>
				</div>
				<Divider className="!border-coolGrey-1 dark:!border-borderDark" />
				<ScrollArea.Autosize
					scrollbarSize={6}
					className="px-2"
					styles={{
						viewport: {
							maxHeight: "calc(100dvh - 156px)",
						},
					}}
				>
					<div className="flex flex-col gap-1">
						{history?.map((item, index) => (
							<div className="relative flex gap-2 p-2">
								<div
									className="min-w-[1rem] rounded-md mt-1 bg-orange-400 text-black p-1 self-start
								"
								>
									{/**@ts-ignore */}
									{historyAction[item.action] || <IconMessageDots size={16} />}
								</div>

								<div>
									<Text color="dimmed" size="xs">
										Chapter was {item.action} by{" "}
										<Text variant="link" component="span" inherit>
											{item.user?.name}
										</Text>
									</Text>
									<Text size="xs" mt={4}>
										{useTimeFromNow(item.date.toString())}
									</Text>
								</div>
							</div>
						))}
					</div>
				</ScrollArea.Autosize>
			</div>
		</ChapterSidebarWrapper>
	);
};
