import { Tooltip } from "@mantine/core";
import { tooltipStyles } from "../../../styles/tooltipStyles";
import { FC } from "react";
import { IconFileTime } from "@tabler/icons-react";

export const ChapterHistoryButton: FC<{
	setActive: () => void;
	active: boolean;
}> = ({ setActive, active }) => {
	return (
		<Tooltip label="History" position="left" withArrow styles={tooltipStyles}>
			<div
				className={`border items-center flex border-border dark:border-borderDark hover:bg-base dark:hover:bg-hoverDark  hover:shadow p-1.5 justify-center transition-all ease-in-out duration-300 rounded-lg ${
					active
						? "bg-base dark:bg-hoverDark dark:shadow-none shadow"
						: "dark:text-coolGrey-4"
				}`}
				onClick={setActive}
			>
				<IconFileTime
					size={18}
					className="text-coolGrey-7 dark:text-coolGrey-4"
				/>
			</div>
		</Tooltip>
	);
};
