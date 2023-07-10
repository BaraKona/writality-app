import React from "react";
import { MainNavigation } from "../../components/Navigation";
import { welcomeIllustration } from "../../assets/illustrations";
import { Register } from "../../components/auth";
import { useAuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Container, Image } from "@mantine/core";

export function RegisterPage() {
	return (
		<div className="h-screen flex flex-col max-w-5xl mx-auto gap-1 items-center justify-center">
			<Register />
		</div>
	);
}
