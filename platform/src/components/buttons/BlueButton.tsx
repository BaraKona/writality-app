import { Button } from "@mantine/core";
import { FC, ReactNode } from "react";

export const BlueButton: FC<{
	onClick?: () => void;
	disabled?: boolean;
	children: ReactNode;
}> = ({ onClick, children, disabled }) => {
	return (
		<Button
			disabled={disabled}
			type="submit"
			onClick={onClick}
			className="w-full flex gap-2"
			size="xs"
			w="100%"
			variant="filled"
			color="greyBlue"
		>
			{children}
		</Button>
	);
};
