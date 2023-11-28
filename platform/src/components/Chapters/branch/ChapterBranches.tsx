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
import { useAutoAnimate } from "@formkit/auto-animate/react";
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
	const [parent] = useAutoAnimate();

	if (isLoading) {
		return (
			<ChapterSidebarWrapper>
				<div className="flex font-medium my-2 px-2 text-coolGrey-7 gap-2 text-xs items-center dark:text-coolGrey-4">
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
			<div className="flex font-medium my-2 px-2 text-coolGrey-7 gap-2 text-xs items-center dark:text-coolGrey-4">
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
				<div className="text-coolGrey-7 my-2 px-1" ref={parent}>
					<button
						className="flex gap-1 w-full hover:bg-coolGrey-1 dark:hover:bg-hoverDark p-1 rounded-md items-center px-2 text-sm font-semibold"
						onClick={checkoutMain}
					>
						<div className="text-coolGrey-7 dark:text-coolGrey-6">
							<VscGitPullRequestCreate size={14} />
						</div>
						main
					</button>
					<ScrollArea.Autosize
						styles={{
							viewport: {
								maxHeight: "calc(100dvh - 156px)",
							},
						}}
						scrollbarSize={6}
					>
						{chapterBranches?.map((branch: any) => (
							<div
								key={branch.uid}
								className="flex flex-col gap-2 border-b border-border dark:border-borderDark py-1"
								ref={parent}
							>
								<button
									className="flex justify-between hover:bg-coolGrey-1 dark:hover:bg-hoverDark p-1 rounded-md items-center px-2"
									onClick={() =>
										setSearchParams((prev) => {
											prev.set("branch", branch.uid);
											return prev;
										})
									}
								>
									<div className="flex gap-1">
										<div
											className={`hover:text-black dark:hover:text-coolGrey-1 ${
												branch.uid === currentBranch?.uid
													? "text-black"
													: "text-blueTextLight"
											}`}
										>
											<VscGitPullRequestCreate size={14} />
										</div>
										<p className="text-coolGrey-7 font-medium text-xs">
											{branch.name ? branch.name : "Branch"}:
										</p>
									</div>
									<Text size="xs" color="dimmed">
										{useTimeFromNow(branch.dateUpdated.date)}
									</Text>
								</button>
								{branch.uid === currentBranch?.uid ? (
									<div className="flex flex-row gap-1 transition-all ease-in-out duration-200">
										<div className="flex ml-1.5 flex-col border-l border-border dark:border-borderDark gap-1 px-1">
											<button
												onClick={() => openMergeModal("replace")}
												className={`flex gap-1 text-coolGrey-7 text-xs font-medium items-center rounded-lg hover:text-black dark:hover:text-coolGrey-1 px-2 border-border dark:border-borderDark group ${
													merge === "replace" ? "bg-primary" : ""
												}`}
											>
												<VscGitMerge size={14} /> Merge branch replace main
											</button>
											<button
												onClick={() => openMergeModal("into")}
												className={`flex gap-1 text-coolGrey-7 text-xs font-medium items-center px-2 hover:bg-primary rounded-lg ${
													merge === "into" ? "bg-primary" : ""
												}`}
											>
												<VscGitMerge size={14} />
												Merge branch into main
											</button>
											<button
												onClick={() => openDeleteBranch(true)}
												className="flex gap-1 text-coolGrey-7 text-xs font-medium items-center px-2 hover:bg-primary rounded-lg"
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
