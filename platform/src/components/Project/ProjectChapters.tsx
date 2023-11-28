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
}> = ({ project, chapters, openChapter, openChapterModal }) => {
	const [parent] = useAutoAnimate();

	return (
		<div
			ref={parent}
			className="p-2 flex flex-col overflow-auto h-[calc(100dvh-15rem)]"
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
						withNumber
						location="project"
						listenerId={`folder_${folder.uid}`}
						level={0}
						// openedFolder={openedFolder}
						className="px-2.5 py-1.5 dark:border-borderDark flex items-end justify-between rounded-lg "
						icon={
							<ButtonWrapper>
								<IconDotsVertical size={14} className="cursor-pointer" />
							</ButtonWrapper>
						}
					/>
				))}
			<div className="flex flex-col gap-1">
				{project?.chapters?.map((chapter: IChapter, index: number) => (
					<Chapter
						openChapter={() => openChapter(chapter.projectId, chapter.uid)}
						key={index}
						chapter={chapter}
						openChapterModal={() => openChapterModal(chapter.uid)}
						disabled={false}
						listenerId={`chapter_${chapter._id}`}
					/>
				))}
			</div>
		</div>
	);
};
