import React from "react";
import { Link } from "react-router-dom";
import { cyclops8 } from "../../assets/icons";
import { Container } from "@mantine/core";

export default function Navbar() {
	return (
		<nav className=" px-4 border-solid">
			<div className="my-3 flex items-center">
				<img
					src={cyclops8}
					alt="writality"
					width={35}
					height={35}
					className="inline-block"
				/>
				<p className="font-bold px-2 py-2 text-md text-black">Writality</p>
			</div>
		</nav>
	);
}
