import { FourOFourIllustration } from "../assets/illustrations";
import { Link } from "react-router-dom";

export const FourOFour = () => {
	return (
		<div className="flex bg-secondary flex-col items-center justify-center h-[calc(100vh-44px)] border-border border rounded-normal text-blueText">
			<img src={FourOFourIllustration} alt="404" width={500}></img>
			<h1 className="text-4xl font-bold mt-5">
				We could not find the page you were looking for.
			</h1>
			<Link to="/">
				<button className="bg-slate-200 text-slate-900 hover:bg-slate-400 px-4 py-2 rounded-normal mt-8">
					Go Back Home
				</button>
			</Link>
		</div>
	);
};
