import { FC, useEffect } from "react";
import { useThemeContext } from "../../Providers/ThemeProvider";
import { cyclops8, cyclops9 } from "../../assets/icons";

export const OnboardingStep4: FC<{
	next: () => void;
	isLoading: boolean;
	step: number;
}> = ({ next, isLoading, step }) => {
	const { theme } = useThemeContext();

	useEffect(() => {
		if (!isLoading && step === 4) {
			setTimeout(() => {
				next();
			}, 2000);
		}
	}, [isLoading, step]);

	return (
		<section className="my-auto flex flex-col gap-4 mx-auto">
			<img
				src={theme === "dark" ? cyclops9 : cyclops8}
				alt="writality logo"
				className="my-8 animate-pulse mx-auto"
				width={200}
				height={200}
			/>
			<p className="text-center text-coolGrey-5 dark:text-coolGrey-6 text-xs">
				We are just getting your onboarding ready for you. You will be
				redirected shortly...
			</p>
		</section>
	);
};
