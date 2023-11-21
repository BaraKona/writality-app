import { useThemeContext } from "../../Providers/ThemeProvider";
import { circle2, circle1 } from "../../assets/icons";
import { FC, ReactNode } from "react";

export const OnboardingCard: FC<{
	children: ReactNode;
}> = ({ children }) => {
	const { theme } = useThemeContext();

	return (
		<div className="flex flex-col w-[800px] h-[500px] items-start relative">
			<div>
				<img
					src={theme === "dark" ? circle2 : circle1}
					alt="writality logo"
					className="absolute -right-[10.9rem] bottom-0 top-0 my-auto opacity-25 dark:opacity-10"
					width={400}
					height={400}
				/>
			</div>
			{children}
		</div>
	);
};
