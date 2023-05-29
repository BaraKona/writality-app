import React from "react";
import { MainNavigation } from "../../components/Navigation";
import { welcomeIllustration } from "../../assets/illustrations";
import { Register } from "../../components/auth";
import { useAuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Container, Image } from "@mantine/core";

export function RegisterPage() {
	const { currentUser } = useAuthContext();
	const navigate = useNavigate();

	if (currentUser) {
		navigate("/dashboard/posts");
	}
	return (
		<Container size="lg">
			<MainNavigation />
			<div className="container flex px-4 mx-auto flex-wrap-reverse">
				<Register />
				<div className="flex flex-grow flex-shrink sm justify-center">
					<Image
						src={welcomeIllustration}
						alt="login"
						className="animate-pulse max-w-sm m-8 border-transparent  transition-all duration-500 ease-in-out "
					/>
				</div>
			</div>
		</Container>
	);
}
