import { Tooltip } from "@mantine/core";
import { tooltipStyles } from "../../../styles/tooltipStyles";
import { FC } from "react";
import { IconFileTime, IconVersions } from "@tabler/icons";

export const ChapterHistoryButton: FC<{ setActive: () => void }> = ({
	setActive,
}) => {
	return (
		<Tooltip label="History" position="left" withArrow styles={tooltipStyles}>
			<div
				className="border border-lightBorder p-2 rounded-normal group"
				onClick={setActive}
			>
				<IconFileTime
					size={18}
					className="text-blueText group-hover:text-black"
				/>
			</div>
		</Tooltip>
	);
};
