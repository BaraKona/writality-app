import { Tooltip } from "@mantine/core";
import { tooltipStyles } from "../../../styles/tooltipStyles";
import { FC } from "react";
import { IconFileTime, IconVersions } from "@tabler/icons-react";

export const ChapterHistoryButton: FC<{
	setActive: () => void;
	active: boolean;
}> = ({ setActive, active }) => {
	return (
		<Tooltip label="History" position="left" withArrow styles={tooltipStyles}>
			<div
				className={`border items-center flex border-border hover:bg-base hover:shadow p-1.5 justify-center transition-all ease-in-out duration-300 rounded-normal group ${
					active ? "bg-base shadow" : "bg-transparent"
				}`}
				onClick={setActive}
			>
				<IconFileTime
					size={18}
					className="text-coolGrey-7 group-hover:text-black"
				/>
			</div>
		</Tooltip>
	);
};
