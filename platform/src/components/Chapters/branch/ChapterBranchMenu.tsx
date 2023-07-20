import React, { FC, SetStateAction } from "react";
import { ChapterBranches } from "./ChapterBranches";
import { Button, Menu, Tooltip } from "@mantine/core";
import { IconGitBranch } from "@tabler/icons";
import { IChapterVersion } from "../../../interfaces/IChapterVersion";
import { IChapterContent } from "../../../interfaces/IChapterContent";
import { tooltipStyles } from "../../../styles/tooltipStyles";
import { useSearchParams } from "react-router-dom";
export const ChapterBranchMenu: FC<{
	openMergeModal: () => void;
	chapterBranches: IChapterVersion[];
	currentBranch: IChapterContent;
	mainContent: IChapterContent;
	checkoutMain: () => void;
	openDeleteBranch: React.Dispatch<SetStateAction<boolean>>;
	openBranchModal: () => void;
	close: () => void;
	active: boolean;
}> = ({
	openMergeModal,
	chapterBranches,
	currentBranch,
	mainContent,
	checkoutMain,
	openDeleteBranch,
	openBranchModal,
	close,
	active,
}) => {
	return (
		<div className={`${active ? "" : "hidden"}`}>
			<ChapterBranches
				openMergeModal={openMergeModal}
				chapterBranches={chapterBranches}
				currentBranch={currentBranch}
				mainContent={mainContent}
				checkoutMain={checkoutMain}
				openDeleteBranch={openDeleteBranch}
				openBranchModal={openBranchModal}
				close={close}
			/>
		</div>
	);
};
