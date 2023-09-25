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
import { MantineColor } from "@mantine/core";

export const FolderListItem: FC<{
	folder: IProject["folders"][0];
	className?: string;
	icon?: React.ReactNode;
	withNumber?: boolean;
	folderChapters?: IChapter[];
	small?: boolean;
	projectId: string;
	location: string;
	listenerId?: string;
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

	return (
		<div className="flex flex-col" ref={parent}>
			<div
				className={`px-1 py-0.5 hover:bg-coolGrey-1 cursor-pointer ${className} ${
					openedFolder === folder.uid ? "" : "mb-1"
				}`}
				onClick={() =>
					setOpenFolder(openedFolder === folder.uid ? "" : folder.uid)
				}
			>
				<SmallText className="flex items-center gap-1.5">
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
					{icon}
					{listenerId && (
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
			{(openedFolder as string) == folder.uid && (
				<div
					className={` ${
						small ? "ml-3" : "ml-5"
					} pl-1 py-1 gap-0.5 flex flex-col border-l `}
				>
					{folderChapters?.map((chapter: IChapter, index: number) => (
						<>
							{small ? (
								<SmallText
									className={`flex items-center justify-between py-0.5 px-0.5 ml-2 cursor-pointer rounded-normal hover:bg-coolGrey-1 ${
										chapterId === chapter.uid ? "bg-coolGrey-1" : ""
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
									key={index}
									chapter={chapter}
									openChapterModal={() => null}
									disabled={false}
									listenerId={chapter._id}
								/>
							)}
						</>
					))}
				</div>
			)}
		</div>
	);
};
