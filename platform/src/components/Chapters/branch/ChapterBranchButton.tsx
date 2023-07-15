import { Tooltip } from "@mantine/core";
import { tooltipStyles } from "../../../styles/tooltipStyles";
import { FC } from "react";
import { IconFileTime, IconGitBranch, IconVersions } from "@tabler/icons";

export const ChapterBranchButton: FC<{ setActive: () => void }> = ({
	setActive,
}) => {
	return (
		<Tooltip label="Branches" position="left" withArrow styles={tooltipStyles}>
			<div
				className="border border-lightBorder p-2 rounded-normal group"
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
