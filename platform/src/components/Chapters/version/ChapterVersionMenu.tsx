import React, { FC, SetStateAction } from "react";
import { ChapterVersions } from "./ChapterVersions";
import { Button, Menu, Tooltip } from "@mantine/core";
import { IconVersions } from "@tabler/icons";
import { IChapter } from "../../../interfaces/IChapter";
import { IChapterVersion } from "../../../interfaces/IChapterVersion";
import { tooltipStyles } from "../../../styles/tooltipStyles";

export const ChapterVersionMenu: FC<{
	chapterVersions: IChapterVersion[];
	setOpen: React.Dispatch<SetStateAction<boolean>>;
	setVersion: (version: IChapterVersion) => void;
	createVersion: () => void;
}> = ({ chapterVersions, setOpen, setVersion, createVersion }) => {
	return (
		<Menu position="left-start" offset={5}>
			<Menu.Target>
				<Tooltip label="Versions" position="left" withArrow styles={tooltipStyles}>
					<div className="border border-lightBorder p-2 rounded-normal group">
						<IconVersions
							size={20}
							className="text-blueText group-hover:text-black "
						/>
					</div>
				</Tooltip>
			</Menu.Target>
			<Menu.Dropdown className="bg-white border-none shadow-md">
				<ChapterVersions
					createVersion={createVersion}
					chapterVersions={chapterVersions}
					setOpen={setOpen}
					setVersion={setVersion}
				/>
			</Menu.Dropdown>
		</Menu>
	);
};
