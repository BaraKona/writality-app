import { MainNavigation } from "../../components/Navigation";
import { loginIllustration } from "../../assets/illustrations";
import Login from "../../components/auth/Login";
import { useAuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Container, Image } from "@mantine/core";
import { AuthFooter } from "../../components/auth/AuthFooter";
import { AuthHeader } from "../../components/auth/AuthHeader";
import { AuthWrapper } from "../../components/auth/AuthWrapper";
export function LoginPage() {
	const { currentUser } = useAuthContext();
	const navigate = useNavigate();
	return (
		<AuthWrapper>
			<AuthHeader />
			<Login />
			<AuthFooter />
		</AuthWrapper>
	);
}
