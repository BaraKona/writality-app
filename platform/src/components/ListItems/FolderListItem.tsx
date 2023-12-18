import { FC, useState } from "react";
import { SmallText } from "../texts/SmallText";
import {
  IconDotsVertical,
  IconFileText,
  IconFolderCheck,
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
import { Menu, TextInput, Tooltip } from "@mantine/core";
import { tooltipStyles } from "../../styles/tooltipStyles";
import { inputStyles } from "../../styles/inputStyles";
import { useUpdateFolderName } from "../../hooks/projects/useUpdateFolderName";

export const FolderListItem: FC<{
  folder: IProject["folders"][0];
  allFolders?: IProject["folders"];
  className?: string;
  icon?: React.ReactNode;
  withNumber?: boolean;
  openDeleteModal?: (folderId: string) => void;
  // folderChapters?: IChapter[];
  small?: boolean;
  projectId: string;
  location: string;
  listenerId?: string;
  level: number;
  chapters?: IChapter[];
}> = ({
  className,
  folder,
  icon,
  withNumber,
  // folderChapters,
  small,
  projectId,
  location,
  listenerId,
  allFolders,
  level,
  openDeleteModal,
  chapters,
}) => {
  const [parent] = useAutoAnimate();
  const navigate = useNavigate();

  const { chapter: chapterId } = useParams();
  const { mutate: updateFolderName } = useUpdateFolderName(projectId);

  const [openedFolder, setOpenFolder] = useLocalStorage({
    key: `openFolder-${location}-${folder.uid}`,
    defaultValue:
      localStorage.getItem(`openFolder-${location}-${folder.uid}`) || "",
  });

  const { Draggable } = useDraggableContext();
  const [name, setName] = useState<string>("");

  const { attributes, listeners, setNodeRef, style } = Draggable({
    id: listenerId || "",
  });

  const children = allFolders?.filter(
    (childFolder: IProject["folders"][0]) =>
      childFolder?.parentId === folder.uid,
  );

  const folderChapters = chapters?.filter(
    (chapter: IChapter) => chapter.parentId === folder.uid,
  );

  const levelColour = [
    "dark:!text-[#957DAD]",
    "dark:!text-[#D291BC]",
    "dark:!text-[#E0BBE4]",
    "dark:!text-[#FEC8D8]",
    "dark:!text-[#FFAFD4]",
  ];

  return (
    <div className="flex flex-col" ref={parent}>
      <Droppable id={folder.uid} type="folder">
        <div
          {...attributes}
          ref={setNodeRef}
          style={style}
          className={`z-[100] flex cursor-pointer items-center px-1 py-1.5 hover:bg-coolGrey-1 dark:hover:bg-hoverDark ${className} ${
            openedFolder === folder.uid ? "" : "mb-1"
          }`}
        >
          <SmallText
            className={`flex grow items-center gap-1.5 py-0.5 ${
              levelColour[level % levelColour.length]
            } `}
            onClick={() =>
              setOpenFolder(openedFolder === folder.uid ? "" : folder.uid)
            }
          >
            {openedFolder == folder.uid ? (
              <IconFolderOpen size={16} />
            ) : (
              <IconFolderFilled size={16} />
            )}
            {folder.name}
          </SmallText>

          <div className="flex items-center gap-2">
            {withNumber && (
              <SmallText className=" text-coolGrey-4">
                {folder.chapters?.length}
              </SmallText>
            )}
            {location === "project" && (
              <Menu shadow="md" width={200} withArrow>
                <Menu.Target>
                  <Tooltip
                    label="rename folder"
                    position="top"
                    withArrow
                    styles={tooltipStyles}
                  >
                    <button>
                      <IconDotsVertical
                        size={14}
                        className="cursor-pointer text-coolGrey-4"
                      />
                    </button>
                  </Tooltip>
                </Menu.Target>
                <Menu.Dropdown className="!rounded-lg !border-coolGrey-1 !pr-2 dark:!border-borderDark dark:!bg-baseDark">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      updateFolderName({
                        folderId: folder.uid,
                        name,
                      });

                      setName("");
                    }}
                  >
                    <Menu.Label>Folder Name</Menu.Label>
                    <div className="flex items-start gap-1">
                      <TextInput
                        styles={inputStyles()}
                        className="pl-2"
                        onChange={(e) => setName(e.target.value)}
                        error={name.length < 1}
                        value={name}
                        onSubmit={() => {
                          updateFolderName({
                            folderId: folder.uid,
                            name,
                          });
                          setName("");
                        }}
                      />
                      <button
                        className="mt-0.5 rounded-md p-1.5 text-coolGrey-7 hover:bg-coolGrey-1 dark:text-coolGrey-4 dark:hover:bg-hoverDark"
                        type="submit"
                      >
                        <IconFolderCheck size={16} />
                      </button>
                    </div>
                  </form>
                </Menu.Dropdown>
              </Menu>
            )}
            {listenerId && location === "project" && (
              <ButtonWrapper>
                <IconGripVertical
                  size={14}
                  {...listeners}
                  className="cursor-pointer text-coolGrey-4"
                />
              </ButtonWrapper>
            )}
          </div>
        </div>
      </Droppable>

      {(openedFolder as string) === folder.uid ? (
        <div
          className={` ${
            small ? "ml-3" : "ml-[1.1rem]"
          } flex flex-col gap-0.5 border-l border-border py-1 pl-1 dark:border-borderDark`}
        >
          {children?.map((folder: IProject["folders"][0], index: number) => (
            <FolderListItem
              key={index}
              folder={folder}
              location={location}
              projectId={projectId}
              // folderChapters={folder.chapters}
              small={small}
              withNumber={withNumber}
              className={className}
              chapters={
                chapters?.filter(
                  (chapter: IChapter) => chapter.parentId !== null,
                ) || []
              }
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
                  className={`ml-2 flex cursor-pointer items-center justify-between rounded-md px-0.5 py-0.5 hover:bg-coolGrey-1 dark:text-coolGrey-5 dark:hover:bg-hoverDark ${
                    chapterId === chapter.uid
                      ? "bg-coolGrey-1 dark:bg-hoverDark"
                      : ""
                  }`}
                  onClick={() =>
                    navigate(`project/${projectId}/chapter/${chapter.uid}`)
                  }
                >
                  <span className="flex items-start gap-1.5">
                    <IconFileText size={16} className="flex-shrink-0" />{" "}
                    {chapter?.content?.title || "Untitled Chapter"}
                  </span>
                </SmallText>
              ) : (
                <Chapter
                  openChapter={() =>
                    navigate(`/project/${projectId}/chapter/${chapter.uid}`)
                  }
                  chapter={chapter}
                  openChapterModal={() =>
                    openDeleteModal ? openDeleteModal(chapter.uid) : null
                  }
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
