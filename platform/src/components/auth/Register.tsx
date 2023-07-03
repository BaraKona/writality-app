import { Link } from "react-router-dom";
import React, { useRef, useState } from "react";
import { apple, google } from "../../assets/icons";
import { useAuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { PasswordInput, TextInput } from "@mantine/core";
export function Register() {
	const emailRef = useRef<HTMLDivElement>(null) as any;
	const nameRef = useRef<HTMLDivElement>(null) as any;
	const passwordRef = useRef<HTMLDivElement>(null) as any;
	const passwordConfirmRef = useRef<HTMLDivElement>(null) as any;

	const navigate = useNavigate();

	const { createAUserWithEmailAndPassword, currentUser } = useAuthContext();
	const [loading, setLoading] = useState(false);

	const handleAccountCreation = async (e: React.FormEvent) => {
		e.preventDefault();
		if (passwordRef.current.value !== passwordConfirmRef.current.value) {
			return alert("Passwords do not match");
		}

		try {
			setLoading(true);
			await createAUserWithEmailAndPassword(
				emailRef.current.value,
				passwordRef.current.value,
				nameRef.current.value
			).then(() => {
				if (!currentUser) navigate("/auth/login");
				else navigate("/");
			});
		} catch (error: unknown) {
			console.log(error);
			if (error instanceof Error) alert(error.message);
		}
		setLoading(false);
	};

	return (
		<div className="md:pt-20 pb-10 text-left md:border-r border-gray-200 flex-grow ">
			<div className="px-10 mx-auto max-w-[600px]">
				<h2 className="text-2xl font-bold text-stone-200">
					Create an account 👋
				</h2>
				<p className="text-sm text-stone-400 mb-4">
					Welcome! Let&#39;s get you set up with an account
				</p>
				<form onSubmit={handleAccountCreation}>
					<TextInput
						ref={nameRef}
						type="text"
						required
						label="Name"
						className="w-full mb-4 form-input bg-transparent text-blueText  px-0 focus:ring-0 border-0"
					/>
					<TextInput
						ref={emailRef}
						required
						label="Email Address"
						type="email"
						className="w-full mb-4 form-input bg-transparent text-blueText border-0 px-0 focus:ring-0"
					/>
					<PasswordInput
						variant="unstyled"
						ref={passwordRef}
						required
						label="Password"
						className="w-full mb-4 text-blueText form-input bg-transparent border-0 px-0 focus:ring-0"
					/>
					<PasswordInput
						variant="unstyled"
						ref={passwordConfirmRef}
						required
						label="Confirm Password"
						className="w-full text-blueText form-input bg-transparent border-0 px-0 focus:ring-0"
					/>
					<button
						type="submit"
						className="w-full mt-14 mb-7 py-4 hover:bg-stone-500 rounded-full text-blueText hover:text-baseColour border-2  border-stone-500"
					>
						Register
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
					Register with Google
				</button>
				<button
					disabled={loading}
					type="submit"
					className=" flex align-middle justify-center gap-2 w-full mt-3 py-4 hover:bg-stone-300 rounded-full text-blueText bg-slate-800 hover:text-baseColour"
				>
					<img src={apple} alt="apple" />
					Register with Apple
				</button>
				<Link to="/auth/login">
					<p className="text-center mt-10 font-medium text-stone-400">
						Already have an account ?
						<span className="underline pl-5 cursor-pointer hover:underline-offset-2 ease-in-out duration-300 text-stone-400 font-semibold">
							Login
						</span>
					</p>
				</Link>
			</div>
		</div>
	);
}
