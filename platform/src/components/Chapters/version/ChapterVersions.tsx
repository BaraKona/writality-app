import { FC } from "react";
import { useTimeFromNow } from "../../../hooks/useTimeFromNow";
import { IChapterVersion } from "../../../interfaces/IChapterVersion";
import { Divider, ScrollArea, Text } from "@mantine/core";
import {
	IconHourglassLow,
	IconPlus,
	IconRectangleVertical,
	IconVersions,
	IconX,
} from "@tabler/icons-react";
import { useCreateChapterVersion } from "../../../hooks/chapter/useCreateChapterVersion";
import { useParams } from "react-router-dom";
import { ButtonWrapper } from "../../buttons/ButtonWrapper";
import { useSearchParams } from "react-router-dom";
import { ChapterSidebarWrapper } from "../ChapterSidebarWrapper";

export const ChapterVersions: FC<{
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	setVersion: React.Dispatch<React.SetStateAction<any>>;
	chapterVersions: IChapterVersion[];
	close: () => void;
}> = ({ chapterVersions, setOpen, setVersion, close }) => {
	if (!chapterVersions) {
		return null;
	}
	const { project, chapter } = useParams();
	const [searchParams] = useSearchParams();
	const { mutate } = useCreateChapterVersion(
		chapter as string,
		project as string
	);

	return (
		<ChapterSidebarWrapper>
			<div className="flex font-medium my-2 px-2 text-coolGrey-7 gap-2 text-xs items-center">
				Versions
				<ButtonWrapper className="ml-auto">
					<IconPlus
						size={14}
						className="text-gray-400 group-hover:text-black dark:hover:text-coolGrey-1"
					/>
				</ButtonWrapper>
				<ButtonWrapper onClick={close}>
					<IconX
						size={14}
						className="text-gray-400 group-hover:text-black dark:hover:text-coolGrey-1"
					/>
				</ButtonWrapper>
			</div>
			<Divider className="!border-coolGrey-1 dark:!border-borderDark" />
			{chapterVersions.length > 0 ? (
				<div>
					<ScrollArea.Autosize
						scrollbarSize={6}
						styles={{
							viewport: {
								maxHeight: "calc(100vh - 156px)",
							},
						}}
					>
						{chapterVersions.map((version: any, index) => (
							<div
								key={index}
								className="px-2 py-1 flex justify-between gap-2 items-center border-b border-border dark:border-borderDark group"
							>
								<div className="">
									<div className="flex gap-1 transition-all ease-in-out duration-200 items-center text-xs cursor-default">
										<div
											onClick={() => {
												setOpen(true), setVersion(version);
											}}
											className="group-hover:text-black dark:hover:text-coolGrey-1 text-gray-400 cursor-pointer"
										>
											<IconHourglassLow size={18} />
										</div>
										<p className="text-coolGrey-7 font-medium">
											{version.name ? version.name : "Version"}:
										</p>
									</div>
								</div>
								<Text color="dimmed" size="xs">
									{useTimeFromNow(version.dateCreated.date)}
								</Text>
							</div>
						))}
					</ScrollArea.Autosize>
				</div>
			) : (
				<div className="flex gap-2 items-center text-xs p-2">
					<div className="text-coolGrey-7">
						<IconVersions size={18} />
					</div>
					You do not have any versions saved for this chapter
				</div>
			)}
		</ChapterSidebarWrapper>
	);
};
