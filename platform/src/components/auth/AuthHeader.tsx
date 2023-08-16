import { cyclops8 } from "../../assets/icons";

export const AuthHeader = () => {
	return (
		<nav className="max-w-2xl border-solid mb-auto mr-auto">
			<div className="flex items-center mt-4 gap-2">
				<img
					src={cyclops8}
					alt="writality"
					width={35}
					height={35}
					className="inline-block"
				/>
				<p className="font-bold text-md text-coolGrey-7">Writality</p>
			</div>
		</nav>
	);
};
