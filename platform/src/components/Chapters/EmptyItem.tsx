import { FC } from "react";
import { circle4 } from "../../assets/icons";
import { BlueButton } from "../buttons/BlueButton";

export const EmptyItem: FC<{
	createNewChapter: () => void;
	title?: string;
	p1?: string;
	p2?: string;
	className?: string;
}> = ({ createNewChapter, title, p1, p2 }) => {
	return (
		<div className="flex overflow-y-auto mx-auto">
			<div className=" flex items-center justify-center flex-row gap-5 m-auto flex-wrap">
				<div className="my-auto">
					<img src={circle4} alt="circle4" width={200} height={200} />
				</div>
				<div>
					<h3 className="text-md font-semibold mb-2 "> {title} </h3>
					<>
						<p className="w-72 text-coolGrey-4 dark:text-coolGrey-6 text-sm mb-3">
							{p1}
							<br /> <br />
							{p2}
						</p>
						<div className="mr-auto w-32">
							<BlueButton onClick={createNewChapter}>Create</BlueButton>
						</div>
					</>
				</div>
			</div>
		</div>
	);
};
