import { FC } from "react";
import { circle4 } from "../../assets/icons";

export const NoChapters: FC<{
	createNewChapter: () => void;
}> = ({ createNewChapter }) => {
	return (
		<div className="py-4 px-8 w-[calc(100vw-12rem)] h-[calc(100vh-48px)] bg-white rounded-t-md">
			<div className=" flex my-52 gap-5 w-5/12 m-auto flex-wrap">
				<div className="w-52 my-auto">
					<img src={circle4} alt="circle4" width={200} height={200} />
				</div>
				<div>
					<h3 className="text-xl font-semibold mb-4 "> Chapters </h3>
					<>
						<p className="w-72">
							You have no chapters currently. Chapters make up your project and
							can be collaborated on.
							<br /> <br />
							Chapters are also versioned so you can always go back to previews
							versions if you decide to scrap your current work.
						</p>
						<button
							onClick={createNewChapter}
							className=" mt-3 bg-purple-400 hover:bg-purple-700 text-blueText font-bold py-2 px-4 rounded"
						>
							Create
						</button>
					</>
				</div>
			</div>
		</div>
	);
};
