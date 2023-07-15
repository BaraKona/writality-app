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
} from "@tabler/icons";
import { useCreateChapterVersion } from "../../../hooks/chapter/useCreateChapterVersion";
import { useParams } from "react-router-dom";
import { ButtonWrapper } from "../../buttons/ButtonWrapper";
import { useSearchParams } from "react-router-dom";

export const ChapterVersions: FC<{
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	setVersion: React.Dispatch<React.SetStateAction<any>>;
	chapterVersions: IChapterVersion[];
	text: string;
	close: () => void;
}> = ({ chapterVersions, setOpen, setVersion, text, close }) => {
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
		<div className="min-w-auto w-72">
			<div className="flex font-medium my-2 px-2 text-blueText gap-2 text-xs items-center">
				Versions
				<ButtonWrapper onClick={() => mutate(text)} className="ml-auto">
					<IconPlus
						size={14}
						className="text-gray-400 group-hover:text-black"
					/>
				</ButtonWrapper>
				<ButtonWrapper onClick={close}>
					<IconX size={14} className="text-gray-400 group-hover:text-black" />
				</ButtonWrapper>
			</div>
			<Divider className="border-lightBorder" />
			{chapterVersions.length > 0 ? (
				<div>
					<ScrollArea.Autosize
						offsetScrollbars
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
								className="px-2 py-1 flex justify-between gap-2 items-center border-b border-lightBorder group"
							>
								<div className="">
									<div className="flex gap-1 transition-all ease-in-out duration-200 items-center text-xs cursor-default">
										<div
											onClick={() => {
												setOpen(true), setVersion(version);
											}}
											className="group-hover:text-black text-gray-400 cursor-pointer"
										>
											<IconHourglassLow size={18} />
										</div>
										<p className="text-blueText font-medium">
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
					<div className="text-blueText">
						<IconVersions size={18} />
					</div>
					You do not have any versions saved for this chapter
				</div>
			)}
		</div>
	);
};
