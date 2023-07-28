import { Tooltip } from "@mantine/core";
import { tooltipStyles } from "../../../styles/tooltipStyles";
import { FC } from "react";
import { IconFileTime, IconGitBranch, IconVersions } from "@tabler/icons";

export const ChapterBranchButton: FC<{
	setActive: () => void;
	active: boolean;
}> = ({ setActive, active }) => {
	return (
		<Tooltip label="Branches" position="left" withArrow styles={tooltipStyles}>
			<div
				className={`border items-center flex border-border hover:bg-base hover:shadow p-1.5 justify-center transition-all ease-in-out duration-300 rounded-normal group ${
					active ? "bg-base shadow" : "bg-transparent"
				}`}
				onClick={setActive}
			>
				<IconGitBranch
					size={18}
					className="text-blueText group-hover:text-black "
				/>
			</div>
		</Tooltip>
	);
};
