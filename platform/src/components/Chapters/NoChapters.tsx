import { FC } from "react";
import { circle4 } from "../../assets/icons";
import { BlueButton } from "../buttons/BlueButton";

export const NoChapters: FC<{
	createNewChapter: () => void;
}> = ({ createNewChapter }) => {
	return (
		<div className="flex items-center h-[calc(100vh-13rem)]">
			<div className=" flex items-center flex-col gap-5 m-auto flex-wrap">
				<div className="my-auto">
					<img src={circle4} alt="circle4" width={200} height={200} />
				</div>
				<div>
					<h3 className="text-md font-semibold mb-2 "> Chapters </h3>
					<>
						<p className="w-72 text-gray-400 text-sm mb-3">
							You have no chapters currently. Chapters make up your project and
							can be collaborated on.
							<br /> <br />
							Chapters are also versioned so you can always go back to previews
							versions if you decide to scrap your current work.
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
