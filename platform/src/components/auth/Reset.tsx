import { Link } from "react-router-dom";
import React from "react";
import { AuthTitle } from "./AuthTitle";
import { Divider, TextInput } from "@mantine/core";
import { inputStyles } from "../../styles/inputStyles";
import { BlueButton } from "../buttons/BlueButton";
export function Reset() {
	return (
		<AuthTitle
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
			<Divider
				my="md"
				label="or"
				labelPosition="center"
				className="!border-coolGrey-1 dark:!border-borderDark"
			/>
			<Link to="/auth/login">
				<p className="text-center text-xs text-coolGrey-7 font-medium ">
					<span className="underline cursor-pointer hover:underline-offset-2 ease-in-out duration-300 text-gray-400 font-semibold">
						&#8592; Back to Login
					</span>
				</p>
			</Link>
		</AuthTitle>
	);
}
