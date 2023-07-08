import { Link } from "react-router-dom";
import React, { useRef, useState } from "react";
import { TextInput, PasswordInput } from "@mantine/core";
import { apple, google } from "../../assets/icons";
import { useAuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useToast } from "../../hooks/useToast";
import { useLogin } from "../../hooks/user/useLogin";

export default function Login() {
	const emailRef = useRef<HTMLDivElement>(null) as any;
	const passwordRef = useRef<HTMLDivElement>(null) as any;
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const { mutate: login } = useLogin();

	const handleSignInAUser = async (e: React.FormEvent) => {
		e.preventDefault();
		const email = emailRef.current.value;
		const password = passwordRef.current.value;

		if (!email || !password) {
			return toast.error("Please fill in all fields");
		}

		await login({ email, password });
	};

	return (
		<div className="md:pt-20 pb-10 text-left md:border-r border-gray-200 flex-grow ">
			<div className="px-10 mx-auto max-w-[600px]">
				<h2 className="text-2xl font-bold text-blueText">
					Hey, Welcome Back! ✌️
				</h2>
				<p className="text-sm text-stone-400 mb-4">
					Welcome back, fill in your credentials to log in
				</p>
				<form onSubmit={handleSignInAUser}>
					<TextInput
						ref={emailRef}
						required
						label="Email Address"
						type="email"
						className="w-full mb-4 form-input bg-transparent text-blueText  px-0 focus:ring-0 border-0"
					/>
					<PasswordInput
						label="Password"
						ref={passwordRef}
						required
						variant="unstyled"
					/>
					<div className="flex justify-between mt-5 text-xs">
						<p className="text-blueText"> Forgot Password? </p>
						<Link to="/auth/reset">
							<a className="text-blueText underline cursor-pointer hover:underline-offset-2 ease-in-out duration-300">
								Reset password
							</a>
						</Link>
					</div>
					<button
						disabled={loading}
						type="submit"
						className="w-full mt-14 mb-7 py-4 hover:bg-stone-500 rounded-full text-blueText hover:text-baseColour border-2  border-stone-500"
					>
						Login
					</button>
				</form>
				<div className="flex justify-center">
					<hr className="w-full my-10 border-stone-400" />
					<p className="absolute mt-7 bg-baseColour px-4 text-blueText align-middle text-sm">
						Or
					</p>
				</div>
				<button
					type="submit"
					className="flex align-middle justify-center gap-2 w-full mt-3 py-4 hover:bg-stone-500 rounded-full text-blueText bg-slate-800 hover:text-baseColour"
				>
					<img src={google} alt="google" />
					Continue with Google
				</button>
				<button
					type="submit"
					className=" flex align-middle justify-center gap-2 w-full mt-3 py-4 hover:bg-stone-300 rounded-full text-blueText bg-slate-800 hover:text-baseColour"
				>
					<img src={apple} alt="apple" />
					Continue with Apple
				</button>
				<Link to="/auth/register">
					<p className="text-center mt-10 font-medium text-stone-400">
						Don&#39;t have an account yet?
						<span className="underline pl-5 cursor-pointer hover:underline-offset-2 ease-in-out duration-300 text-stone-400 font-semibold">
							Create an account
						</span>
					</p>
				</Link>
			</div>
		</div>
	);
}
