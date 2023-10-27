import { FC, SetStateAction } from "react";
import { useTimeFromNow } from "../../../hooks/useTimeFromNow";
import {
	VscGitPullRequestCreate,
	VscGitMerge,
	VscGitPullRequestClosed,
} from "react-icons/vsc";
import { IChapterVersion } from "../../../interfaces/IChapterVersion";

import { IChapterContent } from "../../../interfaces/IChapterContent";
import { Divider, ScrollArea, Skeleton, Text } from "@mantine/core";
import { IconGitBranch, IconPlus, IconX } from "@tabler/icons-react";
import { useSearchParams } from "react-router-dom";
import { ButtonWrapper } from "../../buttons/ButtonWrapper";
import { ChapterSidebarWrapper } from "../ChapterSidebarWrapper";
export const ChapterBranches: FC<{
	openMergeModal: (type: string) => void;
	chapterBranches: IChapterVersion[];
	isLoading: boolean;
	mainContent: IChapterContent;
	currentBranch: IChapterContent;
	checkoutMain: any;
	openDeleteBranch: React.Dispatch<SetStateAction<boolean>>;
	openBranchModal: () => void;
	close: () => void;
}> = ({
	openMergeModal,
	chapterBranches,
	mainContent,
	currentBranch,
	checkoutMain,
	openDeleteBranch,
	openBranchModal,
	close,
	isLoading,
}) => {
	const [searchParams, setSearchParams] = useSearchParams();
	const merge = searchParams.get("merge");

	if (isLoading) {
		return (
			<ChapterSidebarWrapper>
				<div className="flex font-medium my-2 px-2 text-coolGrey-7 gap-2 text-xs items-center">
					Branches
					<ButtonWrapper onClick={openBranchModal} className="ml-auto">
						<IconPlus
							size={14}
							className="text-blueTextLight group-hover:text-black dark:hover:text-coolGrey-1"
						/>
					</ButtonWrapper>
					<ButtonWrapper onClick={close}>
						<IconX
							size={14}
							className="text-blueTextLight group-hover:text-black dark:hover:text-coolGrey-1"
						/>
					</ButtonWrapper>
				</div>
				<Divider className="!border-coolGrey-1 dark:!border-borderDark" />
				<div className="flex flex-col gap-2 p-2">
					<Skeleton height={30} width="100%" />
					<Skeleton height={30} width="100%" />
					<Skeleton height={30} width="100%" />
					<Skeleton height={30} width="100%" />
					<Skeleton height={30} width="100%" />
				</div>
			</ChapterSidebarWrapper>
		);
	}

	return (
		<ChapterSidebarWrapper>
			<div className="flex font-medium my-2 px-2 text-coolGrey-7 gap-2 text-xs items-center">
				Branches
				<ButtonWrapper onClick={openBranchModal} className="ml-auto">
					<IconPlus
						size={14}
						className="text-blueTextLight group-hover:text-black dark:hover:text-coolGrey-1"
					/>
				</ButtonWrapper>
				<ButtonWrapper onClick={close}>
					<IconX
						size={14}
						className="text-blueTextLight group-hover:text-black dark:hover:text-coolGrey-1"
					/>
				</ButtonWrapper>
			</div>
			<Divider className="!border-coolGrey-1 dark:!border-borderDark" />
			{chapterBranches?.length > 0 ? (
				<div className="text-coolGrey-7">
					<div className="flex justify-between gap-2 border-b border-border dark:border-borderDark items-center">
						<div
							className="flex gap-1 py-1 px-2 transition-all ease-in-out duration-200 items-center text-xs font-medium"
							onClick={checkoutMain}
						>
							<div
								className={`hover:text-black dark:hover:text-coolGrey-1 ${
									currentBranch?.uid === mainContent?.uid
										? "text-coolGrey-7"
										: "text-blueTextLight"
								}`}
							>
								<VscGitPullRequestCreate size={14} />
							</div>
							main
						</div>
					</div>
					<ScrollArea.Autosize
						styles={{
							viewport: {
								maxHeight: "calc(100vh - 156px)",
							},
						}}
						scrollbarSize={6}
					>
						{chapterBranches?.map((branch: any) => (
							<div
								key={branch.uid}
								className="flex flex-col gap-2 border-b border-border dark:border-borderDark py-1 px-2"
							>
								<div className="flex justify-between">
									<div className="flex gap-1">
										<button
											className={`hover:text-black dark:hover:text-coolGrey-1 ${
												branch.uid === currentBranch?.uid
													? "text-black"
													: "text-blueTextLight"
											}`}
											onClick={() =>
												setSearchParams((prev) => {
													prev.set("branch", branch.uid);
													return prev;
												})
											}
										>
											<VscGitPullRequestCreate size={14} />
										</button>
										<p className="text-coolGrey-7 font-medium text-xs">
											{branch.name ? branch.name : "Branch"}:
										</p>
									</div>
									<Text size="xs" color="dimmed">
										{useTimeFromNow(branch.dateUpdated.date)}
									</Text>
								</div>
								{branch.uid === currentBranch?.uid ? (
									<div className="flex flex-row gap-1 transition-all ease-in-out duration-200">
										<div className="flex ml-1.5 flex-col border-l border-border dark:border-borderDark gap-1 px-1">
											<button
												onClick={() => openMergeModal("replace")}
												className={`flex gap-1 text-coolGrey-7 text-xs font-medium items-center rounded-normal hover:text-black dark:hover:text-coolGrey-1 px-2 border-border dark:border-borderDark group ${
													merge === "replace" ? "bg-primary" : ""
												}`}
											>
												<VscGitMerge size={14} /> Merge branch replace main
											</button>
											<button
												onClick={() => openMergeModal("into")}
												className={`flex gap-1 text-coolGrey-7 text-xs font-medium items-center px-2 hover:bg-primary rounded-normal ${
													merge === "into" ? "bg-primary" : ""
												}`}
											>
												<VscGitMerge size={14} />
												Merge branch into main
											</button>
											<button
												onClick={() => openDeleteBranch(true)}
												className="flex gap-1 text-coolGrey-7 text-xs font-medium items-center px-2 hover:bg-primary rounded-normal"
											>
												<VscGitPullRequestClosed size={14} />
												Delete branch
											</button>
										</div>
									</div>
								) : (
									""
								)}
							</div>
						))}
					</ScrollArea.Autosize>
				</div>
			) : (
				<div className=" flex gap-2  items-center text-xs p-2">
					<div className="text-coolGrey-7">
						<IconGitBranch size={18} />
					</div>
					You do not have any branches for this chapter
				</div>
			)}
		</ChapterSidebarWrapper>
	);
};
