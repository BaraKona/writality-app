import { AuthFooter } from "../../components/auth/AuthFooter";
import { AuthHeader } from "../../components/auth/AuthHeader";
import { AuthWrapper } from "../../components/auth/AuthWrapper";
import { AuthTitle } from "../../components/auth/AuthTitle";
import { IconMailCheck } from "@tabler/icons-react";
import { BlueButton } from "../../components/buttons/BlueButton";
import { Divider } from "@mantine/core";
import { useSendVerificationEmail } from "../../hooks/user/useSendVerificationEmail";
import { useState } from "react";
import { useSignout } from "../../hooks/user/useSignout";

export function VerifyEmailPage() {
	const { mutate: sendEmail, isLoading } = useSendVerificationEmail();
	const { mutate: signOut } = useSignout();

	const [buttonStatus, setButtonStatus] = useState(0);

	return (
		<AuthWrapper>
			<AuthHeader />
			<AuthTitle
				title="Almost there! 🎉"
				subtitle={
					buttonStatus === 0
						? "Send a verification email to your inbox"
						: "We just sent you an email, please verify your email address"
				}
			>
				<IconMailCheck
					size={48}
					className="mx-auto animate-bounce my-8 text-orange-400 dark:text-orange-500"
				/>
				{buttonStatus === 1 && (
					<div>
						<p className="text-center text-coolGrey-5 dark:text-coolGrey-6 text-xs">
							Didn't get the email? Check your spam folder
						</p>
						<Divider className="!my-4" label="OR" labelPosition="center" />
					</div>
				)}

				<BlueButton
					isLoading={isLoading}
					onClick={() => {
						setButtonStatus(1), sendEmail();
					}}
				>
					{buttonStatus === 0 ? "Send verification email" : "Send again"}
				</BlueButton>
				<p
					className="mt-2 text-center text-coolGrey-5 dark:text-coolGrey-6 text-xs hover:underline cursor-pointer"
					onClick={() => signOut()}
				>
					Sign in with a different account ?
				</p>
			</AuthTitle>
			<AuthFooter />
		</AuthWrapper>
	);
}
