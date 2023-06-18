import React, { FC, SetStateAction } from "react";
import { ChapterVersions } from "./ChapterVersions";
import { Button, Menu, Tooltip } from "@mantine/core";
import { IconVersions } from "@tabler/icons";
import { IChapter } from "../../../interfaces/IChapter";
import { IChapterVersion } from "../../../interfaces/IChapterVersion";
export const ChapterVersionMenu: FC<{
	openMergeModal: () => void;
	chapterVersions: IChapterVersion[];
	setOpen: React.Dispatch<SetStateAction<boolean>>;
	setVersion: (version: IChapterVersion) => void;
}> = ({ openMergeModal, chapterVersions, setOpen, setVersion }) => {
	return (
		<Menu position="left-start" offset={5}>
			<Menu.Target>
				<Tooltip label="Versions" position="left" withArrow>
					<div className="border border-gray-200 p-2 rounded-md group">
						<IconVersions
							size={20}
							className="text-blueText group-hover:text-black "
						/>
					</div>
				</Tooltip>
			</Menu.Target>
			<Menu.Dropdown className="bg-white border-none shadow-md">
				<ChapterVersions
					openMergeModal={openMergeModal}
					chapterVersions={chapterVersions}
					setOpen={setOpen}
					setVersion={setVersion}
				/>
			</Menu.Dropdown>
		</Menu>
	);
};
