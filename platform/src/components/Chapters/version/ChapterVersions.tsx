import { FC } from "react";
import { useTimeFromNow } from "../../../hooks/useTimeFromNow";
import { IChapterVersion } from "../../../interfaces/IChapterVersion";
import { Divider, ScrollArea, Text } from "@mantine/core";
import { IconPlus, IconRectangleVertical, IconVersions } from "@tabler/icons";

export const ChapterVersions: FC<{
	createVersion: () => void;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	setVersion: React.Dispatch<React.SetStateAction<any>>;
	chapterVersions: IChapterVersion[];
}> = ({ chapterVersions, setOpen, setVersion, createVersion }) => {
	if (!chapterVersions) {
		return null;
	}

	return (
		<div className="min-w-auto w-56">
			<div className="flex font-medium my-2 px-2 text-blueText text-xs">
				Versions
				<IconPlus
					size={18}
					onClick={createVersion}
					className="ml-auto hover:text-black cursor-pointer"
				/>
			</div>
			<Divider className="border-gray-200" />
			{chapterVersions.length > 0 ? (
				<div>
					<ScrollArea.Autosize offsetScrollbars scrollbarSize={6} mah={400}>
						{chapterVersions.map((version: any, index) => (
							<div
								key={index}
								className="px-2 py-1 flex justify-between gap-2 items-center border-b border-gray-200 group"
							>
								<div className="">
									<div className="flex gap-1 transition-all ease-in-out duration-200 items-center text-xs cursor-default">
										<div
											onClick={() => {
												setOpen(true), setVersion(version);
											}}
											className="group-hover:text-black text-blueText"
										>
											<IconRectangleVertical size={18} />
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
