import { FC } from "react";
import { IProject } from "../../interfaces/IProject";
import { FolderListItem } from "../ListItems/FolderListItem";
import { ButtonWrapper } from "../buttons/ButtonWrapper";
import { IconDotsVertical } from "@tabler/icons-react";
import { IChapter } from "../../interfaces/IChapter";
import { Chapter } from "../Chapters/Chapter";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { SortableItem } from "../DragAndDrop/SortableItems";
import { Droppable } from "../DragAndDrop/Droppable";
import { DragOverlay } from "@dnd-kit/core";
import { Draggable } from "../DragAndDrop/Draggable";
import { useLocalStorage } from "@mantine/hooks";

export const ProjectChapters: FC<{
	project: IProject;
	chapters: IChapter[];
	openChapter: (projectId: string, chapterId: string) => void;
	openChapterModal: (chapterId: string) => void;
	// openFolder: (folderId: string) => void;
	// folderChapters: IChapter[];
	// openedFolder: string;
}> = ({
	project,
	chapters,
	openChapter,
	openChapterModal,
	// openFolder,
	// folderChapters,
	// openedFolder,
}) => {
	const [parent] = useAutoAnimate();

	return (
		<div
			ref={parent}
			className="p-2 flex flex-col overflow-auto h-[calc(100vh-15rem)]"
		>
			{project?.folders?.map((folder: any, index: number) => (
				<Droppable id={folder.uid} type="folder" key={index}>
					{/* <div className={openedFolder === folder.uid ? "" : "mb-1"}> */}
					<FolderListItem
						// openFolder={openFolder}
						folder={folder}
						projectId={project.uid}
						folderChapters={folder.chapters}
						withNumber
						location="project"
						listenerId={folder._id}
						// openedFolder={openedFolder}
						className="px-2.5 py-1.5 border border-border dark:border-borderDark flex items-end justify-between rounded-md "
						icon={
							<ButtonWrapper>
								<IconDotsVertical size={14} className="cursor-pointer" />
							</ButtonWrapper>
						}
					/>
					{/* </div> */}
				</Droppable>
			))}
			<div>
				{project?.chapters?.map((chapter: IChapter, index: number) => (
					// <Draggable id={chapter.uid}>
					<Chapter
						openChapter={() => openChapter(chapter.projectId, chapter.uid)}
						key={index}
						chapter={chapter}
						openChapterModal={() => openChapterModal(chapter.uid)}
						disabled={false}
						listenerId={chapter._id}
					/>
					// </Draggable>
				))}
			</div>
		</div>
	);
};
