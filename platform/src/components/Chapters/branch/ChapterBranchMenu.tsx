import React, { FC, SetStateAction } from "react";
import { ChapterBranches } from "./ChapterBranches";
import { Button, Menu, Tooltip } from "@mantine/core";
import { IconGitBranch } from "@tabler/icons";
import { IChapterVersion } from "../../../interfaces/IChapterVersion";
import { IChapterContent } from "../../../interfaces/IChapterContent";
export const ChapterBranchMenu: FC<{
	openMergeModal: () => void;
	chapterBranches: IChapterVersion[];
	currentBranch: IChapterContent;
	mainContent: IChapterContent;
	setSearchParams: () => void;
	checkoutMain: () => void;
	openDeleteBranch: React.Dispatch<SetStateAction<boolean>>;
	openBranchModal: () => void;
}> = ({
	openMergeModal,
	chapterBranches,
	currentBranch,
	mainContent,
	setSearchParams,
	checkoutMain,
	openDeleteBranch,
	openBranchModal,
}) => {
	return (
		<Menu position="left-start" offset={5}>
			<Menu.Target>
				<Tooltip label="Branches" position="left" withArrow>
					<div className="border border-lightBorder p-2 rounded-normal group">
						<IconGitBranch
							size={20}
							className="text-blueText group-hover:text-black "
						/>
					</div>
				</Tooltip>
			</Menu.Target>
			<Menu.Dropdown className="bg-white border-none shadow-md">
				<ChapterBranches
					openMergeModal={openMergeModal}
					chapterBranches={chapterBranches}
					currentBranch={currentBranch}
					mainContent={mainContent}
					setSearchParams={setSearchParams}
					checkoutMain={checkoutMain}
					openDeleteBranch={openDeleteBranch}
					openBranchModal={openBranchModal}
				/>
			</Menu.Dropdown>
		</Menu>
	);
};
