import { errorIllustration } from "../assets/illustrations";
import { Link } from "react-router-dom";
export const Error = () => {
	return (
		<div className="flex flex-col items-center justify-center h-[calc(100vh-48px)] bg-white rounded-t-md">
			<img src={errorIllustration} alt="error" width={500}></img>
			<h1 className="text-2xl font-bold text-">Ooops...</h1>
			<h2 className="text-xl font-bold text-">
				Something went wrong. Please try again.
			</h2>
			<Link to="/">
				<button className="bg-white text-blueText hover:text-black px-4 py-2 rounded-md mt-4 border border-blueText text-sm">
					Go Back
				</button>
			</Link>
		</div>
	);
};
