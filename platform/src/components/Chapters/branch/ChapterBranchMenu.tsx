import React, { FC, SetStateAction } from "react";
import { ChapterBranches } from "./ChapterBranches";
import { Button, Menu, Tooltip } from "@mantine/core";
import { IconGitBranch } from "@tabler/icons-react";
import { IChapterVersion } from "../../../interfaces/IChapterVersion";
import { IChapterContent } from "../../../interfaces/IChapterContent";
import { tooltipStyles } from "../../../styles/tooltipStyles";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getAllBranches } from "../../../api/project/branches";
export const ChapterBranchMenu: FC<{
	openMergeModal: (type: string) => void;
	chapterId: string;
	currentBranch: IChapterContent;
	mainContent: IChapterContent;
	checkoutMain: () => void;
	openDeleteBranch: React.Dispatch<SetStateAction<boolean>>;
	openBranchModal: () => void;
	close: () => void;
	active: boolean;
}> = ({
	openMergeModal,
	chapterId,
	currentBranch,
	mainContent,
	checkoutMain,
	openDeleteBranch,
	openBranchModal,
	close,
	active,
}) => {
	const { data: chapterBranches, isLoading } = useQuery(
		["chapterBranches", chapterId],
		() => getAllBranches(chapterId)
	);

	return (
		<div className={`${active ? "" : "hidden"}`}>
			<ChapterBranches
				isLoading={isLoading}
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
