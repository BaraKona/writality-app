import { MainNavigation } from "../../components/Navigation";
import { loginIllustration } from "../../assets/illustrations";
import Login from "../../components/auth/Login";
import { useAuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Container, Image } from "@mantine/core";
export function LoginPage() {
	const { currentUser } = useAuthContext();
	const navigate = useNavigate();
	return (
		<div className="h-screen flex flex-col max-w-5xl mx-auto gap-1 items-center justify-center">
			<Login />
		</div>
	);
}
