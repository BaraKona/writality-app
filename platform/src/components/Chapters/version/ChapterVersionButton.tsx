import { Tooltip } from "@mantine/core";
import { tooltipStyles } from "../../../styles/tooltipStyles";
import { FC } from "react";
import { IconFileStack, IconVersions } from "@tabler/icons";

export const ChapterVersionButton: FC<{ setActive: () => void }> = ({
	setActive,
}) => {
	return (
		<Tooltip label="Versions" position="left" withArrow styles={tooltipStyles}>
			<div
				className="border items-center flex border-lightBorder p-1 justify-center rounded-normal group"
				onClick={setActive}
			>
				<IconFileStack
					size={20}
					className="text-blueText group-hover:text-black "
				/>
			</div>
		</Tooltip>
	);
};
