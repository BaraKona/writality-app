import React from "react";
import { Link } from "react-router-dom";

export default function LandingNavigation() {
	const style =
		"font-sm px-2 py-2 mx-1 text-md text-blueText hover:bg-white rounded-md hover:text-black";
	return (
		<div className="flex">
			<Link to="/auth/register">
				<div className="my-3 flex cursor-pointer">
					<a className={style}>Sign Up</a>
				</div>
			</Link>
			<Link to="/auth/login">
				<div className="my-3 flex cursor-pointer">
					<a className={style}>Login</a>
				</div>
			</Link>
		</div>
	);
}
