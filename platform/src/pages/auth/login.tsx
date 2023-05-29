import { MainNavigation } from "../../components/Navigation";
import { loginIllustration } from "../../assets/illustrations";
import Login from "../../components/auth/Login";
import { useAuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Image } from "@mantine/core";
export function LoginPage() {
	const { currentUser } = useAuthContext();
	const navigate = useNavigate();

	if (currentUser) {
		navigate("/dashboard/posts");
	}
	return (
		<div>
			<MainNavigation />
			<div className="container flex px-4 mx-auto flex-wrap-reverse ">
				<Login />
				<div className="flex flex-grow sm justify-center">
					<Image
						src={loginIllustration}
						alt="login"
						className="animate-pulse max-w-sm m-8 border-transparent  transition-all duration-500 ease-in-out"
					/>
					{/* <img src={loginIllustration} alt="login" width={500}></img> */}
				</div>
			</div>
		</div>
	);
}
