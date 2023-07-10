import { Link } from "react-router-dom";
import React from "react";
import { AuthHeader } from "./AuthHeader";
import { Divider, TextInput } from "@mantine/core";
import { inputStyles } from "./inputStyles";
import { BlueButton } from "../buttons/BlueButton";
export function Reset() {
	return (
		<AuthHeader
			title="Forgot your password? 😞"
			subtitle="No worries, we got you! Enter your email below and we'll send you a link to reset your password."
		>
			<form>
				<TextInput
					placeholder="your@email.com"
					label="Email"
					required
					type="email"
					className="mb-4"
					styles={{
						...inputStyles,
					}}
				/>
				<BlueButton>Reset Password</BlueButton>
			</form>
			<Divider my="md" label="or" labelPosition="center" />
			<Link to="/auth/login">
				<p className="text-center text-xs text-blueText font-medium ">
					<span className="underline cursor-pointer hover:underline-offset-2 ease-in-out duration-300 text-gray-400 font-semibold">
						&#8592; Back to Login
					</span>
				</p>
			</Link>
		</AuthHeader>
	);
}
