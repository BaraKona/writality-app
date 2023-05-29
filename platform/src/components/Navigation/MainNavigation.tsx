import React from "react";
import { Link } from "react-router-dom";
import { cyclops8 } from "../../assets/icons";
import LandingNavigation from "./LandingNavigation";
import UserNavigation from "./UserNavigation";
import { useAuthContext } from "../../contexts/AuthContext";
import { Container } from "@mantine/core";

export default function Navbar() {
	const { currentUser } = useAuthContext();
	const showNavbar = () => {
		if (currentUser) {
			return <UserNavigation />;
		} else {
			return <LandingNavigation />;
		}
	};
	return (
		<Container size="lg">
			<nav className=" mx-auto flex justify-between  px-4 border-solid border-b border-baseBorder">
				<div className="cursor-pointer">
					<Link to="/">
						<div className="my-3 flex">
							<img
								src={cyclops8}
								alt="writality"
								width={35}
								height={35}
								className="inline-block"
							/>
							<p className="font-bold px-2 py-2 text-lg text-slate-200">
								Writality
							</p>
						</div>
					</Link>
				</div>
				<div className="ml-auto">{showNavbar()}</div>
			</nav>
		</Container>
	);
}
