import { Tooltip } from "@mantine/core";
import { tooltipStyles } from "../../../styles/tooltipStyles";
import { FC } from "react";
import { IconFileStack, IconVersions } from "@tabler/icons-react";

export const ChapterVersionButton: FC<{
	setActive: () => void;
	active: boolean;
}> = ({ setActive, active }) => {
	return (
		<Tooltip label="Versions" position="left" withArrow styles={tooltipStyles}>
			<div
				className={`border items-center flex border-border hover:bg-base hover:shadow p-1.5 justify-center transition-all ease-in-out duration-300 rounded-normal group ${
					active ? "bg-base shadow" : "bg-transparent"
				}`}
				onClick={setActive}
			>
				<IconFileStack
					size={20}
					className="text-coolGrey-7 group-hover:text-black "
				/>
			</div>
		</Tooltip>
	);
};
