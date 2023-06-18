import React from "react";
import { ChapterBranches } from "./ChapterBranches";
import { Button, Menu, Tooltip } from "@mantine/core";
import { IconGitBranch } from "@tabler/icons";
export function ChapterBranchMenu() {
	return (
		<Menu position="left-start" offset={5}>
			<Menu.Target>
				<Tooltip label="Branches" position="left" withArrow>
					<div className="border border-gray-200 p-2 rounded-md group">
						<IconGitBranch
							size={20}
							className="text-blueText group-hover:text-black "
						/>
					</div>
				</Tooltip>
			</Menu.Target>
			<Menu.Dropdown className="bg-white border-none shadow-sm">
				<ChapterBranches
					openMergeModal={() => {}}
					setSearchParams={() => {}}
					chapterBranches={[]}
					mainContent={{} as any}
					currentBranch={{} as any}
					checkoutMain={() => {}}
					openDeleteBranch={() => {}}
				/>
			</Menu.Dropdown>
		</Menu>
	);
}
