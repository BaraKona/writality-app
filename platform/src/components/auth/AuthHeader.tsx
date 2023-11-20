import { IconMoon, IconSun } from "@tabler/icons-react";
import { useThemeContext } from "../../Providers/ThemeProvider";
import { cyclops8, cyclops7 } from "../../assets/icons";

export const AuthHeader = () => {
	const { theme, toggleTheme } = useThemeContext();

	return (
		<nav className=" border-solid mb-auto mr-auto flex justify-between items-center w-full mt-4 px-2">
			<div className="flex items-center gap-2">
				<img
					src={theme === "dark" ? cyclops7 : cyclops8}
					alt="writality"
					width={35}
					height={35}
					className="inline-block "
				/>
				<p className="font-bold text-md text-coolGrey-7 dark:text-coolGrey-4">
					Writality
				</p>
			</div>
			<div
				className="ml-auto p-2 border-border  dark:border-borderDark border rounded-lg cursor-pointer"
				onClick={toggleTheme}
			>
				{theme === "dark" ? (
					<IconMoon size={14} className="text-cyan-500" />
				) : (
					<IconSun size={14} className="text-yellow-600" />
				)}
			</div>
		</nav>
	);
};
