import { Button } from "@mantine/core";
import { FC, ReactNode } from "react";
import { useThemeContext } from "../../Providers/ThemeProvider";
export const BlueButton: FC<{
	onClick?: () => void;
	disabled?: boolean;
	children: ReactNode;
	isLoading?: boolean;
	className?: string;
}> = ({ onClick, children, disabled, isLoading, className }) => {
	return (
		<Button
			loading={isLoading}
			disabled={disabled}
			type="submit"
			onClick={onClick}
			className={`w-full flex gap-2 dark:!bg-sky-800 dark:text-coolGrey-1 !bg-coolGrey-6 hover:!bg-coolGrey-7 ${className}`}
			size="xs"
			w="100%"
			variant="filled"
			color="grey"
		>
			{children}
		</Button>
	);
};
