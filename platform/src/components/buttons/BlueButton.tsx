import { Button } from "@mantine/core";
import { FC, ReactNode } from "react";
import { useThemeContext } from "../../Providers/ThemeProvider";
export const BlueButton: FC<{
	onClick?: () => void;
	disabled?: boolean;
	children: ReactNode;
}> = ({ onClick, children, disabled }) => {
	const { theme } = useThemeContext();
	return (
		<Button
			disabled={disabled}
			type="submit"
			onClick={onClick}
			className="w-full flex gap-2"
			size="xs"
			w="100%"
			variant={theme === "dark" ? "outline" : "filled"}
			color={theme === "dark" ? "cyan" : "greyBlue"}
		>
			{children}
		</Button>
	);
};
