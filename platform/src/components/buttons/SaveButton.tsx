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
			className="text-blueText font-semibold  flex cursor-pointer items-center gap-1 group hover:text-black hover:bg-gray-100 rounded-normal py-1 px-3"
		>
			Save
		</Button>
	);
};
