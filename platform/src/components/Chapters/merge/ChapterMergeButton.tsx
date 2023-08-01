import { Button, Tooltip } from "@mantine/core";
import { tooltipStyles } from "../../../styles/tooltipStyles";
import { FC } from "react";
import { IconGitMerge } from "@tabler/icons";

export const ChapterMergeButton: FC<{
  setOpen: () => void;
}> = ({ setOpen }) => {
	return (
		<Tooltip label="Merge branch into main" position="left" withArrow styles={tooltipStyles}>
			<Button
				className={`border items-center flex border-border hover:bg-base hover:shadow p-1.5 justify-center bg-greyBlue transition-all ease-in-out duration-300 rounded-normal group`}
        size="xs"
        color="greyBlue"
        p={0}
        onClick={setOpen}
			>
				<IconGitMerge
					size={18}
					className="text-base"
				/>
			</Button>
		</Tooltip>
	);
};
