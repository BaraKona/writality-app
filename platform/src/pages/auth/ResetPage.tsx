import { MainNavigation } from "../../components/Navigation";
import { registerIllustration } from "../../assets/illustrations";
import { Reset } from "../../components/auth";
import { useAuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Container } from "@mantine/core";
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
