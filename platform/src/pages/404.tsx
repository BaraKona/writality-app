import { cyclops6, circle4 } from "../assets/icons";
import { FourOFourIllustration } from "../assets/illustrations";
import { Link } from "react-router-dom";
import { ButtonWrapper } from "../components/buttons/ButtonWrapper";
import { BlueButton } from "../components/buttons/BlueButton";

export const FourOFour = () => {
	return (
		<div className="flex bg-base flex-col items-center justify-center h-screen border-border dark:border-borderDark border text-coolGrey-7 dark:text-coolGrey-4 dark:bg-baseDark">
			<img src={circle4} alt="404" width={200}></img>
			<h1 className="text-lg font-bold mt-5 ">
				hmmm ... we could not find that page
			</h1>
			<Link to="/">
				<BlueButton className="mt-2 px-4">Go Back Home</BlueButton>
			</Link>
		</div>
	);
};
