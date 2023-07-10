import { Reset } from "../../components/auth";
import { AuthHeader } from "../../components/auth/AuthHeader";
import { AuthFooter } from "../../components/auth/AuthFooter";
import { AuthWrapper } from "../../components/auth/AuthWrapper";

export function ResetPage() {
	return (
		<AuthWrapper>
			<AuthHeader />
			<Reset />
			<AuthFooter />
		</AuthWrapper>
	);
}
