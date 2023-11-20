import { AuthFooter } from "../../components/auth/AuthFooter";
import { AuthHeader } from "../../components/auth/AuthHeader";
import { AuthWrapper } from "../../components/auth/AuthWrapper";
import { AuthTitle } from "../../components/auth/AuthTitle";
import { useSearchParams } from "react-router-dom";
import { useVerifyUser } from "../../hooks/user/useVerifyUser";
import { useEffect } from "react";
import { useThemeContext } from "../../Providers/ThemeProvider";
import { cyclops8, cyclops9 } from "../../assets/icons";
export function VerifiedPage() {
	const [searchParams, setSearchParams] = useSearchParams();
	const { theme } = useThemeContext();
	const { mutate: verifyUser, isSuccess } = useVerifyUser();

	useEffect(() => {
		const token = searchParams.get("token");
		if (token && !isSuccess) {
			verifyUser(token);
		}

		if (isSuccess) {
			setTimeout(() => {
				window.location.href = "/";
			}, 2000);
		}

		return () => {
			setSearchParams({});
		};
	}, [searchParams]);

	return (
		<AuthWrapper>
			<AuthHeader />
			<AuthTitle
				title="Hey you made it! 🎉"
				subtitle="Let's get you up to speed"
			>
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
			</AuthTitle>
			<AuthFooter />
		</AuthWrapper>
	);
}
