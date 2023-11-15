import { FC } from "react";
import { IProject } from "../../interfaces/IProject";
import { FolderListItem } from "../ListItems/FolderListItem";
import { ButtonWrapper } from "../buttons/ButtonWrapper";
import { IconDotsVertical } from "@tabler/icons-react";
import { IChapter } from "../../interfaces/IChapter";
import { Chapter } from "../Chapters/Chapter";
import { useAutoAnimate } from "@formkit/auto-animate/react";

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
			{project?.folders
				?.filter((folder) => !folder.parentId)
				.map((folder: any, index: number) => (
					<FolderListItem
						// openFolder={openFolder}
						allFolders={project.folders}
						folder={folder}
						projectId={project.uid}
						folderChapters={folder.chapters}
						nestedFolders={folder.folders}
						withNumber
						location="project"
						listenerId={`folder_${folder.uid}`}
						// openedFolder={openedFolder}
						className="px-2.5 py-1.5 border border-border dark:border-borderDark flex items-end justify-between rounded-md "
						icon={
							<ButtonWrapper>
								<IconDotsVertical size={14} className="cursor-pointer" />
							</ButtonWrapper>
						}
					/>
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
						listenerId={`chapter_${chapter._id}`}
					/>
					// </Draggable>
				))}
			</div>
		</div>
	);
};
