import { Link } from "react-router-dom";
import React from "react";

export function Reset() {
	return (
		<div className="md:pt-20 pb-10 text-left md:border-r border-baseBorder min-w-[400px] flex-grow ">
			<div className="px-10 mx-auto max-w-[600px]">
				<h2 className="text-2xl font-bold text-stone-200">
					Forgot password ? 😞
				</h2>
				<p className="text-sm text-stone-400 mb-4">
					Please enter your registered email and we’ll send you a recovery link.
				</p>
				<form>
					<label className="text-sm text-blueText">
						Email Address <span className="text-red-700"> * </span>
					</label>
					<input
						required
						type="email"
						className="w-full mb-4 form-input bg-transparent text-blueText border-b-stone-400 border-t-0 border-x-0 px-0 focus:ring-0"
					/>
					<button
						type="submit"
						className="w-full mt-14 mb-4 py-4 hover:bg-stone-500 rounded-full text-blueText hover:text-baseColour border-2  border-stone-500"
					>
						Reset Password
					</button>
					<Link to="/auth/login">
						<a className="text-stone-400 text-sm font-semibold underline hover:underline-offset-2 ease-in-out duration-300 text-center align-middle cursor-pointer">
							&#8592; Back to Login
						</a>
					</Link>
				</form>
			</div>
		</div>
	);
}
