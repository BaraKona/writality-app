import { Loader } from "@mantine/core";
import { FC, ReactNode } from "react";
import { useThemeContext } from "../Providers/ThemeProvider";
export const Loading: FC<{
	children?: ReactNode;
	isLoading: boolean;
}> = ({ children, isLoading }) => {
	const { theme } = useThemeContext();

	return (
		<>
			{isLoading ? (
				<div className="flex justify-center items-center h-[calc(100dvh-42px)] bg-base dark:bg-baseDark rounded-lg">
					<Loader
						variant="bars"
						color={theme === "dark" ? "#9CA3AF" : `"#394251"`}
						className="dark:text-coolGrey-4"
					/>
				</div>
			) : (
				<>{children}</>
			)}
		</>
	);
};
