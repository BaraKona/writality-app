import { Link } from "react-router-dom";
import React, { useRef } from "react";
import { Divider, PasswordInput, TextInput } from "@mantine/core";
import { useSignUp } from "../../hooks/user/useSignup";
import { AuthTitle } from "./AuthTitle";
import { inputStyles } from "../../styles/inputStyles";
import { BlueButton } from "../buttons/BlueButton";
import { useToast } from "../../hooks";

export function Register() {
	const emailRef = useRef<HTMLDivElement>(null) as any;
	const nameRef = useRef<HTMLDivElement>(null) as any;
	const passwordRef = useRef<HTMLDivElement>(null) as any;
	const passwordConfirmRef = useRef<HTMLDivElement>(null) as any;
	const [name, setName] = React.useState("");
	const [error, setError] = React.useState("");

	const { mutate: signup, isLoading } = useSignUp();

	const handleAccountCreation = async (e: React.FormEvent) => {
		e.preventDefault();
		if (passwordRef.current.value !== passwordConfirmRef.current.value) {
			useToast("error", "Passwords do not match");
			return;
		}

		if (nameRef.current.value.length < 3) {
			return setError("Username must be at least 3 characters long");
		}

		try {
			signup({
				email: emailRef.current.value,
				password: passwordRef.current.value,
				name: name,
			});
		} catch (error: unknown) {
			console.log(error);
			if (error instanceof Error) alert(error.message);
		}
	};

	return (
		<AuthTitle
			title="Create an account 👋"
			subtitle="
			Welcome! Let&#39;s get you set up with an account"
		>
			<form onSubmit={handleAccountCreation}>
				<TextInput
					ref={nameRef}
					pattern="^[a-zA-Z0-9_]*$"
					value={name}
					onChange={(e) => {
						setName(e.currentTarget.value.replace(/\s/g, "")), setError("");
					}}
					type="text"
					required
					placeholder="username"
					label="Username"
					onBlur={() => {
						if (nameRef.current.value.length < 3) {
							setError("Username must be at least 3 characters long");
						}
					}}
					error={error}
					styles={{
						...inputStyles(),
					}}
				/>
				<TextInput
					ref={emailRef}
					required
					placeholder="your@email.com"
					label="Email Address"
					type="email"
					styles={{
						...inputStyles(),
					}}
				/>
				<PasswordInput
					variant="unstyled"
					ref={passwordRef}
					placeholder="YourUnique_Password!123"
					required
					label="Password"
					styles={{
						...inputStyles(),
					}}
				/>
				<PasswordInput
					variant="unstyled"
					ref={passwordConfirmRef}
					placeholder="YourUnique_Password!123"
					required
					label="Confirm Password"
					className="mb-5"
					styles={{
						...inputStyles(),
					}}
				/>
				<BlueButton>
					{isLoading ? "Creating account..." : "Create account"}
				</BlueButton>
			</form>
			<Divider
				my="md"
				label="or"
				labelPosition="center"
				className="!border-coolGrey-1 dark:!border-borderDark"
			/>

			<Link to="/auth/login">
				<p className="text-center text-xs text-coolGrey-7 font-medium ">
					Already have an account ?
					<span className="underline pl-5 cursor-pointer hover:underline-offset-2 ease-in-out duration-300 text-coolGrey-4 dark:text-coolGrey-6 font-semibold">
						Login
					</span>
				</p>
			</Link>
		</AuthTitle>
	);
}
