import { AuthFooter } from "../../components/auth/AuthFooter";
import { AuthHeader } from "../../components/auth/AuthHeader";
import { AuthWrapper } from "../../components/auth/AuthWrapper";
import { AuthTitle } from "../../components/auth/AuthTitle";
import { IconMailCheck } from "@tabler/icons-react";
import { BlueButton } from "../../components/buttons/BlueButton";
import { Divider } from "@mantine/core";
import { useSendVerificationEmail } from "../../hooks/user/useSendVerificationEmail";

export function VerifyEmailPage() {
	const { mutate: sendEmail, isLoading } = useSendVerificationEmail();

	return (
		<AuthWrapper>
			<AuthHeader />
			<AuthTitle
				title="Almost there! 🎉"
				subtitle="We've sent you an email with a link to verify your account"
			>
				<IconMailCheck
					size={48}
					className="mx-auto animate-bounce my-8 text-orange-400 dark:text-orange-500"
				/>
				<p className="text-center text-coolGrey-5 dark:text-coolGrey-6 text-xs">
					Didn't get the email? Check your spam folder
				</p>
				<Divider className="!my-4" label="OR" labelPosition="center" />

				<BlueButton isLoading={isLoading} onClick={sendEmail}>
					Resend Email
				</BlueButton>
			</AuthTitle>
			<AuthFooter />
		</AuthWrapper>
	);
}
