import { FC } from "react";
import { SmallText } from "../texts/SmallText";
import {
	IconArrowRight,
	IconFileDescription,
	IconFileText,
	IconFolderFilled,
	IconFolderOpen,
	IconNote,
} from "@tabler/icons-react";
import { IProject } from "../../interfaces/IProject";
import { IChapter } from "../../interfaces/IChapter";
import { Chapter } from "../Chapters";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useNavigate, useParams } from "react-router-dom";
import { ButtonWrapper } from "../buttons/ButtonWrapper";

export const FolderListItem: FC<{
	folder: IProject["folders"][0];
	className?: string;
	icon?: React.ReactNode;
	withNumber?: boolean;
	openFolder?: (folderId: string) => void;
	folderChapters?: IChapter[];
	small?: boolean;
	openedFolder?: string;
}> = ({
	className,
	folder,
	icon,
	withNumber,
	openFolder,
	folderChapters,
	small,
	openedFolder,
}) => {
	const { project } = useParams();
	const [parent] = useAutoAnimate();
	const navigate = useNavigate();
	return (
		<div className="flex flex-col" ref={parent}>
			<div
				className={`px-1 py-0.5 hover:bg-coolGrey-1 cursor-pointer ${className}`}
				onClick={() =>
					openFolder
						? openFolder(openedFolder === folder.uid ? "" : folder.uid)
						: null
				}
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
				<div
					className={` ${
						small ? "ml-3" : "ml-5"
					} pl-1 pt-1 gap-0.5 flex flex-col border-l `}
				>
					{folderChapters?.map((chapter: IChapter, index: number) => (
						<>
							{small ? (
								<SmallText className="flex items-center justify-between py-0.5 px-2 cursor-default">
									<span className="flex gap-1 items-center">
										<IconFileText size={14} />{" "}
										{chapter.content.title || "Untitled Chapter"}
									</span>
									<ButtonWrapper
										onClick={() =>
											navigate(`/project/${project}/chapter/${chapter.uid}`)
										}
									>
										<IconArrowRight size={14} />
									</ButtonWrapper>
								</SmallText>
							) : (
								<Chapter
									openChapter={() =>
										navigate(`/project/${project}/chapter/${chapter.uid}`)
									}
									key={index}
									chapter={chapter}
									openChapterModal={() => null}
									disabled={false}
								/>
							)}
						</>
					))}
				</div>
			)}
		</div>
	);
};
