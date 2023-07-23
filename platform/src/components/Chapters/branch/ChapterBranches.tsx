import { FC, SetStateAction } from "react";
import { useTimeFromNow } from "../../../hooks/useTimeFromNow";
import {
	VscGitPullRequestCreate,
	VscGitMerge,
	VscGitPullRequestClosed,
} from "react-icons/vsc";
import { IChapterVersion } from "../../../interfaces/IChapterVersion";

import { IChapterContent } from "../../../interfaces/IChapterContent";
import { Divider, ScrollArea, Text } from "@mantine/core";
import { IconGitBranch, IconPlus, IconX } from "@tabler/icons";
import { useSearchParams } from "react-router-dom";
import { ButtonWrapper } from "../../buttons/ButtonWrapper";
export const ChapterBranches: FC<{
	openMergeModal: (type: string) => void;
	chapterBranches: IChapterVersion[];
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
}) => {
	const [searchParams, setSearchParams] = useSearchParams();
	// if (!chapterBranches) {
	// 	return null;
	// }
	return (
		<div className="min-w-auto w-72">
			<div className="flex font-medium my-2 px-2 text-blueText gap-2 text-xs items-center">
				Branches
				<ButtonWrapper onClick={openBranchModal} className="ml-auto">
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
			{chapterBranches?.length > 0 ? (
				<div className="border border-baseLight text-blueText">
					<div className="flex justify-between gap-2 border-b border-lightBorder items-center">
						<div className="flex gap-1 py-1 px-2 transition-all ease-in-out duration-200 items-center text-xs font-medium">
							<div
								className={`hover:text-black ${
									currentBranch?.uid === mainContent?.uid
										? "text-blueText"
										: "text-gray-400"
								}`}
								onClick={checkoutMain}
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
						offsetScrollbars
						scrollbarSize={6}
					>
						{chapterBranches?.map((branch: any) => (
							<div
								key={branch.uid}
								className="flex flex-col gap-2 border-b border-lightBorder py-1 pl-2"
							>
								<div className="flex justify-between">
									<div className="flex gap-1">
										<button
											className={`hover:text-black ${
												branch.uid === currentBranch?.uid
													? "text-black"
													: "text-gray-400"
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
										<p className="text-blueText font-medium text-xs">
											{branch.name ? branch.name : "Branch"}:
										</p>
									</div>
									<Text size="xs" color="dimmed">
										{useTimeFromNow(branch.dateUpdated.date)}
									</Text>
								</div>
								{branch.uid === currentBranch?.uid ? (
									<div className="flex flex-row gap-1 transition-all ease-in-out duration-200">
										<div className="flex  flex-col border-l border-gray-200 ml-1 gap-1">
											<button
												onClick={() => openMergeModal("replace")}
												className="flex gap-1 text-blueText text-xs font-medium items-center hover:text-black px-2 border-gray-200 group"
											>
												<VscGitMerge
													size={14}
													className="group-hover:text-blue-500 text-gray-400 "
												/>{" "}
												Merge branch replace main
											</button>
											<button
												onClick={() => openMergeModal("into")}
												className="flex gap-1 text-blueText text-xs font-medium items-center px-2 group"
											>
												<VscGitMerge
													size={14}
													className="group-hover:text-red-500 text-gray-400"
												/>
												Merge branch into main
											</button>
											<button
												onClick={() => openDeleteBranch(true)}
												className="flex gap-1 text-blueText text-xs font-medium items-center px-2 group"
											>
												<VscGitPullRequestClosed
													size={14}
													className="group-hover:text-red-500 text-gray-400"
												/>
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
					<div className="text-blueText">
						<IconGitBranch size={18} />
					</div>
					You do not have any branches for this chapter
				</div>
			)}
		</div>
	);
};
