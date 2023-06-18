import { FC } from "react";
import { useTimeFromNow } from "../../../hooks/useTimeFromNow";
import { VscRepo } from "react-icons/vsc";
import { IChapterVersion } from "../../../interfaces/IChapterVersion";
import { Divider, ScrollArea, Text } from "@mantine/core";
import { IconRectangleVertical, IconSquare } from "@tabler/icons";

export const ChapterVersions: FC<{
	checkoutBranch?: (branch: any) => void;
	openMergeModal: () => void;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	setVersion: React.Dispatch<React.SetStateAction<any>>;
	chapterVersions: IChapterVersion[];
}> = ({
	checkoutBranch,
	openMergeModal,
	chapterVersions,
	setOpen,
	setVersion,
}) => {
	if (!chapterVersions) {
		return null;
	}

	return (
		<div className="min-w-auto w-56">
			{chapterVersions.length > 0 ? (
				<div>
					<div className="flex font-bold my-2 px-2 text-blueText text-sm">
						Versions
					</div>
					<Divider className="border-gray-200" />

					<ScrollArea.Autosize offsetScrollbars scrollbarSize={6} mah={400}>
						{chapterVersions.map((version: any, index) => (
							<div
								key={index}
								className="px-2 py-1 flex justify-between gap-2 items-center border-b border-gray-200 group"
							>
								<div className="">
									<div className="flex gap-1 transition-all ease-in-out duration-200 items-center text-sm cursor-default">
										<div
											onClick={() => {
												setOpen(true), setVersion(version);
											}}
											className="group-hover:text-black text-blueText"
										>
											<IconRectangleVertical size={18} />
										</div>
										<p className="text-blueText font-semibold">
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
				<p className=" flex gap-2 text-center align-middle text-sm">
					<button className="text-stone-300">
						<VscRepo size={18} />
					</button>
					You do not have any versions saved for this chapter
				</p>
			)}
		</div>
	);
};
