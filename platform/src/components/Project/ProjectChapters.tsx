import { FC } from "react";
import { IProject } from "../../interfaces/IProject";
import { FolderListItem } from "../ListItems/FolderListItem";
import { ButtonWrapper } from "../buttons/ButtonWrapper";
import { IconDotsVertical } from "@tabler/icons-react";
import { IChapter } from "../../interfaces/IChapter";
import { Chapter } from "../Chapters/Chapter";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useDraggableContext } from "../DragAndDrop/DraggableProvider";
import { Droppable } from "../DragAndDrop/Droppable";

export const ProjectChapters: FC<{
  project: IProject;
  chapters: IChapter[];
  openChapter: (projectId: string, chapterId: string) => void;
  openChapterModal: (chapterId: string) => void;
}> = ({ project, chapters, openChapter, openChapterModal }) => {
  const [parent] = useAutoAnimate();

  const chaptersWithFolders = chapters?.filter(
    (chapter) => chapter.parentId !== null,
  );

  const chaptersWithoutFolders = chapters?.filter(
    (chapter) => !chapter.parentId,
  );

  const { Draggable } = useDraggableContext();

  const { attributes, listeners, setNodeRef, style } = Draggable({
    id: "folder_empty",
  });

  return (
    <Droppable id="root" type="folder">
      <div
        ref={parent}
        className="flex h-[calc(100dvh-15rem)] flex-col overflow-auto p-2"
      >
        {project?.folders
          ?.filter((folder) => !folder.parentId)
          .map((folder: any, index: number) => (
            <FolderListItem
              // openFolder={openFolder}
              allFolders={project.folders}
              folder={folder}
              projectId={project.uid}
              // folderChapters={folder.chapters}
              withNumber
              location="project"
              listenerId={`folder_${folder.uid}`}
              level={0}
              key={index}
              chapters={chaptersWithFolders}
              openDeleteModal={openChapterModal}
              // openedFolder={openedFolder}
              className="flex items-end justify-between rounded-lg px-2.5 py-1.5 dark:border-borderDark "
              icon={
                <ButtonWrapper>
                  <IconDotsVertical size={14} className="cursor-pointer" />
                </ButtonWrapper>
              }
            />
          ))}
        <div className="flex flex-col gap-1">
          {chaptersWithoutFolders.map((chapter: IChapter, index: number) => (
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
    </Droppable>
  );
};
