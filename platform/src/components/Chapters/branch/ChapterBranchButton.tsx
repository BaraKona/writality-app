import { Tooltip } from "@mantine/core";
import { tooltipStyles } from "../../../styles/tooltipStyles";
import { FC } from "react";
import { IconFileTime, IconGitBranch, IconVersions } from "@tabler/icons-react";

export const ChapterBranchButton: FC<{
	setActive: () => void;
	active: boolean;
}> = ({ setActive, active }) => {
	return (
		<Tooltip label="Branches" position="left" withArrow styles={tooltipStyles}>
			<div
				className={`border items-center flex border-border dark:border-borderDark dark:hover:bg-hoverDark hover:bg-base hover:shadow p-1.5 justify-center transition-all ease-in-out duration-300 rounded-normal ${
					active ? "bg-base dark:bg-hoverDark dark:shadow-none shadow" : ""
				}`}
				onClick={setActive}
			>
				<IconGitBranch
					size={18}
					className="text-coolGrey-7  dark:text-coolGrey-4"
				/>
			</div>
		</Tooltip>
	);
};
