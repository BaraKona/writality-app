import { MainNavigation } from "../../components/Navigation";
import { registerIllustration } from "../../assets/illustrations";
import { Reset } from "../../components/auth";
import { useAuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Container } from "@mantine/core";

export function ResetPage() {
	return (
		<div className="h-screen flex flex-col max-w-5xl mx-auto gap-1 items-center justify-center">
			<Reset />
		</div>
	);
}
