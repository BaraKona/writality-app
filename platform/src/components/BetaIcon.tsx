import { Tooltip } from "@mantine/core";
import { IconCircleLetterB } from "@tabler/icons-react";
import { tooltipStyles } from "../styles/tooltipStyles";
import { FC } from "react";

export const BetaIcon: FC<{ size: number }> = ({ size }) => {
	return (
		<Tooltip label="Beta tester" styles={tooltipStyles}>
			<IconCircleLetterB
				className="text-amber-400 dark:text-yellow-500"
				size={size}
			/>
		</Tooltip>
	);
};
