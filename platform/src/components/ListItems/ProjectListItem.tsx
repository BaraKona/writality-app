import {
  IconChevronDown,
  IconChevronRight,
  IconFileText,
} from "@tabler/icons-react";
import { FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IconRenderer } from "../IconRenderer";
import { useLocalStorage } from "@mantine/hooks";
import { IProject } from "../../interfaces/IProject";
import { FolderListItem } from "./FolderListItem";
import { ButtonWrapper } from "../buttons/ButtonWrapper";
import { SmallText } from "../texts/SmallText";
import { IChapter } from "../../interfaces/IChapter";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useProjectChapters } from "../../hooks/projects/useProjectChapters";

export const ProjectListItem: FC<{
  name: string;
  projectId: string;
  projectFolders: IProject["folders"];
  onClick?: () => void;
  type: "standard" | "collaboration";
}> = ({ name, onClick, projectId, type, projectFolders }) => {
  const [parent] = useAutoAnimate();
  const { project, chapter: chapterId } = useParams();

  const [sidebarProjectOpen, setSidebarProjectOpen] = useLocalStorage({
    key: `sidebarProjectOpen-${projectId}`,
    defaultValue: localStorage.getItem(`sidebarProjectOpen-${projectId}`) || "",
  });

  const navigate = useNavigate();

  const { data: chapters } = useProjectChapters(
    projectId,
    Boolean(sidebarProjectOpen),
  );

  const chaptersWithoutFolders = chapters?.filter(
    (chapter: IChapter) => !chapter.parentId,
  );

  return (
    <section
      className={`w-full transition-all duration-500 ease-in-out dark:text-coolGrey-4`}
    >
      <li
        onClick={onClick}
        className={`group flex cursor-pointer gap-1 rounded-md p-2 py-1 text-xs font-medium transition-all duration-500 ease-in-out hover:bg-coolGrey-1 dark:hover:bg-hoverDark
				${
          project === projectId
            ? "bg-coolGrey-1 dark:bg-hoverDark dark:hover:border-hoverDark"
            : "dark:bg-baseDark"
        }`}
      >
        <ButtonWrapper
          className="!rounded-md hover:bg-coolGrey-0 dark:hover:border-hoverDark dark:hover:bg-hoverDark"
          onClick={(e: any) => {
            e.stopPropagation(),
              setSidebarProjectOpen(
                sidebarProjectOpen === projectId ? "" : projectId,
              );
          }}
        >
          {sidebarProjectOpen ? (
            <IconChevronDown className="text-coolGrey-5" size={16} />
          ) : (
            <IconChevronRight className="text-coolGrey-5" size={16} />
          )}
        </ButtonWrapper>
        <div className="flex items-center justify-between gap-1">
          <div
            className={`flex items-center gap-1 ${
              type === "standard"
                ? "text-stone-500 dark:text-stone-400"
                : "text-sky-700 dark:text-cyan-600"
            }`}
          >
            <IconRenderer type={type} open={Boolean(sidebarProjectOpen)} />
            <span className="overflow-hidden text-ellipsis whitespace-nowrap">
              {name}
            </span>
          </div>
        </div>
      </li>

      <div className="ml-3">
        <div ref={parent}>
          {sidebarProjectOpen && (
            <>
              {projectFolders.length > 0 ? (
                <div className="pl-[1.05rem] pt-0.5">
                  {projectFolders
                    .filter((folder) => !folder.parentId)
                    ?.map((folder) => {
                      return (
                        <FolderListItem
                          key={`folder_${folder.uid}`}
                          folder={folder}
                          chapters={chapters}
                          // folderChapters={folder.chapters}
                          allFolders={projectFolders}
                          small
                          projectId={projectId}
                          className="rounded-md"
                          location="sidebar"
                          level={0}
                        />
                      );
                    })}
                </div>
              ) : (
                <div className="pl-2 pt-2"> </div>
              )}
            </>
          )}
        </div>
        <div ref={parent}>
          {sidebarProjectOpen && chapters?.length !== 0 && (
            <div className="border-border pb-1 dark:border-borderDark">
              {chaptersWithoutFolders?.map((chapter: IChapter) => (
                <SmallText
                  key={chapter.uid}
                  className={`ml-2p my-0.5 ml-2 flex cursor-pointer items-center justify-between rounded p-0.5 pl-[0.8rem] transition-all duration-300 ease-in-out hover:bg-coolGrey-1 dark:text-coolGrey-5 dark:hover:bg-hoverDark ${
                    chapterId === chapter.uid
                      ? "bg-coolGrey-1 dark:bg-hoverDark"
                      : ""
                  }`}
                  onClick={() =>
                    navigate(`project/${projectId}/chapter/${chapter.uid}`)
                  }
                >
                  <span className="flex items-start gap-1.5">
                    <IconFileText size={16} className="flex-shrink-0" />
                    {chapter?.content?.title || "Untitled Chapter"}
                  </span>
                </SmallText>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
