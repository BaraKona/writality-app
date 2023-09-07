import { FC } from "react";
import { SmallText } from "../texts/SmallText";
import { IconFolderFilled, IconFolderOpen } from "@tabler/icons-react";
import { IProject } from "../../interfaces/IProject";
import { IChapter } from "../../interfaces/IChapter";
import { Chapter } from "../Chapters";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useNavigate, useParams } from "react-router-dom";

export const FolderListItem: FC<{
	folder: IProject["folders"][0];
	className?: string;
	icon?: React.ReactNode;
	withNumber?: boolean;
	openFolder?: (folderId: string) => void;
	folderChapters?: IChapter[];
}> = ({ className, folder, icon, withNumber, openFolder, folderChapters }) => {
	const openedFolder = JSON.parse(localStorage.getItem("openFolder") || "{}");
	const { project } = useParams();
	const [parent] = useAutoAnimate();
	const navigate = useNavigate();
	return (
		<div className="flex flex-col" ref={parent}>
			<div
				className={`px-1 py-0.5 hover:bg-coolGrey-1 cursor-pointer ${className}`}
				onClick={() => (openFolder ? openFolder(folder.uid) : null)}
			>
				<SmallText className="flex items-center gap-2">
					{openedFolder == folder.uid ? (
						<IconFolderOpen size={16} />
					) : (
						<IconFolderFilled size={16} />
					)}
					{folder.name}
				</SmallText>
				<div className="flex gap-2 items-center">
					{withNumber && (
						<SmallText className=" text-coolGrey-4">
							{folder.chapterIds?.length}
						</SmallText>
					)}
					{icon}
				</div>
			</div>
			{(openedFolder as string) == folder.uid && (
				<div className="pl-1 pt-1 gap-0.5 flex flex-col border-l ml-5">
					{folderChapters?.map((chapter: IChapter, index: number) => (
						<Chapter
							openChapter={() =>
								navigate(`/project/${project}/chapter/${chapter.uid}`)
							}
							key={index}
							chapter={chapter}
							openChapterModal={() => null}
							disabled={false}
						/>
					))}
				</div>
			)}
		</div>
	);
};
