import { FC, SetStateAction } from "react";
import { useTimeFromNow } from "../../../hooks/useTimeFromNow";
import {
	VscGitPullRequestCreate,
	VscGitMerge,
	VscInfo,
	VscGitPullRequestClosed,
} from "react-icons/vsc";
import { IChapterVersion } from "../../../interfaces/IChapterVersion";

import { IChapterContent } from "../../../interfaces/IChapterContent";
import { Divider, ScrollArea, Text } from "@mantine/core";
import { IconGitBranch, IconGitPullRequest, IconPlus } from "@tabler/icons";
export const ChapterBranches: FC<{
	openMergeModal: () => void;
	setSearchParams: (params: any) => void;
	chapterBranches: IChapterVersion[];
	mainContent: IChapterContent;
	currentBranch: IChapterContent;
	checkoutMain: any;
	openDeleteBranch: React.Dispatch<SetStateAction<boolean>>;
	openBranchModal: () => void;
}> = ({
	openMergeModal,
	chapterBranches,
	setSearchParams,
	mainContent,
	currentBranch,
	checkoutMain,
	openDeleteBranch,
	openBranchModal,
}) => {
	if (!chapterBranches) {
		return null;
	}
	return (
		<div className="min-w-auto w-56">
			<div className="flex font-bold my-2 px-2 text-blueText text-sm">
				Branches
				<IconPlus
					size={18}
					onClick={openBranchModal}
					className="ml-auto hover:text-black cursor-pointer"
				/>
			</div>
			<Divider className="border-gray-200" />
			{chapterBranches?.length > 0 ? (
				<div className="border border-baseLight text-blueText">
					<div className="flex justify-between gap-2 border-b border-gray-200 items-center">
						<div className="flex gap-1 py-1 px-2 transition-all ease-in-out duration-200 items-center text-sm font-medium">
							<div
								className={`hover:text-black ${
									currentBranch?.uid === mainContent?.uid
										? "text-blueText"
										: "text-gray-400"
								}`}
								onClick={checkoutMain}
							>
								<VscGitPullRequestCreate size={18} />
							</div>
							main
						</div>
					</div>
					<ScrollArea.Autosize mah={400} offsetScrollbars scrollbarSize={6}>
						{chapterBranches?.map((branch: any) => (
							<div
								key={branch.uid}
								className="flex justify-between gap-2 border-b border-gray-200 py-1 px-2"
							>
								<div className="flex gap-1 transition-all ease-in-out duration-200">
									<button
										className={`hover:text-black ${
											branch.uid === currentBranch?.uid
												? "text-black"
												: "text-gray-400"
										}`}
										onClick={() => setSearchParams({ branch: branch.uid })}
									>
										<VscGitPullRequestCreate size={18} />
									</button>
									{branch.uid === currentBranch?.uid ? (
										<div className="mt-1 flex">
											<button
												onClick={openMergeModal}
												className="flex gap-1 hover:text-green-300"
											>
												<VscGitMerge size={18} />
											</button>
											<button
												onClick={() => openDeleteBranch(true)}
												className="flex text-red-400"
											>
												<VscGitPullRequestClosed size={18} />
											</button>
										</div>
									) : (
										""
									)}
									<p className="text-blueText font-medium text-sm">
										{branch.name ? branch.name : "Branch"}:
									</p>
								</div>
								<Text size="xs" color="dimmed">
									{useTimeFromNow(branch.dateUpdated.date)}
								</Text>
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
