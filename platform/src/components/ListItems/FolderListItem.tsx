import { FC } from "react";
import { SmallText } from "../texts/SmallText";
import {
	IconFileText,
	IconFolderFilled,
	IconFolderOpen,
	IconGripVertical,
} from "@tabler/icons-react";
import { IProject } from "../../interfaces/IProject";
import { IChapter } from "../../interfaces/IChapter";
import { Chapter } from "../Chapters";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useNavigate, useParams } from "react-router-dom";
import { useLocalStorage } from "@mantine/hooks";
import { ButtonWrapper } from "../buttons/ButtonWrapper";
import { useDraggableContext } from "../DragAndDrop/DraggableProvider";
import { Droppable } from "../DragAndDrop/Droppable";

export const FolderListItem: FC<{
	folder: IProject["folders"][0];
	allFolders?: IProject["folders"];
	className?: string;
	icon?: React.ReactNode;
	withNumber?: boolean;
	folderChapters?: IChapter[];
	small?: boolean;
	projectId: string;
	location: string;
	listenerId?: string;
	level: number;
}> = ({
	className,
	folder,
	icon,
	withNumber,
	folderChapters,
	small,
	projectId,
	location,
	listenerId,
	allFolders,
	level,
}) => {
	const [parent] = useAutoAnimate();
	const navigate = useNavigate();

	const { chapter: chapterId } = useParams();

	const [openedFolder, setOpenFolder] = useLocalStorage({
		key: `openFolder-${location}-${folder.uid}`,
		defaultValue:
			localStorage.getItem(`openFolder-${location}-${folder.uid}`) || "",
	});

	const { Draggable } = useDraggableContext();

	const { attributes, listeners, setNodeRef, style } = Draggable({
		id: listenerId || "",
	});

	const children = allFolders?.filter(
		(childFolder: IProject["folders"][0]) =>
			childFolder?.parentId === folder.uid
	);

	const levelColour = [
		"dark:text-[#957DAD]",
		"dark:text-[#D291BC]",
		"dark:text-[#E0BBE4]",
		"dark:text-[#FEC8D8]",
		"dark:text-[#FFAFD4]",
	];

	return (
		<div className="flex flex-col" ref={parent}>
			<Droppable id={folder.uid} type="folder">
				<div
					{...attributes}
					ref={setNodeRef}
					style={style}
					className={`px-1 py-0.5 hover:bg-coolGrey-1 dark:hover:bg-hoverDark cursor-pointer z-[100] ${className} ${
						openedFolder === folder.uid ? "" : "mb-1"
					}`}
					onClick={() =>
						setOpenFolder(openedFolder === folder.uid ? "" : folder.uid)
					}
				>
					<SmallText
						className={`flex items-center gap-1.5 ${
							levelColour[level % levelColour.length]
						} `}
					>
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
								{folder.chapters?.length}
							</SmallText>
						)}
						{/* {icon} */}
						{listenerId && location === "project" && (
							<ButtonWrapper>
								<IconGripVertical
									size={14}
									{...listeners}
									className="text-coolGrey-4 cursor-pointer"
								/>
							</ButtonWrapper>
						)}
					</div>
				</div>
			</Droppable>

			{(openedFolder as string) === folder.uid ? (
				<div
					className={` ${
						small ? "ml-3" : "ml-5"
					} pl-1 py-1 gap-0.5 flex flex-col border-l border-border dark:border-borderDark`}
				>
					{children?.map((folder: IProject["folders"][0], index: number) => (
						<FolderListItem
							key={index}
							folder={folder}
							location={location}
							projectId={projectId}
							folderChapters={folder.chapters}
							small={small}
							withNumber={withNumber}
							className={className}
							listenerId={`folder_${folder.uid}`}
							allFolders={allFolders}
							icon={icon}
							level={level + 1}
						/>
					))}
					{folderChapters?.map((chapter: IChapter, index: number) => (
						<div key={index}>
							{small ? (
								<SmallText
									className={`flex items-center justify-between py-0.5 px-0.5 ml-2 cursor-pointer rounded-md hover:bg-coolGrey-1 dark:hover:bg-hoverDark dark:text-coolGrey-5 ${
										chapterId === chapter.uid
											? "bg-coolGrey-1 dark:bg-hoverDark"
											: ""
									}`}
									onClick={() =>
										navigate(`project/${projectId}/chapter/${chapter.uid}`)
									}
								>
									<span className="flex gap-1.5 items-start">
										<IconFileText size={16} className="flex-shrink-0" />{" "}
										{chapter.content.title || "Untitled Chapter"}
									</span>
								</SmallText>
							) : (
								<Chapter
									openChapter={() =>
										navigate(`/project/${projectId}/chapter/${chapter.uid}`)
									}
									chapter={chapter}
									openChapterModal={() => null}
									disabled={false}
									listenerId={`chapter_${chapter._id}`}
								/>
							)}
						</div>
					))}
				</div>
			) : null}
		</div>
	);
};
