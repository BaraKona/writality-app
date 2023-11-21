import Login from "../../components/auth/Login";
import { AuthFooter } from "../../components/auth/AuthFooter";
import { AuthHeader } from "../../components/auth/AuthHeader";
import { AuthWrapper } from "../../components/auth/AuthWrapper";
export function LoginPage() {
	return (
		<AuthWrapper>
			<AuthHeader />
			<Login />
			<AuthFooter />
		</AuthWrapper>
	);
}
