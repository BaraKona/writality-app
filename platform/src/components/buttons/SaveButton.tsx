import { Button } from "@mantine/core";
import { FC } from "react";

export const SaveButton: FC<{
	onClick?: () => void;
	isDisabled?: boolean;
}> = ({ onClick, isDisabled }) => {
	return (
		<Button
			size="xs"
			disabled={isDisabled}
			variant="filled"
			onClick={onClick}
			color="grey-blue"
		>
			Save
		</Button>
	);
};
