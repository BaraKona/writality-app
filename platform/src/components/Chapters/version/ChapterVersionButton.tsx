import { Tooltip } from "@mantine/core";
import { tooltipStyles } from "../../../styles/tooltipStyles";
import { FC } from "react";
import { IconVersions } from "@tabler/icons";

export const ChapterVersionButton: FC<{ setActive: () => void }> = ({
	setActive,
}) => {
	return (
		<Tooltip label="Versions" position="left" withArrow styles={tooltipStyles}>
			<div
				className="border border-lightBorder p-2 rounded-normal group"
				onClick={setActive}
			>
				<IconVersions
					size={20}
					className="text-blueText group-hover:text-black "
				/>
			</div>
		</Tooltip>
	);
};
