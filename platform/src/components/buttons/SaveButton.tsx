import { Button } from "@mantine/core";
import { FC } from "react";

export const SaveButton: FC<{
	onClick?: () => void;
	isDisabled?: boolean;
}> = ({ onClick, isDisabled }) => {
	return (
		<Button
			size="sm"
			disabled={isDisabled}
			variant="default"
			onClick={onClick}
			className="text-blueText font-medium flex cursor-pointer items-center gap-1 group hover:text-black hover:bg-gray-100 rounded-normal px-2 text-xs"
		>
			Save
		</Button>
	);
};
