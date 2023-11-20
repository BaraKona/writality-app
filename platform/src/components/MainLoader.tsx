import { Loader } from "@mantine/core";
import { useThemeContext } from "../Providers/ThemeProvider";

export const MainLoader = () => {
	const { theme } = useThemeContext();

	return (
		<div className="flex h-screen bg-base dark:bg-baseDark">
			<div className="m-auto flex flex-col items-center">
				<Loader
					variant="bars"
					color={theme === "dark" ? "#9CA3AF" : `"#394251"`}
					className="dark:text-coolGrey-4"
				/>
				<p className="text-coolGrey-7 dark:text-coolGrey-4">
					<span className="font-bold">Loading</span> your account...
				</p>
			</div>
		</div>
	);
};
