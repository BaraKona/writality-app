import { Register } from "../../components/auth";
import { useAuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Container, Image } from "@mantine/core";
import { AuthHeader } from "../../components/auth/AuthHeader";
import { AuthFooter } from "../../components/auth/AuthFooter";
import { AuthWrapper } from "../../components/auth/AuthWrapper";

export function RegisterPage() {
	return (
		<AuthWrapper>
			<AuthHeader />
			<Register />
			<AuthFooter />
		</AuthWrapper>
	);
}
