import { FC } from "react";
import { Text, ScrollArea, Divider } from "@mantine/core";
import { useTimeFromNow } from "../../../hooks/useTimeFromNow";
import {
	IconMessageDots,
	IconFilePlus,
	IconGitMerge,
	IconRefresh,
	IconX,
	IconFileScissors,
} from "@tabler/icons-react";
import { IChapter } from "../../../interfaces/IChapter";
import { ButtonWrapper } from "../../buttons/ButtonWrapper";
import { ChapterSidebarWrapper } from "../ChapterSidebarWrapper";
import { useNavigate } from "react-router-dom";

export const ChapterHistory: FC<{
	history: IChapter["history"];
	close: () => void;
}> = ({ history, close }) => {
	if (!history) {
		return null;
	}

	const navigate = useNavigate();

	const historyAction = {
		created: <IconFilePlus size={18} />,
		merged: <IconGitMerge size={18} />,
		updated: <IconFileScissors size={18} />,
	};

	return (
		<ChapterSidebarWrapper>
			<div>
				<div className="flex font-medium my-2 px-2 text-coolGrey-7 gap-2 text-xs items-center dark:text-coolGrey-4">
					History
					<ButtonWrapper className="ml-auto" onClick={close}>
						<IconX
							size={14}
							className="text-coolGrey-4 dark:text-coolGrey-6 group-hover:text-black dark:hover:text-coolGrey-1"
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
							<div className="relative flex gap-2 p-2 items-center" key={index}>
								<div className="min-w-[1rem]">
									{/**@ts-ignore */}
									{historyAction[item.action] || <IconFileScissors size={18} />}
								</div>

								<div>
									<div className="w-full text-xs" color="dimmed">
										Chapter was {item.action} by{" "}
										<span
											className="hover:underline text-fuchsia-700 dark:text-fuchsia-600 cursor-pointer"
											onClick={() => navigate(`/users/${item?.user?.uid}`)}
										>
											{item.user?.name}
										</span>
									</div>
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
